import { Charity, Payment } from "modules/models";

export class Service {
  async getCharityList(): Promise<Array<Charity>> {
    const res = await fetch("http://localhost:3001/charities", {
      method: "GET",
    })
      .then((res) => (res.ok ? res.json() : []))
      .catch((e) => {
        console.log("Error : ", e);
        return [];
      });
    console.log("Response : ", res);
    return res;
  }
  async getPaymentListList(): Promise<Array<Payment>> {
    const res = await fetch("http://localhost:3001/payments", { method: "GET" })
      .then((res) => (res.ok ? res.json() : []))
      .catch((e) => {
        console.log("Error : ", e);
        return [];
      });
    console.log("Response : ", res);
    return res;
  }
}
