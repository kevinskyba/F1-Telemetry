<template>
    <div v-if="hasData">
        Lap {{currentLap}} / {{totalLaps}}
    </div>
</template>

<script>
    import DataMixin from "../../mixins/DataMixin";
    import {randomNumber} from "../../Utils";

    export default {
        gridSettings: function() {
            return {
                i: randomNumber(),
                x: 0,
                y: 0,
                w: 1,
                h: 1,
                minW: 1,
                minH: 1,
                c: "Laps"
            }
        },
        mixins: [DataMixin],
        name: "Laps",
        computed: {
            hasData: function() {
                return this.telemetryData !== undefined && this.telemetryData["cardata"] !== undefined;
            },
            currentLap: function() {
                return Math.max.apply(Math, this.telemetryData["cardata"].map(function(c) { return c["currentLapNumber"]}));
            },
            totalLaps: function() {
                return this.telemetryData["session"]["totalLaps"];
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../styles/variables.scss";

    table {
        width: 100%;
        color: $primary-color;
        font-family: 'Press Start 2P', cursive;
    }
    th {
        text-align: left;
    }
    td {
        text-align: left;
    }

    .car-position {
        color: $timing-position-number-color;
    }

    .secondary-color {
        color: $secondary-color;
    }

    .align-right {
        text-align: right;
    }

    .bold {
        font-weight: bold;
    }
</style>