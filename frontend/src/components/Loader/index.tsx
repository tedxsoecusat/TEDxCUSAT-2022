import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Loader = () => {
  const [hidden, setHidden] = useState<boolean>(false);
  const body = window.document.querySelector("body");

  useEffect(() => {
    body?.classList.add("overflow-hidden");
    setTimeout(() => {
      body?.classList.remove("overflow-hidden");
      setHidden(true);
    }, 7000);
  }, [body?.classList]);

  if (hidden) return null;

  return (
    <motion.div
      initial={{
        y: 0,
      }}
      animate={{
        y: "-100vh",
        transition: {
          type: "tween",
          duration: 1,
          delay: 5,
        },
      }}
      className="fixed top-0 left-0 z-[100] h-full w-full flex flex-col items-center justify-center text-white bg-black overflow-hidden"
    >
      <motion.div
        animate={{
          scale: 20,
          transition: {
            type: "tween",
            duration: 1,
            delay: 4,
          },
        }}
        initial={{
          scale: 1,
        }}
      >
        <motion.h2
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              type: "tween",
              duration: 1,
              delay: 0.5,
            },
          }}
          initial={{
            y: 100,
            opacity: 0,
          }}
          className="text-[400px] leading-[400px] font-black animated-text"
        >
          X
        </motion.h2>
      </motion.div>
      <motion.h1
        className="text-[50px] md:text-[72px] font-black text-center"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            type: "tween",
            duration: 1,
            delay: 1.5,
          },
        }}
      >
        <span className="animated-text">
          TED<sup className="animated-text px-[6px]">X</sup>
        </span>
        CUSAT
      </motion.h1>
      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            type: "tween",
            duration: 1,
            delay: 2.5,
          },
        }}
        className="tracking-[10px] font-semibold text-[24px] text-center"
      >
        PRESENTS
      </motion.p>
    </motion.div>
  );
};

export default Loader;
