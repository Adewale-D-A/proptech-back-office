import { ReactNode } from "react";
import { Link } from "react-router-dom";
import NextArrowIcon from "../../assets/icons/next-arrow";

export default function DashboardCard({
  theme,
  icon,
  label,
  value,
  urlSrc,
  urlLabel,
}: {
  theme: string;
  icon: ReactNode;
  label: string;
  value: string | number;
  urlSrc?: string;
  urlLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-3 md:gap-8 items-stretch justify-between shadow-md border p-4 rounded-xl">
      <div className={`${theme} p-3 w-fit rounded-full`}>{icon}</div>
      <div className=" flex flex-col gap-3">
        <p className=" text-gray-500">{label}</p>
        <h5 className=" font-semibold text-3xl">{value}</h5>
      </div>
      {urlSrc && (
        <Link
          to={urlSrc}
          className="flex items-center gap-2 text-sm text-primary hover:gap-4 transition-all"
        >
          {urlLabel} <NextArrowIcon />
        </Link>
      )}
    </div>
  );
}
