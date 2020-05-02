import i18n from "../i18n/i18n";

enum SessionType {
    Unknown = 0,
    P1 = 1,
    P2 = 2,
    P3 = 3,
    P_Short = 4,
    Q1 = 5,
    Q2 = 6,
    Q3 = 7,
    Q_Short = 8,
    OSQ = 9,
    R = 10,
    R2 = 11,
    Time_Trial = 12
}

namespace SessionType {
    export function toString(sessionType: SessionType): string {
        return sessionType.toString();
    }
}

export default SessionType;