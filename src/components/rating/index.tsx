import SolidStarIcon from "../../assets/icons/solid-star";
import Starcon from "../../assets/icons/star";

export default function CustomRating({ rating }: { rating: number }) {
  return (
    <div className=" flex gap-2">
      {Array.from({ length: 5 }, (_, index) => {
        return (
          <div key={index}>
            {rating >= index + 1 ? (
              <SolidStarIcon className="w-5 h-5 text-[#F3DD16]" />
            ) : (
              <Starcon className="w-5 h-5" />
            )}
          </div>
        );
      })}
    </div>
  );
}
