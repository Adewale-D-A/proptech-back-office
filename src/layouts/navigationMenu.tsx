import { useAppSelector } from "../stores/hooks";
import FullMenuView from "./fullView";

function NavigationMenu() {
  const fullView = useAppSelector(
    (state) => state?.menuFunctions?.value?.fullMenuView
  );

  return (
    <div className={`${fullView ? "fixed md:relative top-0 left-0" : ""}`}>
      <div className="flex">
        <FullMenuView /> {/* full view  */}
      </div>
    </div>
  );
}

export default NavigationMenu;
