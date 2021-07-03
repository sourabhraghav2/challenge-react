export type Action = {
  type: string;
  amount: number;
  message: string;
};
export type Store = {
  appStore: (state: any, action: Action) => {};
};
export type StoreState = {
  donate: number;
  message: string;
};
