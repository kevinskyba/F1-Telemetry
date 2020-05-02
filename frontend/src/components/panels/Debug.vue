<template>
    <div>
        <div class="panel">
            <div v-if="session" v-html="JSON.stringify(session, null, 2).replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/(?:\n)/g, '&nbsp;')"></div>
        </div>
        <div class="panel">
            <div v-if="participants" v-html="JSON.stringify(participants, null, 2).replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/(?:\n)/g, '&nbsp;')"></div>
        </div>
        <div class="panel">
            <div v-if="lapData" v-html="JSON.stringify(lapData, null, 2).replace(/(?:\r\n|\r|\n)/g, '<br>').replace(/(?:\n)/g, '&nbsp;')"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {DataMixin} from "../../mixins/DataMixin";

    export default {
        mixins: [DataMixin("session"), DataMixin("participants"), DataMixin("lapData")],
        name: "Debug"
    }
</script>

<style scoped>
    @import "../../styles/panel.css";

    .panel {
        text-align: left;
        border: 1px solid black;
    }
</style>