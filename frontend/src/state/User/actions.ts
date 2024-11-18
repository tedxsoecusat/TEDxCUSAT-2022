import routes from "src/common/routes";
import { errorLogger, logger } from "src/common/utils";
import { uploadFile } from "src/services/firebase/files";
import {
  createUser,
  getUser,
  signInWithGoogle,
  signout,
  updateUser,
  verifyAuthState,
} from "src/services/firebase/user";
import { NavigateType, User } from "src/types";
import ActionTypes from "../types";
import initialState from "./initialState";

import { analytics } from "src/services/firebase";
import { logEvent } from "firebase/analytics";

const actions = {
  setIsLoggedIn:
    (isLoggedIn: boolean) =>
    ({ setState }: ActionTypes) => {
      setState({ isLoggedIn });
    },

  setIsAuthenticating:
    (isAuthenticating: boolean) =>
    ({ setState }: ActionTypes) => {
      setState({ isAuthenticating });
    },

  setUser:
    (user: User | null) =>
    ({ setState }: ActionTypes) => {
      setState({ user });
    },

  setIsNewUser:
    (isNewUser: boolean) =>
    ({ setState }: ActionTypes) => {
      setState({ isNewUser });
    },

  setUpdatingPhno:
    (updatingPhno: boolean) =>
    ({ setState }: ActionTypes) => {
      setState({ updatingPhno });
    },

  login:
    (user: User) =>
    ({ dispatch }: ActionTypes) => {
      dispatch(actions.setUser(user));
      localStorage.setItem("userData", JSON.stringify(user));
      dispatch(actions.setIsAuthenticating(false));
      dispatch(actions.setIsLoggedIn(true));
    },

  handleFetchUserData:
    (user: User, navigate: NavigateType) =>
    async ({ dispatch }: ActionTypes) => {
      logEvent(analytics, "handleFetchUserData() called");
      dispatch(actions.setIsAuthenticating(true));
      dispatch(actions.setIsLoggedIn(false));
      try {
        const _localUser = JSON.parse(
          localStorage.getItem("userData") ?? "null"
        );
        if (_localUser) {
          dispatch(actions.setIsNewUser(false));
          dispatch(actions.login(_localUser));
          navigate(routes.TICKETS);
        } else {
          const _userRawData = await getUser(user?.uid);
          if (_userRawData.exists) {
            const _userData = _userRawData.data();
            const userData = {
              uid: user?.uid,
              name: _userData?.name,
              phno: _userData?.phno,
              email: _userData?.email as string,
              image: _userData?.photoURL ?? "",
              isCusatian: _userData?.isCusatian,
              isVegetarian: _userData?.isVegetarian ?? null,
            };
            if (!userData.phno) {
              dispatch(actions.setUser(userData));
              dispatch(actions.setIsNewUser(true));
              navigate(routes.REGISTRATION);
            } else {
              dispatch(actions.setIsNewUser(false));
              dispatch(actions.login(userData));
              navigate(routes.TICKETS);
            }
          } else {
            await createUser(user);
            dispatch(actions.setUser(user));
            dispatch(actions.setIsNewUser(true));
            navigate(routes.REGISTRATION);
          }
        }
      } catch (error) {
        errorLogger(error, "handleFetchUserData()");
      } finally {
        dispatch(actions.setIsAuthenticating(false));
      }
    },

  authenticate:
    (navigate: NavigateType) =>
    async ({ dispatch }: ActionTypes) => {
      logEvent(analytics, "authenticate() called");
      dispatch(actions.setIsAuthenticating(true));
      verifyAuthState(
        async (user) => {
          await dispatch(actions.handleFetchUserData(user, navigate));
        },
        () => {
          dispatch(actions.setIsAuthenticating(false));
          navigate(routes.LOGIN);
        }
      );
    },

  handleMoreInfo:
    (
      phno: string,
      isCusatian: boolean,
      isVegetarian: boolean,
      idFile: { fileObj: File; url: string },
      navigate: NavigateType
    ) =>
    async ({ getState, dispatch }: ActionTypes) => {
      logEvent(analytics, "handleMoreInfo() called");
      dispatch(actions.setUpdatingPhno(true));
      try {
        const { user } = getState();
        let updatedUser = { phno, isCusatian, isVegetarian, idUrl: "" };
        if (isCusatian) {
          const idUrl = await uploadFile("cusatids", user.uid, idFile?.fileObj);
          updatedUser = { ...updatedUser, idUrl };
        }
        await updateUser(user.uid, updatedUser);
        dispatch(actions.login({ ...user, ...updatedUser }));
        navigate(routes.TICKETS);
      } catch (error) {
        errorLogger(error, "handlePhnoUpdate()");
      } finally {
        dispatch(actions.setUpdatingPhno(false));
      }
    },

  handleGoogleSignin:
    (navigate: NavigateType) =>
    async ({ dispatch }: ActionTypes) => {
      logEvent(analytics, "handleGoogleSignin() called");
      dispatch(actions.setIsAuthenticating(true));
      dispatch(actions.setIsLoggedIn(false));
      try {
        const res = await signInWithGoogle();
        if (res.user) {
          await dispatch(actions.authenticate(navigate));
        } else {
          console.log("User details not recieved");
          logger("User details not recieved.", "handleGoogleSignin()");
        }
      } catch (error) {
        errorLogger(error, "handleGoogleSignin()");
      } finally {
        dispatch(actions.setIsAuthenticating(false));
      }
    },

  handleUpdateVeg:
    (isVegetarian: boolean) =>
    async ({ getState, setState, dispatch }: ActionTypes) => {
      try {
        setState({ updatingVeg: true });
        const { user } = getState();
        await updateUser(user.uid, { isVegetarian });
        dispatch(actions.setUser({ ...user, isVegetarian }));
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...user, isVegetarian })
        );
      } catch (error) {
        errorLogger(error, "handleUpdateVeg()");
      } finally {
        setState({ updatingVeg: false });
      }
    },

  handleSignOut:
    () =>
    async ({ dispatch }: ActionTypes) => {
      dispatch(actions.setIsAuthenticating(true));
      try {
        localStorage.removeItem("userData");
        console.log("removed user", {
          loacl: localStorage.getItem("userData"),
        });
        await signout();
        dispatch(actions.setIsLoggedIn(false));
      } catch (error) {
        errorLogger(error, "handleGoogleSignin()");
      } finally {
        dispatch(actions.setIsAuthenticating(false));
      }
    },

  resetUserStore:
    () =>
    ({ setState }: ActionTypes) => {
      setState(initialState);
    },
};

export default actions;
