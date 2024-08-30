import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ReactNode } from "react";
import LoadingButton from "../button";
import PlusIcon from "../../assets/icons/plus";
export default function TabView({
  header,
  content,
}: {
  header: { id: string | number; label: string; icon: ReactNode }[];
  content: { id: string | number; data: ReactNode }[];
}) {
  return (
    <TabGroup>
      <TabList className={"flex items-center gap-5 flex-col md:flex-row"}>
        <div className="w-full flex flex-col md:flex-row gap-5 md:gap-10 ">
          {header.map((item) => (
            <Tab
              key={item?.id}
              className={
                "flex items-center justify-center md:justify-start gap-2 md:gap-3 md:text-xl py-3 border-primary text-gray-400 focus:outline-none data-[selected]:text-primary data-[selected]:border-b-4 data-[hover]:border-b-4 data-[selected]:data-[hover]:border-b-4 data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white"
              }
            >
              {item?.icon} {item?.label}
            </Tab>
          ))}
        </div>
        <div className="w-fit whitespace-nowrap">
          <LoadingButton
            label="Add New Apartment"
            isLoading={false}
            type="button"
            startIcon={<PlusIcon />}
          />
        </div>
      </TabList>
      <TabPanels>
        {content?.map((item) => (
          <TabPanel key={item?.id} className="my-5">
            {item.data}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
