import { Charity } from "./models";
import { Action } from "./types";

export const chnageMessage = (message: string) => {
  console.log("inside : chnageMessage");
  return {
    type: "UPDATE_MESSAGE",
    message: message,
  } as Action;
};

export const updateTotalDonation = (amount: number) => {
  console.log("inside : updateTotalDonation");
  return {
    type: "UPDATE_TOTAL_DONATE",
    amount: amount,
  } as Action;
};

export const loadCharity = (charityList: Array<Charity>) => {
  console.log("inside : loadCharity");
  return {
    type: "UPDATE_CHARITY_LIST",
    charityList: charityList,
  } as Action;
};
