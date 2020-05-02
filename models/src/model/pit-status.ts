
enum PitStatus {
    None = 0,
    Pitting = 1,
    InPitArea = 2
}

namespace PitStatus {
    export function toString(pitStatus: PitStatus): string {
        return pitStatus.toString();
    }
}

export default PitStatus;