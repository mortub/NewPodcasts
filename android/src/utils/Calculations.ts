//takes time in seconds and returns it in the correct format
export const durationFormat = (totalSeconds) => {
    if (totalSeconds.includes(':')) {
        var a = totalSeconds.split(':'); // split it at the colons
        // minutes are worth 60 seconds. Hours are worth 60 minutes.
        var seconds;
        if (a.length > 2) {
            seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        }
        else {
            seconds = (+a[0]) * 60 + (+a[1]);
        }

        return new Date(seconds * 1000).toISOString().substr(11, 8);
    }
    return new Date(totalSeconds * 1000).toISOString().substr(11, 8);
};

export const timePassedFormat = (seconds) =>{
    var time = seconds.toString().split(".");
    return new Date(time[0] * 1000).toISOString().substr(11, 8);
}