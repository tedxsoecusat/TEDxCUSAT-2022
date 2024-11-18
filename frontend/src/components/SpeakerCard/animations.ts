export const SpeakerCardTextAnimation = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 100 },
      default: { duration: 0.3 },
    },
  },
  visible: {
    height: "fit-content",
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 200 },
      default: { duration: 0.6 },
    },
  },
};

export const SpeakerCardAnimation = {
  hidden: {
    filter: "brightness(100%)",
    transition: {
      x: { type: "spring", stiffness: 200 },
      default: { duration: 0.3 },
    },
  },
  visible: {
    filter: "brightness(50%)",
    transition: {
      x: { type: "spring", stiffness: 200 },
      default: { duration: 0.6 },
    },
  },
};
