
enum Track {
    Melbourne = 0,
    Paul_Ricard = 1,
    Shanghai = 2,
    Sakhir_Bahrain = 3,
    Catalunya = 4,
    Monaco = 5,
    Montreal = 6,
    Silverstone = 7,
    Hockenheim = 8,
    Hungaroring = 9,
    Spa = 10,
    Monza = 11,
    Singapore = 12,
    Suzuka = 13,
    Abu_Dhabi = 14,
    Texas = 15,
    Brazil = 16,
    Austria = 17,
    Sochi = 18,
    Mexico = 19,
    Baku_Azerbaijan = 20,
    Sakhir_Short = 21,
    Silverstone_Short = 22,
    Texas_Short = 23,
    Suzuka_Short = 24
};


namespace SessionType {
    export function toString(track: Track): string {
        return track.toString();
    }
}

export default Track;