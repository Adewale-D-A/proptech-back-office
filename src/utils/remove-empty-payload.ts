export default function purgeEmptyPayload({
  payload,
}: {
  payload: {
    [key: string]: any;
  };
}) {
  try {
    const newPayload = Object.fromEntries(
      Object.entries(payload).filter(([key]) =>
        payload[key] === "" ||
        payload[key] === 0 ||
        payload[key]?.length === 0 ||
        payload[key] === undefined
          ? false
          : true
      )
    ) as any;
    return newPayload;
  } catch (error) {
    return payload;
  }
}
