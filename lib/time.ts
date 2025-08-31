export function formatDateHour(isoString: string | undefined | null) {
    if (!isoString) return null;
    const date = new Date(isoString); 
    let minutes: string | number = date.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    let hours: string | number = date.getHours();
    if (hours < 10) hours = "0" + hours;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${hours}:${minutes} ${month}/${day}/${year}`;
}