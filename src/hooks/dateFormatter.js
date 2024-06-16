export const formatDate = (dateString) => {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Define an array of month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Get the day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // Ensure day is two digits
    const month = monthNames[date.getMonth()]; // Get month name from the array
    const year = date.getFullYear();

    // Format the date as dd-mmm-yyyy
    return `${day}-${month}-${year}`;
}