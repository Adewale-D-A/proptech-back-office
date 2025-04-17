import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ReactNode } from "react";

export default function TableActionDropDown({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Menu>
      <MenuButton className="inline-flex items-center gap-2 rounded-md bg-primary/15 py-1.5 px-3 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-primary/30 data-[open]:bg-primary/30 data-[focus]:outline-1 data-[focus]:outline-white">
        ...
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 text-sm shadow-md origin-top-right flex flex-col text-left items-start rounded-xl border border-white/5 bg-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {children}
      </MenuItems>
    </Menu>
  );
}
