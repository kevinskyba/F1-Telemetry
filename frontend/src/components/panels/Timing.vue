<template>
   <table>
       <thead>
       <th></th>
       <th></th>
       <th>Lap</th>
       <th>Current</th>
       <th>Diff</th>
       <th>Sector 1</th>
       <th>Sector 2</th>
       <th>Best</th>
       </thead>
       <tbody>
       <tr v-for="(item, index) in (mergedCarData ? mergedCarData.length : [])" v-bind:key="index">
           <td class="align-right bold car-position" style="padding-right: 20px">{{mergedCarData[index].carPosition}}</td>
           <td>{{mergedCarData[index].name}}</td>
           <td>{{mergedCarData[index].currentLapNumber}}</td>
           <td>{{mergedCarData[index].currentLapTime | racingTime}}</td>

           <td v-if="mergedCarData[index].diff != 0">{{mergedCarData[index].diff | racingTime}}</td>
           <td v-else></td>

           <td class="secondary-color">{{mergedCarData[index].sector1Time | racingTime}}</td>
           <td class="secondary-color">{{mergedCarData[index].sector2Time | racingTime}}</td>
           <td>{{mergedCarData[index].bestLapTime | racingTime}}</td>
       </tr>
       </tbody>
   </table>
</template>

<script>
    import {DataMixin} from "@/mixins/DataMixin";

    export default {
        mixins: [DataMixin("session"), DataMixin("participants"), DataMixin("lapdata")],
        name: "Timing",
        computed: {
            mergedCarData: function() {
                let merged = [];
                if (this.participants !== undefined && this.lapdata !== undefined) {
                    if (this.participants.numActiveCars > 0) {
                        for (let i = 0; i < this.participants.numActiveCars; i++) {
                            if (this.participants.participants && this.lapdata.entries)
                            {
                                let data = {...this.participants.participants[i], ...this.lapdata.entries[i]};
                                merged.push(data);
                            }
                        }
                        merged = merged.sort(function(a, b) { return a.carPosition - b.carPosition; });

                        let last = null;
                        for (let i = 0; i < merged.length; i++) {
                            let data = merged[i];
                            if (last != null) {
                                if (last.currentLapNumber == data.currentLapNumber) {
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
                }
                console.log(merged);
                return merged;
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