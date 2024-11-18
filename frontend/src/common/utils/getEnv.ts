export const getEnv = (): string => {
  const location = window.location.hostname;

  if (location === "localhost") {
    return "local";
  } else if (location === "tedxcusat.in") {
    return "production";
  }
  return "development";
};
