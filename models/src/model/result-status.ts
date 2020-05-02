
enum ResultStatus {
    Invalid = 0,
    Inactive = 1,
    Active = 2,
    Finished = 3,
    Disqualified = 4,
    NotClassified = 5,
    Retired = 6
}

namespace ResultStatus {
    export function toString(resultStatus: ResultStatus): string {
        return resultStatus.toString();
    }
}

export default ResultStatus;