import { useCallback, useState } from "react";
//@ts-ignore
import { jsonToCSVuriConverter } from "adewale-utils-toolbox";
import TriggerDownload from "./trigger-download";
import DownloadIcon from "../../assets/icons/download";
// import JsonToCSVuriConverter from "./convert-json-to-csv-uri";
// import { TriggerDownload } from "adewale-ui-toolbox";

export default function ExportToCSV({
  dataset,
  jsonToCSVReformerter,
  fileName,
}: {
  dataset: { [key: string]: any }[];
  jsonToCSVReformerter: (item: { [key: string]: string }) => string[][];
  fileName?: string;
}) {
  const [exportedUri, setExportedUri] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [doneExporting, setDoneExporting] = useState(false);
  const { extractUri } = jsonToCSVuriConverter({
    dataset,
    jsonToCSVReformerter,
  });

  const handleDownload = useCallback(() => {
    setIsExporting(true);
    const csv = extractUri();
    setExportedUri(csv);
    setIsExporting(false);
    setDoneExporting(true);
  }, [extractUri]);
  return (
    <>
      {!doneExporting ? (
        <button
          onClick={() => handleDownload()}
          className="w-fit text-nowrap relative py-2.5 px-6 bg-[#F2F4F7] text-[#1D2939] hover:bg-primary transition-all hover:text-white rounded-full flex items-center gap-3"
        >
          {isExporting ? "...loading" : "Export to CSV"}
        </button>
      ) : (
        <TriggerDownload
          uri={exportedUri}
          filename={fileName || "random-export"}
          label="Download"
          endIcon={<DownloadIcon className=" animate-bounce w-6 h-6" />}
        />
      )}
    </>
  );
}
