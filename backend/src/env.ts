process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * We just export what `yenv()` returns.
 * `keyblade` will make sure we don't rely on undefined values.
 */

export const env = {
    LOG_LEVEL: "debug",
    SERVER_PORT: 8090,
    WS_PORT: 8091,
    LOCALIZATION: "en",

    REPLAY: false,
    CAPTURE: false,
    CAPTURE_PATH: "./captures/"
};