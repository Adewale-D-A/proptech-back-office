import Status from "../status";

export default function ConfirmationCard() {
  return (
    <div className=" flex items-center justify-between">
      <div className=" flex items-center gap-3">
        <img
          src="/logo_blue.png"
          alt="image"
          className=" rounded-full h-8 w-8 object-cover aspect-square"
        />
        <div>
          <h6 className=" font-semibold">Funsho Michaels</h6>
          <span className=" text-xs">funsho.m@yahoo.com</span>
        </div>
      </div>
      <div className=" flex flex-col gap-1 items-end">
        <h6 className=" font-semibold">ID Number: 4811</h6>
        <Status status="Confirmed" />
      </div>
    </div>
  );
}
