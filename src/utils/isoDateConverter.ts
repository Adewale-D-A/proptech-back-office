export default function formatDate(dateString: string) {
  try {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
    } as any;
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (error) {
    return "";
  }
}

export function formatTime(dateString: string) {
  try {
    const options = {
      hour: "numeric",
      minute: "numeric",
    } as any;
    const dateTime = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    const time = dateTime?.split(",")[1];
    return time;
  } catch (error) {
    return "";
  }
}

export function formatDateToString(date: Date) {
  const yyyy = String(date.getFullYear());
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // JS months are 0-indexed
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
