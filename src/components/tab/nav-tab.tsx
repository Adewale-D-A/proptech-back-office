import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export default function NavTab({
  tabList,
}: {
  tabList: { id: number; icon: ReactNode; label: string; url: string }[];
}) {
  return (
    <nav className="w-full flex items-center flex-wrap gap-6 px-5 ">
      {tabList?.map((items) => {
        return (
          <div key={items?.id} className="w-fit text-nowrap group">
            <NavLink
              to={items?.url}
              className={({ isActive }) =>
                isActive
                  ? `flex items-center justify-center md:justify-start gap-2 md:gap-3 py-3 border-primary focus:outline-none text-primary border-b-4  data-[hover]:text-primary outline-1 outline-white`
                  : `flex items-center justify-center md:justify-start gap-2 md:gap-3 py-3 border-primary text-gray-400 focus:outline-none hover:border-b-4  hover:text-primary focus:outline-1 focus:outline-white`
              }
            >
              {items?.icon} {items?.label}
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
}
