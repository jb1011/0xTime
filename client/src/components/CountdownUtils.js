import dayjs from 'dayjs';

export function getRemainingTimeUntilMsTimestamp(timestampMs) {
    const timestampDayJs = dayjs(timestampMs);
    const nowDayjs = dayjs();
    if (timestampDayJs.isBefore(nowDayjs)) {
        return {
            seconds: '00',
            minutes: '00',
            hours: '00',
            days: '00'
        }
    }
    return {
        seconds: getRemainingSeconds(nowDayjs, timestampDayJs),
        minutes: getRemainingMinutes(nowDayjs, timestampDayJs),
        hours: getRemainingHours(nowDayjs, timestampDayJs),
        days: getRemainingDays(nowDayjs, timestampDayJs),
    }
}

function getRemainingSeconds(nowDayjs, timestampDayJs) {
    const seconds = timestampDayJs.diff(nowDayjs, 'seconds') % 60;
    return padWithZeros(seconds, 2);
}

function getRemainingMinutes(nowDayjs, timestampDayJs) {
    const minutes = timestampDayJs.diff(nowDayjs, 'minutes') % 60;
    return padWithZeros(minutes, 2);
}

function getRemainingHours(nowDayjs, timestampDayJs) {
    const hours = timestampDayJs.diff(nowDayjs, 'hours') % 24;
    return padWithZeros(hours, 2);
}

function getRemainingDays(nowDayjs, timestampDayJs) {
    const days = timestampDayJs.diff(nowDayjs, 'days');
    return days.toString();
}

function padWithZeros(number, minLength) {
    const numberString = number.toString();
    if(numberString.length >= minLength) return numberString;
    return "0".repeat(minLength - numberString.length) + numberString
}