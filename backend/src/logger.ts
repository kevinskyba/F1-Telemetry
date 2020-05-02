import {Singleton} from "typescript-ioc";

const logger = require('bristol');
const palin = require('palin');
import { env } from './env';

/* istanbul ignore next */
if (env.LOG_LEVEL !== 'off') {
    logger.addTarget('console').withFormatter(palin, {
        rootFolderName: 'F1-Telemetry' // Edit this to match your actual foldername
    })
}

let _logging_enabled = true;
let _original_log = console.log;
console.log = function(str: string) {
    if (_logging_enabled) _original_log(str);
};

logger._processStack = function(stack: any, bristolFileName: any) {
    let lastIndex = stack.length - 1;
    for (; lastIndex >= 0; lastIndex--) {
        if (stack[lastIndex].getFileName() === bristolFileName) {
            break
        }
    }
    const line = stack[lastIndex + 2];
    if (line) {
        return {
            file: line.getFileName(),
            line: line.getLineNumber().toString()
        }
    }
    return null
};

export class Logger {

    public static enable() { _logging_enabled = true; }
    public static disable() { _logging_enabled = false; }

    public static progress(index: number, max: number, reportInterval: number) {
        if ((index / max) % Math.round(max * reportInterval) == 0) {
            logger.info(`${index+1}/${max} (${index/max * 100}%)`);
        }
    }

    public static debug(msg: String, obj: any = null) {
        if (obj) {
            logger.debug(msg, obj);
        } else {
            logger.debug(msg);
        }
    }

    public static info(msg: String, obj: any = null) {
        if (obj) {
            logger.info(msg, obj);
        } else {
            logger.info(msg);
        }
    }

    public static warn(msg: String, obj: any = null) {
        if (obj) {
            logger.warn(msg, obj);
        } else {
            logger.warn(msg);
        }
    }

    public static error(msg: String, obj: any = null) {
        if (obj) {
            logger.error(msg, obj);
        } else {
            logger.error(msg);
        }
    }

    public static trace(msg: String, obj: any = null) {
        if (obj) {
            logger.trace(msg, obj);
        } else {
            logger.trace(msg);
        }
    }
}