import PitStatus from "./pit-status";
import DriverStatus from "./driver-status";
import ResultStatus from "./result-status";

class LapDataEntry {
    lastLapTime: number;
    currentLapTime: number;
    bestLapTime: number;
    sector1Time: number;
    sector2Time: number;
    carPosition: number;
    currentLapNumber: number;
    pitStatus: PitStatus;
    sector: number;
    penalties: number;
    gridPosition: number;
    driverStatus: DriverStatus;
    resultStatus: ResultStatus;
}

export default LapDataEntry;