interface props {
  dataset: {
    id: string;
    profile: string;
  }[];
}

export default function UsersAvatarCount({ dataset }: props) {
  return (
    <div className="relative flex items-center">
      {dataset.slice(0, 3).map((user, index) => {
        return (
          <div
            key={user?.id}
            className="absolute top-0 h-4 w-4 flex items-center justify-center aspect-square overflow-hidden rounded-full border border-white"
            style={{ left: `${index * 12}px` }}
          >
            <img
              src={user?.profile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}
      {dataset?.length - 3 > 0 && (
        <div
          style={{ left: `${dataset?.slice(0, 3).length * 12}px` }}
          className="absolute top-0 min-h-4 min-w-4 flex items-center text-xs justify-center aspect-square overflow-hidden border border-white bg-primary rounded-full"
        >
          <span className="text-white">{dataset?.length - 3}+</span>
        </div>
      )}
    </div>
  );
}
