import { Action, Store, StoreState } from "modules/types";
import { combineReducers } from "redux";
import { createStore } from "redux";

const initState = {
  donate: 0,
  message: "Default message",
};

const appStore = (
  state: StoreState = initState,
  action: Action
): StoreState => {
  console.log("action: ", JSON.stringify(action));
  switch (action.type) {
    case "UPDATE_TOTAL_DONATE":
      return { ...state, donate: state.donate + action.amount };
    case "UPDATE_MESSAGE":
      return { ...state, message: action.message };
    default:
      console.log("default ", JSON.stringify(state));
      return state;
  }
};

export const store = createStore(
  combineReducers({ appStore: appStore } as Store)
);
