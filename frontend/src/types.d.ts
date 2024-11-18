import { NavigateFunction } from "react-router-dom";
type User = {
  name: string;
  email: string;
  uid: string;
  image: string;
  phno?: string;
  isCusatian?: boolean;
  isVegetarian?: boolean;
};

type NavigateType = typeof NavigateFunction;
