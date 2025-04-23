import { iconList } from "./icon-library";

export default function RenderIcon({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const Icon = iconList.find((item) => item?.value === value)?.icon;

  if (!Icon) {
    return <></>;
  }
  return <Icon className={className} />;
}
