process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const argv = require("minimist")(process.argv.slice(2));

let env = {
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: "debug",
    SERVER_PORT: 8090,
    WS_PORT: 8091,
    LOCALIZATION: "en",

    REPLAY: false,
    CAPTURE: false,
    CAPTURE_PATH: "./captures/"
} as any;

for (var key in argv) {
    if (key in env) {
        env[key] = argv[key];
    }
}

for (var key in process.env) {
    if (key in env) {
        env[key] = process.env[key];
    }
}

export { env };