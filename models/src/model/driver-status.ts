
enum DriverStatus {
    InGarage = 0,
    FlyingLap = 1,
    InLap = 2,
    OutLap = 3,
    OnTrack = 4
}

namespace DriverStatus {
    export function toString(driverStatus: DriverStatus): string {
        return driverStatus.toString();
    }
}

export default DriverStatus;