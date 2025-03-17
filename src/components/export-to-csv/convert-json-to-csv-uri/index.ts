export default function JsonToCSVuriConverter({
  dataset,
  jsonToCSVReformerter,
}: {
  dataset: {}[];
  jsonToCSVReformerter: (item: { [key: string]: string }) => string[][];
}) {
  const triggerConversion = () => {
    const csv = dataset
      .reduce<string[]>((total, cur, index) => {
        if (index === 0) {
          // Header
          total.push(
            jsonToCSVReformerter(cur)
              .map((x) => `"${x[0]}"`)
              .join(",")
          );
        }
        // Rows
        total.push(
          jsonToCSVReformerter(cur)
            .map((x) => `"${x[1]}"`)
            .join(",")
        );
        return total;
      }, [])
      .join("\r\n");
    return URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  };
  return { extractUri: triggerConversion };
}
