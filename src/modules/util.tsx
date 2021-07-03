export const summaryDonations = (danations: Array<number>) =>
  danations.reduce((accumulator, value) => accumulator + value, 0);
