import Vue from "vue";

export default Vue.filter('racingTime', function(value) {
    var pad = function(num, size) { return ('000' + num).slice(size * -1); },
        time = parseFloat(value).toFixed(3),
        minutes = Math.floor(time / 60) % 60,
        seconds = Math.floor(time - minutes * 60),
        milliseconds = time.slice(-3);

    var ret = "";
    if (minutes != 0) {
        ret += minutes + ":";
    }
    if (seconds != 0) {
        ret += pad(seconds, 2);
    }
    ret += "." + pad(milliseconds, 3);
    return ret;
});