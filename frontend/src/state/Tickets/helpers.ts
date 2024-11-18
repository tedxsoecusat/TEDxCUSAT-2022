import config from "src/common/config";

export const calculateAmount = (price: number) => {
  let amountInUsd = 0;
  if (
    config.ENV === "development" ||
    config.ENV === "local" ||
    config.ENV === "staging"
  )
    amountInUsd = 0.5;
  else amountInUsd = price;
  return amountInUsd * 100;
};
