import { useLayoutEffect } from "react";
import { useAppDispatch } from "../../../stores/hooks";
import { updatePageProperties } from "../../../stores/appFunctionality/pageProperties";
import ClipBoardIcon from "../../../assets/icons/clipboard";
import GeneratorRuntimeReportListTable from "../../../components/tables/reports/generator-runtime-report";

const breadCrumb = [
  {
    url: "#",
    label: "Generator Runtime Report",
    icon: <ClipBoardIcon />,
  },
];
export default function GeneratorRuntime (){
  const dispatch = useAppDispatch();

  // update page props on component mount
  useLayoutEffect(() => {
    dispatch(
      updatePageProperties({
        breadCrumb,
        pageTitle: "Generator Runtime",
        pageDescription: "Generator runtime",
        isLoading: false,
        failedToLoad: false,
        setFailedToLoad: false,
        retryRequest: false,
      })
    );
  }, []);
    return (
        <div className="w-full">
          <GeneratorRuntimeReportListTable/>
        </div>
    )
}