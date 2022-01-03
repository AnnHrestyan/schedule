export function getParsedTime(time) {
    return `${("0" + time.getHours()).slice(-2)}:${("0" + time.getMinutes()).slice(-2)}`
}
export function getParsedDate(date) {
    return `${("0" + (date.getDate() + 1)).slice(-2)}-${('0' + (date.getMonth()+1)).slice(-2)}-${date.getFullYear()}`
}
