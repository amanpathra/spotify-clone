function fancyTimeFormat(sec) {
    const hrs = ~~(sec / 3600);
    const mins = ~~((sec % 3600) / 60);
    const secs = ~~sec % 60;
    let ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function secToMin(sec) {
    const mins = ~~(sec/60);
    const secs = ~~(sec%60);
    let ret = mins + ":" + (secs < 10 ? "0" : "") + secs;
    return ret;
}

export {fancyTimeFormat, secToMin};