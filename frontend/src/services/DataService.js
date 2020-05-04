
class DataService {

    _reconnectDelay = 5000;
    socket;

    _lastSession;
    _lastParticipants;
    _lastLapData;
    _lastCarTelemetry;
    _lastCarData;

    _listener = [];

    constructor() {
        this._setupWebsocket();
    }

    addListener(listener) {
        this._listener.push(listener);
    }

    removeListener(listener) {
        const index = this._listener.indexOf(listener, 0);
        if (index > -1) {
            this._listener.splice(index, 1);
        }
    }

    _setupWebsocket() {
        if (process.env.NODE_ENV !== "development") {
            var url = window.location.href;
            var urlArr = url.split("/");
            var host = urlArr[2];
            this.socket = new WebSocket(`ws://${host}/ws`);
        } else {
            this.socket = new WebSocket(`ws://localhost:8091/ws`);
        }

        this.socket.onopen = () => {
            this.socket.send(JSON.stringify({"type": "subscribe", "topic": "session"}));
            this.socket.send(JSON.stringify({"type": "subscribe", "topic": "participants"}));
            this.socket.send(JSON.stringify({"type": "subscribe", "topic": "lapdata"}));
            this.socket.send(JSON.stringify({"type": "subscribe", "topic": "cartelemetry"}));
        };
        this.socket.onmessage = (msg) => {
            var data = JSON.parse(msg["data"]);
            switch (data["type"]) {
                case "session": this._onSession(data["data"]); break;
                case "participants": this._onParticipants(data["data"]); break;
                case "lapdata": this._onLapData(data["data"]); break;
                case "cartelemetry": this,this._onCarTelemetry(data["data"]); break;
            }
        };
        this.socket.onclose = (e) => {
            console.log("WebSocket was closed, will try to reconnect in 5 seconds... ", e.reason);
            setTimeout(function() {
                this._setupWebsocket();
            }.bind(this), this._reconnectDelay);
        };
        this.socket.onerror = (err) => {
            if (err.message !== undefined) {
                console.log("WebSocket had an error: ", err.message);
            }
        };
    }

    _notify() {
        for (var list in this._listener) {
            this._listener[list]({
                session: this._lastSession,
                participants: this._lastParticipants,
                lapdata: this._lastLapData,
                cartelemetry: this._lastCarTelemetry,
                cardata: this._lastCarData
            });
        }
    }

    _updateTelemetry() {
        if (this._lastSession === undefined || this._lastParticipants === undefined || this._lastLapData === undefined || this._lastCarTelemetry === undefined) return;

        let merged = [];
        if (this._lastParticipants.numActiveCars > 0) {
            for (let i = 0; i < this._lastParticipants.numActiveCars; i++) {
                if (this._lastParticipants.participants && this._lastLapData.entries)
                {
                    let data = {...this._lastParticipants.participants[i], ...this._lastLapData.entries[i], ...this._lastCarTelemetry.entries[i]};
                    merged.push(data);
                }
            }
            merged = merged.sort(function(a, b) { return a.carPosition - b.carPosition; });

            let last = null;
            for (let i = 0; i < merged.length; i++) {
                let data = merged[i];
                if (last != null) {
                    if (last.currentLapNumber === data.currentLapNumber) {
                        data.diff = last.currentLapTime - data.currentLapTime;
                    } else {
                        data.diff = 0;
                    }
                } else {
                    data.diff = 0;
                }
                last = data;
            }
        }
        this._lastCarData = merged;

        this._notify();
    }

    _onSession(data) {
        this._lastSession = data;
        this._updateTelemetry();
    }

    _onParticipants(data) {
        this._lastParticipants = data;
        this._updateTelemetry();
    }

    _onLapData(data) {
        this._lastLapData = data;
        this._updateTelemetry();
    }

    _onCarTelemetry(data) {
        this._lastCarTelemetry = data;
        this._updateTelemetry();
    }
}

const dataService = new DataService();

export default dataService;