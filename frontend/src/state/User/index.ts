import { createStore, createHook, defaults } from "react-sweet-state";

import actions from "./actions";
import initialState from "./initialState";

defaults.devtools = true;

const Store = createStore({
  name: "tedxcusat2022_user_" + window.location.origin,
  initialState,
  actions,
});

export const useUserStore = createHook(Store, {
  selector: (state) => state,
});
