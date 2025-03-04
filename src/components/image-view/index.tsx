import ImageCarousel from "../cards/image-carousel";

export default function ImageViewer({ images }: { images: { url: string }[] }) {
  return (
    <div className=" w-full">
      <ImageCarousel images={images} />
    </div>
  );
}
