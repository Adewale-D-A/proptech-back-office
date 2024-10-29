export default function Switch({
  id,
  value,
  setValue,
  size = "md",
}: {
  id: string;
  value: boolean;
  setValue: Function;
  size?: "md" | "sm";
}) {
  return (
    <label
      className={`relative inline-block ${
        size === "md" ? "w-[60px] h-[34px]" : "w-[30px] h-[17px]"
      }`}
      style={
        {
          "--size": size === "md" ? "26px" : "13px",
          "--position": size === "md" ? "4px" : "2px",
        } as any
      }
    >
      <input
        type="checkbox"
        onChange={() => setValue(!value)}
        checked={value}
        title="toggle-button"
        id={id}
        className="hidden toggle-input"
      />
      <span className="slider round absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-400 transition-all rounded-full"></span>
    </label>
  );
}
