import {Logger} from "../../logger";
import {DataBackendListener, IDataBackend} from "../data-backend-service";
import {Session, Participants, LapData, CarTelemetry} from "f1-telemetry-models";
import * as fs from "fs";
import {ReadStream} from "fs";
import {Interface} from "readline";
const readline = require('readline');

export class ReplayDataBackend implements IDataBackend {

    private _listeners: DataBackendListener[] = [];

    private _capturePath: string;
    private _captureStream: ReadStream;
    private _captureInterface: Interface;
    private _lastCaptureTime: number = 0;

    private _captureData: any[] = [];
    private _captureDataIdx: number = 0;

    private _killSwitch: boolean = false;

    constructor(capturePath: string) {
        this._capturePath = capturePath;
    }

    start(): boolean {
        try {
            this._captureStream = fs.createReadStream(this._capturePath);
            this._captureInterface = readline.createInterface({input: this._captureStream});
            this._captureInterface.on('line', async function(line: string) {
                const data = JSON.parse(line);
                this._captureData.push(data);
            }.bind(this));
            this._captureInterface.on('close', ()  => setTimeout(this._runReplay.bind(this), 0));
        } catch (e) {
            Logger.error("Error while starting up ReplayClient: ", e);
            return false;
        }
        return true;
    }

    _runReplay() {
        if (this._killSwitch) return;

        if (this._captureDataIdx > this._captureData.length -1) {
            this._captureDataIdx = 0;
            this._lastCaptureTime = 0;
        }
        const data = this._captureData[this._captureDataIdx];
        switch (data["type"]) {
            case "lapdata": this.onLapData(data["data"]); break;
            case "session": this.onSession(data["data"]); break;
            case "participants": this.onParticipants(data["data"]); break;
            case "cartelemetry": this.onCarTelemetry(data["data"]); break;
        }
        const dataTime = +data["time"];
        let nextWait = 0;
        if (this._lastCaptureTime != 0) {
            nextWait = dataTime - this._lastCaptureTime;
        }
        this._lastCaptureTime = dataTime;
        setTimeout(this._runReplay.bind(this), nextWait);
    }

    stop(): boolean {
        this._killSwitch = true;
        this._captureInterface.close();
        this._captureStream.close();
        return true;
    }

    addListener(listener: DataBackendListener) {
        this._listeners.push(listener);
    }

    removeListener(listener: DataBackendListener) {
        const index = this._listeners.indexOf(listener, 0);
        if (index > -1) {
            this._listeners.splice(index, 1);
        }
    }

    onSession(data: any) {
        this._listeners.forEach((listener) => listener.onSession(data));
    }

    onParticipants(data: any) {
        this._listeners.forEach((listener) => listener.onParticipants(data));
    }

    onLapData(data: any) {
        this._listeners.forEach((listener) => listener.onLapData(data));
    }

    onCarTelemetry(data: any) {
        this._listeners.forEach((listener) => listener.onCarTelemetry(data));
    }
}