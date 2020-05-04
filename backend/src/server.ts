import Application = require("koa");
import koastatic = require("koa-static");
import WebSocket = require('ws');
import {env} from "./env";
import {Logger} from "./logger";
import {DataBackendListener, DataBackendService} from "./data-backend/data-backend-service";
import {DataBackend as F12019DataBackend} from "./data-backend/f1-2019/data-backend";
import {LapData, Participants, Session} from "f1-telemetry-models";
import {WriteStream} from "fs";
import CarTelemetry from "f1-telemetry-models/dist/model/car-telemetry";
import {ReplayDataBackend} from "./data-backend/replay/data-backend";
const fs = require('fs');
const path = require('path');

interface WebSocketExt extends WebSocket {
    subscriptions: any;
}

export class Server implements DataBackendListener{

    app: Application;
    webSocketServer: WebSocket.Server;
    dataService: DataBackendService;

    clients: WebSocketExt[] = [];

    replay: boolean = false;
    capturing: boolean = false;
    captureStream: WriteStream;
    captureStart: number = 0;

    start() {
        try {
            this.capturing = env.CAPTURE;
            this.replay = env.REPLAY;

            if (this.capturing) {
                const captureFile = env.CAPTURE_PATH + Date.now().toString() + ".cap";
                Logger.info("Capture activated, saving to: " + captureFile)
                this.captureStream = fs.createWriteStream(captureFile, {flags: 'a'});
                this.captureStart = Date.now();
            }

            this.dataService = new DataBackendService();

            if (this.replay) {
                this.dataService.start(new ReplayDataBackend(env.CAPTURE_PATH));
            } else {
                this.dataService.start(new F12019DataBackend());
            }
            this.dataService.addListener(this);

            this.app = new Application();
            this.app.use(koastatic(path.join(__dirname, "public")));
            this.app.listen(env.SERVER_PORT);
            Logger.info(`Server started and listening on port ${env.SERVER_PORT}`);

            this.webSocketServer = new WebSocket.Server({ port: env.WS_PORT});
            this.webSocketServer.on("connection", this.onWebSocket.bind(this));
            Logger.info(`WebSocket started and listening on port ${env.WS_PORT}`);
        } catch (err) {
            Logger.error("Error while starting server", err);
            throw err;
        }
    }

    addSubscriptionToWebSocket(ws: WebSocketExt, topic: string) {
        if (ws.subscriptions == null) {
            ws.subscriptions = {};
        }
        if (ws.subscriptions[topic] == null) {
            ws.subscriptions[topic] = 0;
        }
        ws.subscriptions[topic]++;
    }

    removeSubscriptionToWebSocket(ws: WebSocketExt, topic: string) {
        if (ws.subscriptions == null) {
            ws.subscriptions = {};
        }
        if (ws.subscriptions[topic] != null) {
            ws.subscriptions[topic] = 0;
        }
        ws.subscriptions[topic]--;
        if (ws.subscriptions[topic] < 0) {
            delete ws.subscriptions[topic];
        }
    }

    didSubscribe(ws: WebSocketExt, topic: string): boolean {
        return (ws.subscriptions && ws.subscriptions[topic] && ws.subscriptions[topic] > 0);
    }

    publishToClients(topic: string, data: any) {
        if (this.capturing) {
            this.captureStream.write(JSON.stringify({"time": (Date.now() - this.captureStart), "type": topic, "data": data}) + "\n")
        }
        this.clients.forEach((client) => {
            if (client.readyState == client.OPEN) {
                if (this.didSubscribe(client, topic)) {
                    client.send(JSON.stringify({"type": topic, "data": data}));
                }
            }
        });
    }


    onWebSocket(ws: WebSocketExt) {
        this.clients.push(ws);

        ws.on("message", function(msg: any) {
            msg = JSON.parse(msg);
            switch (msg["type"]) {
                case "subscribe": this.addSubscriptionToWebSocket(ws, msg["topic"]); break;
                case "unsubscribe": this.removeSubscriptionToWebSocket(ws, msg["topic"]); break;
            }
        }.bind(this));
    }

    onSession(session: Session): void {
        this.publishToClients("session", session);
    }

    onParticipants(participants: Participants): void {
        this.publishToClients("participants", participants);
    }

    onLapData(lapData: LapData): void {
        this.publishToClients("lapdata", lapData);
    }

    onCarTelemetry(carTelemetry: CarTelemetry): void {
        this.publishToClients("cartelemetry", carTelemetry);
    }
}