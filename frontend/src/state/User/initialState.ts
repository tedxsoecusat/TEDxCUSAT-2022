import { User } from "../../types";

interface initialStateType {
  isAuthenticating: boolean;
  isLoggedIn: boolean;
  isNewUser: boolean;
  updatingPhno: boolean;
  updatingVeg: boolean;
  user: User | null;
}

const initialState: initialStateType = {
  isAuthenticating: false,
  updatingVeg: false,
  isLoggedIn: false,
  isNewUser: false,
  updatingPhno: false,
  user: null,
};

export default initialState;
