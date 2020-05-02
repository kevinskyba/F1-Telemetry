import {LapData, Session} from "f1-telemetry-models";
import Participants from "f1-telemetry-models/dist/model/participants";
import CarTelemetry from "f1-telemetry-models/dist/model/car-telemetry";

export interface DataBackendListener {
    onSession(session: Session): void;
    onParticipants(participants: Participants): void;
    onLapData(lapData: LapData): void;
    onCarTelemetry(carTelemetry: CarTelemetry): void;
}

export interface IDataBackend {
    start(): boolean;
    stop(): boolean;
    addListener(listener: DataBackendListener): void;
    removeListener(listener: DataBackendListener): void;
}

export class DataBackendService {

    backend: IDataBackend;

    start(backend: IDataBackend) {
        if (this.backend != null) {
            this.backend.stop();
        }
        this.backend = backend;
        this.backend.start();
    }

    addListener(listener: DataBackendListener) {
        this.backend.addListener(listener);
    }

    removeListener(listener: DataBackendListener) {
        this.backend.removeListener(listener);
    }
}