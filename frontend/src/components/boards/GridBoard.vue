<template>
    <grid-layout
            :layout.sync="layout"
            :col-num="6"
            :row-height="64"
            :is-draggable="true"
            :is-resizable="true"
            :margin="[10, 10]"
            :use-css-transforms="false"
    >
        <grid-item v-for="(item, index) in layout"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key="item.i">
            <component :is="panels[index]"/>
        </grid-item>
    </grid-layout>
</template>

<script>
    import Timing from "../panels/Timing";
    import VueGridLayout from 'vue-grid-layout';

    export default {
        name: "GridBoard",
        components: {
            Timing: Timing,
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem
        },
        data: function() {
            return {
                layout: [{
                    i: 0,
                    x: 0,
                    y: 0,
                    w: 6,
                    h: 2
                },{
                    i: 1,
                    x: 0,
                    y: 0,
                    w: 6,
                    h: 2
                }, {
                    i: 2,
                    x: 0,
                    y: 0,
                    w: 6,
                    h: 2
                }],
                panels: ["Timing", "Timing", "Timing"]
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
</style>