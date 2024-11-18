import React, { useState } from "react";
import { motion, useViewportScroll } from "framer-motion";
import {
  carouselImage1,
  carouselImage2,
  carouselImage3,
  carouselImage4,
  carouselImage5,
  carouselImage6,
} from "src/static/img";

const ImageCarousel = () => {
  const [scrollVal, setScrollVal] = useState<number>();
  const Images = [
    carouselImage2,
    carouselImage5,
    carouselImage3,
    carouselImage4,
    carouselImage6,
    carouselImage1,
  ];
  const ImageArray = [
    ...Images,
    ...Images,
    ...Images,
    ...Images,
    ...Images,
    ...Images,
    ...Images,
  ];

  const { scrollY } = useViewportScroll();

  scrollY.onChange((s) => {
    setScrollVal(s / 3);
  });

  return (
    <div className=" bg-black overflow-x-hidden py-14">
      <motion.div
        style={{ x: scrollVal }}
        className="flex items-center justify-center"
        transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
      >
        {ImageArray.map((image, id) => (
          <img
            src={image}
            key={id}
            alt={`img-${id}`}
            className="p-1 brightness-50 rounded-[30px]  hover:brightness-100 ease-in transition-all cursor-pointer h-[150px] w-auto object-cover object-center"
          />
        ))}
      </motion.div>
      <motion.div
        style={{ x: scrollVal && -scrollVal }}
        transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
        className=" flex flex-row-reverse items-center justify-center"
      >
        {ImageArray.map((image, id) => (
          <img
            src={image}
            key={id}
            alt={`img-${id}`}
            className="p-1 brightness-50 rounded-[30px]  hover:brightness-100 ease-in transition-all cursor-pointer h-[150px] w-auto object-cover object-center"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ImageCarousel;
