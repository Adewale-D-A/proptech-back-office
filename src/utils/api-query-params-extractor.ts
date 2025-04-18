export default function ApiQueryParamsExtractor({
  dataset,
}: {
  dataset: { [key: string]: string | number | undefined };
}) {
  try {
    let concateString = "";
    // turn object into array of key-value pairs and filter result
    //  to only contain objects with a valid value
    const keyArray = Object.keys(dataset).filter((key) =>
      dataset[key] ? true : false
    );
    keyArray?.forEach((item, index) => {
      // concatenate query parameter options
      concateString = concateString + item + "=" + String(dataset[item]);
      // only add the symbol "&" when iteration index is not the final
      concateString =
        index + 1 === keyArray.length ? concateString : concateString + "&";
    });
    // provided remakeRequest is 'true' new api request is made without considering
    // store data
    const remakeRequest = Boolean(
      (keyArray.includes("start_date") && keyArray.includes("end_date")) ||
        keyArray.includes("search") ||
        keyArray.includes("channel") ||
        keyArray.includes("currency") ||
        keyArray.includes("room_option") ||
        keyArray.includes("payment_method") ||
        keyArray.includes("category_id") ||
        keyArray.includes("status") ||
        keyArray.includes("type") ||
        keyArray.includes("paid") ||
        keyArray.includes("expense_category_id") ||
        keyArray.includes("role_id") ||
        String(dataset["sort"] || "") === "desc"
        ? true
        : false || Number(dataset["limit"] || 20) > 20
        ? true
        : false
    );
    return {
      queryString: concateString,
      validKeys: keyArray,
      remakeRequest: remakeRequest,
    };
  } catch (error) {
    return { queryString: "", validKeys: [], remakeRequest: false };
  }
}
