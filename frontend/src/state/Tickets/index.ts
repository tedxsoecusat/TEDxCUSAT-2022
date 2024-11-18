import { createStore, createHook } from "react-sweet-state";

import actions from "./actions";
import initialState from "./initialState";

const Store = createStore({
  name: "tedxcusat2022_tickets_" + window.location.origin,
  initialState,
  actions,
});

export const useTicketStore = createHook(Store, {
  selector: (state) => state,
});
