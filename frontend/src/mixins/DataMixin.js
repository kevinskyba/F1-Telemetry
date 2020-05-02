export function DataMixin(name) {
    return  {
        name: "DataMixin",
        data: () => ({
            [name]: {}
        }),
        beforeMount() {
            this.$options.sockets.onopen = () => {
                this.$socket.sendObj({"type": "subscribe", "topic": name});
            };
            this.$options.sockets.onmessage = (msg) => {
                var data = JSON.parse(msg["data"]);
                if (data["type"] === name) {
                    this.$set(this, name, data["data"]);
                }
            };
        },
        beforeDestroy() {
            this.$socket.sendObj({"type": "unsubscribe", "topic": name});
        }
    }
}