import { Charity } from "./models";

export type Action = {
  type: string;
  amount: number;
  message: string;
  charityList: Array<Charity>;
};
export type Store = {
  appStore: (state: any, action: Action) => {};
};
export type StoreState = {
  donate: number;
  message: string | React.ReactElement;
  charityList: Array<Charity>;
};
