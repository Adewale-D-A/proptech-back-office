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
