import { Action, Store, StoreState } from "modules/types";
import { combineReducers } from "redux";
import { createStore } from "redux";

const initState = {
  donate: 0,
  message: "No Payment yet in this session",
  charityList: [],
};

const appStore = (
  state: StoreState = initState,
  action: Action
): StoreState => {
  switch (action.type) {
    case "UPDATE_TOTAL_DONATE":
      return { ...state, donate: action.amount };
    case "UPDATE_MESSAGE":
      return { ...state, message: action.message };
    case "UPDATE_CHARITY_LIST":
      return { ...state, charityList: action.charityList };
    default:
      return state;
  }
};

export const store = createStore(
  combineReducers({ appStore: appStore } as Store)
);
