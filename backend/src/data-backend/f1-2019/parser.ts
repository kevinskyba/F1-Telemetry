import {
    Participants,
    Participant,
    Session,
    SessionType,
    Track,
    Weather,
    Team,
    LapData,
    PitStatus, DriverStatus, ResultStatus,
    LapDataEntry,
    CarTelemetry,
    CarTelemetryEntry,
    Header
} from "f1-telemetry-models";
class Parser {
    static parseSession(data: any): Session {
        let session = new Session();
        session.weather = data["m_weather"] as Weather;
        session.trackTemperature = data["m_trackTemperature"];
        session.airTemperature = data["m_airTemperature"];
        session.totalLaps = data["m_totalLaps"];
        session.trackLength = data["m_trackLength"];
        session.sessionType = data["m_sessionType"] as SessionType;
        session.track = data["m_trackId"] as Track;
        session.sessionTimeLeft = data["m_sessionTimeLeft"];
        session.sessionDuration = data["m_sessionDuration"];
        session.safetyCarStatus = data["m_safetyCarStatus"];

        let header = new Header();
        header.packetFormat = data["m_header"]["m_packetFormat"];
        header.gameMajorVersion = data["m_header"]["m_gameMajorVersion"];
        header.gameMinorVersion = data["m_header"]["m_gameMinorVersion"];
        header.sessionUID = data["m_header"]["m_sessionUID"];
        header.playerCarIndex = data["m_header"]["m_playerCardIndex"];

        session.header = header;

        return session;
    }

    static parseParticipants(data: any): Participants {
        let participants = new Participants();
        participants.numActiveCars = data["m_numActiveCars"];
        participants.participants = [];
        for (var i = 0; i < participants.numActiveCars; i++) {
            let part = data["m_participants"][i] as any;
            let participant = new Participant();
            participant.driverId = part["m_driverId"];
            participant.team = part["m_teamId"] as Team;
            participant.raceNumber = part["m_raceNumber"];
            participant.name = part["m_name"];
            participants.participants.push(participant);
        }
        return participants;
    }

    static parseLapData(data: any): LapData {
        let lapData = new LapData();
        lapData.entries = [];
        let c = data["m_lapData"].length;
        for (var i = 0; i < c; i++) {
            let d = data["m_lapData"][i];
            let lapDataEntry = new LapDataEntry();
            lapDataEntry.lastLapTime = d["m_lastLapTime"];
            lapDataEntry.currentLapTime = d["m_currentLapTime"];
            lapDataEntry.bestLapTime = d["m_bestLapTime"];
            lapDataEntry.sector1Time = d["m_sector1Time"];
            lapDataEntry.sector2Time = d["m_sector2Time"];
            lapDataEntry.carPosition = d["m_carPosition"];
            lapDataEntry.currentLapNumber = d["m_currentLapNum"];
            lapDataEntry.pitStatus = d["m_pitStatus"] as PitStatus;
            lapDataEntry.sector = d["m_sector"];
            lapDataEntry.gridPosition = d["m_gridPosition"];
            lapDataEntry.driverStatus = d["m_driverStatus"] as DriverStatus;
            lapDataEntry.resultStatus = d["m_resultStatus"] as ResultStatus;
            lapData.entries.push(lapDataEntry);
        }
        return lapData;
    }

    static parseCarTelemetry(data: any): CarTelemetry {
        let carTelemetry = new CarTelemetry();
        carTelemetry.entries = [];
        carTelemetry.buttons = data["m_buttonStatus"];
        let c = data["m_carTelemetryData"].length;
        for (var i = 0; i < c; i++) {
            let d = data["m_carTelemetryData"][i];
            let carTelemetryEntry = new CarTelemetryEntry();
            carTelemetryEntry.speed = d["m_speed"];
            carTelemetryEntry.throttle = d["m_throttle"];
            carTelemetryEntry.steering = d["m_steer"];
            carTelemetryEntry.brake = d["m_brake"];
            carTelemetryEntry.clutch = d["m_clutch"];
            carTelemetryEntry.gear = d["m_gear"];
            carTelemetryEntry.engineRPM = d["m_engineRPM"];
            carTelemetryEntry.drs = d["m_drs"];
            carTelemetry.entries.push(carTelemetryEntry);
        }
        return carTelemetry;
    }
}

export default Parser;