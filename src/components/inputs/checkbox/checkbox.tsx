export default function CheckboxInput({
  id,
  label,
  value,
  setValue,
  readOnly = false,
}: {
  id: string;
  label: string;
  readOnly?: boolean;
  value: boolean;
  setValue: Function;
}) {
  return (
    <label key={id} htmlFor={id} className=" flex items-center gap-3">
      <input
        type="checkbox"
        checked={value}
        id={id}
        readOnly={readOnly}
        onChange={() => setValue(!value)}
      />{" "}
      <span className=" text-gray-600">{label}</span>
    </label>
  );
}
