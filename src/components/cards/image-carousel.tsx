import { useCallback, useState } from "react";
import NavigateNextIcon from "../../assets/icons/navigate-next";
import NavigatePrevIcon from "../../assets/icons/navigate-prev";

const imageArray = ["/temp/temp_apartment_1.jpg"] as string[];

export default function ImageCarousel() {
  const data = {
    images: [
      {
        id: 1,
        path: "/temp/temp_apartment_1.jpg",
      },
      {
        id: 2,
        path: "/temp/temp_apartment_2.jpg",
      },
      {
        id: 3,
        path: "/temp/temp_apartment_3.jpg",
      },
    ],
  };
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // productsArray next function
  const showNextImage = useCallback(() => {
    if (currentImgIndex + 1 < data?.images.length) {
      setCurrentImgIndex((prev) => prev + 1);
    }
  }, [data, currentImgIndex]);

  // productsArray next previous
  const showPrevImage = useCallback(() => {
    if (currentImgIndex > 0) {
      setCurrentImgIndex((prev) => prev - 1);
    }
  }, [currentImgIndex]);

  const changeImage = useCallback((index: number) => {
    setCurrentImgIndex(index);
  }, []);
  return (
    <div className="w-full relative">
      <div className="w-full h-96 bg-gray-500/30 rounded-md relative">
        <img
          src={
            data?.images?.length > 0
              ? data?.images[currentImgIndex]?.path
              : imageArray[currentImgIndex]
          }
          alt={"shirt"}
          className="w-full h-full object-cover rounded-md"
        />
        <div className="w-full flex gap-5 justify-center items-center my-2 absolute bottom-3 left-0">
          {Array.from({ length: data?.images?.length }, (_, index) => {
            return (
              <button
                type="button"
                title="change image"
                onClick={() => changeImage(index)}
                key={index}
                className={`w-3 h-auto aspect-square rounded-full transition-all ${
                  index === currentImgIndex ? "bg-primary" : " bg-gray-300"
                }`}
              ></button>
            );
          })}
        </div>
        <div className="w-full flex justify-between items-center gap-5 px-5 text-white absolute top-1/2 left-0">
          <button
            title="previous"
            type="button"
            onClick={() => showPrevImage()}
            className={`${
              currentImgIndex > 0
                ? "bg-white  text-black"
                : "bg-gray-300 cursor-not-allowed text-gray-400"
            }  p-3 rounded-full shadow-md`}
          >
            <NavigatePrevIcon />
          </button>
          <button
            type="button"
            title="next"
            onClick={() => showNextImage()}
            className={`${
              currentImgIndex + 1 < data?.images?.length
                ? "bg-white text-black"
                : "bg-gray-300 cursor-not-allowed text-gray-400"
            }  p-3 rounded-full shadow-md `}
          >
            <NavigateNextIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
