import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ReactNode } from "react";

export default function BookingTab({
  header,
  content,
}: {
  header: { id: string | number; label: string; icon: ReactNode }[];
  content: { id: string | number; data: ReactNode }[];
}) {
  // const [trackTab, setTrackTab] = useState(1);
  return (
    <>
      <TabGroup>
        <TabList className={"flex items-center gap-5 flex-col md:flex-row"}>
          <div className="w-full flex flex-col md:flex-row gap-5 md:gap-x-8 flex-wrap ">
            {header.map((item, index) => (
              <Tab
                key={item?.id}
                // onClick={() => setTrackTab(index + 1)}
                className={
                  "flex items-center justify-center md:justify-start gap-2 md:gap-3 py-3 border-primary text-gray-400 focus:outline-none data-[selected]:text-primary data-[selected]:border-b-4 data-[hover]:border-b-4 data-[selected]:data-[hover]:border-b-4 data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white"
                }
              >
                {item?.icon} {item?.label}
              </Tab>
            ))}
          </div>
        </TabList>
        <TabPanels>
          {content?.map((item) => (
            <TabPanel key={item?.id} className="">
              {item.data}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </>
  );
}
