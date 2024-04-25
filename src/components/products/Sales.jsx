import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Sales = ({ products }) => {
  const [showNavArrows, setShowNavArrows] = useState(false);
  const ImgContainer = ({ item }) => {
    return (
      <div className="py-4 min-w-full relative flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-600  to-slate-400">
        <div className="ml-48 text-3xl -rotate-45">Sale 50%</div>
        <img className="sm:h-[40vh] mx-auto rounded-full" src={item.original} />
        <div className="mr-48 text-3xl -rotate-45">Sale 50%</div>
      </div>
    );
  };
  const images = products
    .filter((p) => p.sale === true)
    .map((i) => {
      return {
        original: i.thumbnail,
        thumbnail: i.thumbnail,
      };
    });

  return (
    <div className="relative w-full ring-2 ring-white">
      <div className="">
        <ImageGallery
          items={images}
          showBullets={true}
          showPlayButton={false}
          showFullscreenButton={false}
          showNav={showNavArrows}
          autoPlay={true}
          onMouseOver={() => setShowNavArrows(true)}
          onMouseLeave={() => setShowNavArrows(false)}
          showThumbnails={false}
          renderItem={(x) => {
            return <ImgContainer item={x} />;
          }}
        />
      </div>
    </div>
  );
};

export default Sales;
