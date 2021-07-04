import { CURRENCY_CONVERSION_TO_USD } from "common/constants";
import { Payment } from "./models";

export const summaryDonations = (danations: Array<Payment>) =>
  Math.floor(
    danations.reduce(
      (accumulator, item) =>
        accumulator + convertCurrency(item.currency, item.amount),
      0
    )
  );
const convertCurrency = (currency: string, amount: number) => {
  return CURRENCY_CONVERSION_TO_USD[currency] * amount;
};
