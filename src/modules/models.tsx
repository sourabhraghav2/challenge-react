export interface Charity {
  id: number;
  name: string;
  image: string;
  currency: string;
  donatedAmount: number;
}

export interface Payment {
  charitiesId: number;
  amount: number;
  currency: string;
  id: number;
}
