enum Weather {
    Clear = 0,
    Light_Cloud = 1,
    Overcast = 2,
    Light_Rain = 3,
    Heavy_rain = 4,
    Storm = 5
}

namespace Weather {
    export function toString(weather: Weather, i18n: any): string {
        switch (weather) {
            case Weather.Clear: return i18n.WEATHER_CLEAR;
            case Weather.Light_Cloud: return i18n.WEATHER_LIGHT_CLOUD;
            case Weather.Overcast: return i18n.WEATHER_OVERCAST;
            case Weather.Light_Rain: return i18n.WEATHER_LIGHT_RAIN;
            case Weather.Heavy_rain: return i18n.WEATHER_HEAVY_RAIN;
            case Weather.Storm: return i18n.WEATHER_STORM;
            default: return "";
        }
    }
}

export default Weather;