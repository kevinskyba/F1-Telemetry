import Weather from "./weather";
import SessionType from "./session-type";
import Track from "./track";
import SafetyCarStatus from "./safety-car-status";
import Header from "./header";

class Session {
    header: Header;

    weather: Weather;

    /**
     * In degree celsius
     */
    trackTemperature: number;

    /**
     * In degree celsius
     */
    airTemperature: number;

    totalLaps: number;

    /**
     * In metres
     */
    trackLength: number;

    sessionType: SessionType;

    track: Track;

    /**
     * In seconds
     */
    sessionTimeLeft: number;

    /**
     * In seconds
     */
    sessionDuration: number;

    safetyCarStatus: SafetyCarStatus
}

export default Session;