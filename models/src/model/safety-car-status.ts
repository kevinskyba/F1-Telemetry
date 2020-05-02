import i18n from "../i18n/i18n";

enum SafetyCarStatus {
    No = 0,
    Full = 1,
    Virtual = 2
}

namespace SafetyCarStatus {
    export function toString(safetyCarStatus: SafetyCarStatus): string {
        switch (safetyCarStatus) {
            case 0: return i18n.NO_SAFETY_CAR_STATUS;
            case 1: return i18n.FULL_SAFETY_CAR_STATUS;
            case 2: return i18n.VIRTUAL_SAFETY_CAR_STATUS;
            default: return "";
        }
    }
}

export default SafetyCarStatus;