import dataService from "../services/DataService";

export default {
    name: "DataMixin",
    data: function() {
        return {
            telemetryData: []
        }
    },
    mounted() {
        dataService.addListener(this.onData);
    },
    beforeDestroy() {
        dataService.removeListener(this.onData);
    },
    methods: {
        onData: function(data) {
            this.telemetryData = data;
        }
    }
}