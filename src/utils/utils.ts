export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Ensures AM/PM format
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
