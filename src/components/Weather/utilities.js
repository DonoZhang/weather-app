export function offsetToTime(offset){
    var current = new Date();
    var utc = new Date(
        current.getUTCFullYear(),
        current.getUTCMonth(),
        current.getUTCDate(),
        current.getUTCHours(),
        current.getUTCMinutes(), 
        current.getUTCSeconds()
      ).getTime();
    var locale = utc + offset*1000;
    var d = new Date(locale);
    var h = d.getHours();
    var m = d.getMinutes()<10?`0${d.getMinutes()}`:d.getMinutes();
    return `${h}:${m}`;
}