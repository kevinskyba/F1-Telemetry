<template>
    <div>
        <grid-layout
                :layout.sync="layout"
                :col-num="6"
                :row-height="64"
                :is-draggable="editMode"
                :is-resizable="editMode"
                :margin="[10, 10]"
                :use-css-transforms="false"
        >
            <grid-item v-for="item in layout"
                       :x="item.x"
                       :y="item.y"
                       :w="item.w"
                       :h="item.h"
                       :min-h="item.minH"
                       :min-w="item.minW"
                       :i="item.i"
                       :key="item.i">
                <component :is="item.c"/>
            </grid-item>
        </grid-layout>
        <div v-on:click="onOptionsClick" class="options-button"></div>
    </div>
</template>

<script>
    import Timing from "../panels/Timing";
    import Laps from "../panels/Laps";
    import VueGridLayout from 'vue-grid-layout';

    export default {
        name: "GridBoard",
        components: {
            Timing: Timing,
            Laps: Laps,
            GridLayout: VueGridLayout.GridLayout
        },
        data: function() {
            return {
                editMode: false,
                layout: [
                    Timing.gridSettings(),
                    Laps.gridSettings()
                ]
            }
        },
        methods: {
            onOptionsClick: function() {
                this.editMode = !this.editMode;
            }
        }
    }
</script>
<style>
    .vue-grid-item {
        overflow-x: hidden;
        overflow-y: auto;
    }

    .vue-resizable {
        border: 1px white solid;
    }

    .options-button {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 50px;
        width: 50px;
        cursor: pointer;
    }
</style>