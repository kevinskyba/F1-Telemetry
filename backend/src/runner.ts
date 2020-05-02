import {Logger} from "./logger";
import {Inject} from "typescript-ioc";
import {Server} from "./server";
import args from "args";

class Runner {

    @Inject
    private server: Server;

    constructor() {
        this.onStart();
    }

    private onStart() {
        Logger.info("Finished initialization");
        try {
            this.server.start();
            Logger.info("Everything is up and running");
        } catch (err) {
            Logger.error("Error while setting up server", err);
        }
    }

    private onError() {
        process.exit(1);
    }
}

new Runner();