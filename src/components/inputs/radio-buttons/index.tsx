export default function RadioInputs({
  name,
  values,
  setValue,
}: {
  name: string;
  values: {
    id: string;
    title: string;
    value: string;
    label?: string;
    defaultChecked: boolean;
  }[];
  setValue: Function;
}) {
  return (
    <div className=" w-full flex flex-col gap-3">
      {values.map((item) => (
        <div key={item?.id} className=" flex flex-col gap-2">
          {item?.label && (
            <label htmlFor={item?.id} className="text-sm text-gray-500">
              {item?.label}
            </label>
          )}
          <label
            htmlFor={item?.id}
            className={`p-3 rounded-md border flex justify-between w-full`}
          >
            <span className="">{item?.title}</span>
            <input
              type="radio"
              name={name}
              id={item?.id}
              title={item?.title}
              value={item?.value}
              defaultChecked={item?.defaultChecked}
              onChange={(e) => setValue(e.target.value)}
              className=""
            />
          </label>
        </div>
      ))}
    </div>
  );
}
