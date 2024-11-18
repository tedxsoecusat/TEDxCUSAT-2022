import { motion, useAnimation } from "framer-motion";
import React from "react";
import { SpeakerCardAnimation, SpeakerCardTextAnimation } from "./animations";
import "./index.scss";

interface Props {
  name: string;
  talk: string;
  desc: string;
  image: string;
}

const SpeakerCard = ({ name, talk, desc, image }: Props) => {
  const controls = useAnimation();

  return (
    <motion.div
      onHoverStart={() => controls.start("visible")}
      onHoverEnd={() => controls.start("hidden")}
      onTap={() => {
        controls.start("visible");
        setTimeout(() => {
          controls.start("hidden");
        }, 3000);
      }}
      className="max-w-1/3 mr-5 md:mr-10 h-[520px] relative flex-grow-0 flex-shrink-0 basis-80"
    >
      <motion.img
        variants={SpeakerCardAnimation}
        animate={controls}
        src={image}
        alt="speaker"
        className="h-full object-cover rounded-[16px]"
      />
      <div className=" speakerCardBlurredTextContainer p-4 h-auto min-h-[10%] absolute bottom-0 w-full ">
        <h2 className=" text-[20px] font-semibold text-[#FAFAFA] leading-7 ">
          {name}
        </h2>
        <motion.p
          variants={SpeakerCardTextAnimation}
          animate={controls}
          className=" h-0 opacity-0 text-sm text-[#FAFAFA] leading-5 my-2"
        >
          {desc}
        </motion.p>
        <p className=" text-[12px] font-semibold text-[#FF2B06] uppercase leading-6">
          <b>Talk:</b>
          <br />
          {talk}
        </p>
      </div>
    </motion.div>
  );
};

export default SpeakerCard;
