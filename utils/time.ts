export function formatTimestampToString(timestamp: number): string {
    // Create a Date object
    const date = new Date(timestamp);

    // Extract date and time components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    // Format the date string
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export function formatTimestampToDate(timestamp: number) {
    return formatTimestampToString(timestamp).split(' ')[0];
}