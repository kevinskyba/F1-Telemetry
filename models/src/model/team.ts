
enum Team {
    Mercedes = 0,
    Ferrari = 1,
    Red_Bull_Racing = 2,
    Williams = 3,
    Racing_Point = 4,
    Renault = 5,
    Toro_Rosso = 6,
    Haas = 7,
    McLaren = 8,
    Alfa_Romeo = 9,
    McLaren_1988 = 10,
    McLaren_1991 = 11,
    Williams_1992 = 12,
    Ferrari_1995 = 13,
    Williams_1996 = 14,
    McLaren_1998 = 15,
    Ferrari_2002 = 16,
    Ferrari_2004 = 17,
    Renault_2006 = 18,
    Ferrari_2007 = 19,
    Red_Bull_2010 = 21,
    Ferrari_1976 = 22,
    ART_Grand_Prix = 23,
    Campos_Vexatec_Racing = 24,
    Carlin = 25,
    Charouz_Racing_System = 26,
    DAMS = 27,
    Russian_time = 28,
    MP_Motorsport = 29,
    Pertamina = 30,
    McLaren_1990 = 31,
    Trident = 32,
    BWT_Arden = 33,
    McLaren_1976 = 34,
    Lotus_1972 = 35,
    Ferrari_1979 = 36,
    McLaren_1982 = 37,
    Williams_2003 = 38,
    Brawn_2009 = 39,
    Lotus_1978 = 40,
    Ferrari_1990 = 63,
    McLaren_2010 = 64,
    Ferrari_2020 = 65
};


namespace Team {
    export function toString(team: Team): string {
        return team.toString();
    }
}

export default Team;