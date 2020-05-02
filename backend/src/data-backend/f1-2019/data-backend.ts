import {env} from "../../env";
import {Logger} from "../../logger";
import {DataBackendListener, IDataBackend} from "../data-backend-service";

import {F1TelemetryClient, constants} from "f1-telemetry-client";
import {Session, Participants, LapData, CarTelemetry} from "f1-telemetry-models";
import Parser from "./parser";
const {PACKETS} = constants;

export class DataBackend implements IDataBackend {

    private f1TelemetryClient: F1TelemetryClient;
    private _listeners: DataBackendListener[] = [];

    private _lastSession: Session;
    private _lastParticipants: Participants;
    private _lastLapData: LapData;
    private _lastCarTelemetry: CarTelemetry

    start(): boolean {
        try {
            this.f1TelemetryClient = new F1TelemetryClient();
            this.f1TelemetryClient.on(PACKETS.session, this.onSession.bind(this));
            this.f1TelemetryClient.on(PACKETS.motion, () => {});
            this.f1TelemetryClient.on(PACKETS.lapData, this.onLapData.bind(this));
            this.f1TelemetryClient.on(PACKETS.event, () => {});
            this.f1TelemetryClient.on(PACKETS.participants, this.onParticipants.bind(this));
            this.f1TelemetryClient.on(PACKETS.carSetups, () => {});
            this.f1TelemetryClient.on(PACKETS.carTelemetry, this.onCarTelemetry.bind(this));
            this.f1TelemetryClient.on(PACKETS.carStatus, () => {});
            this.f1TelemetryClient.start();
        } catch (e) {
            Logger.error("Error while starting up F1TelemetryClient: ", e);
            return false;
        }
        return true;
    }

    stop(): boolean {
        this.f1TelemetryClient.stop();
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
        this._lastSession = Parser.parseSession(data);
        this._listeners.forEach((listener) => listener.onSession(this._lastSession));
    }

    onParticipants(data: any) {
        this._lastParticipants = Parser.parseParticipants(data);
        this._listeners.forEach((listener) => listener.onParticipants(this._lastParticipants));
    }

    onLapData(data: any) {
        this._lastLapData = Parser.parseLapData(data);
        this._listeners.forEach((listener) => listener.onLapData(this._lastLapData));
    }

    onCarTelemetry(data: any) {
        this._lastCarTelemetry = Parser.parseCarTelemetry(data);
        this._listeners.forEach((listener) => listener.onCarTelemetry(this._lastCarTelemetry));
    }
}