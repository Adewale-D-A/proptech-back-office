export default function Switch({
  id,
  value,
  setValue,
}: {
  id: string;
  value: boolean;
  setValue: Function;
}) {
  return (
    <label className="relative inline-block w-[60px] h-[34px]">
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
