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
    return res;
  }
  async getPaymentListList(): Promise<Array<Payment>> {
    const res = await fetch("http://localhost:3001/payments", { method: "GET" })
      .then((res) => (res.ok ? res.json() : []))
      .catch((e) => {
        console.log("Error : ", e);
        return [];
      });
    return res;
  }
  async performPayment(request: Payment): Promise<Payment> {
    const res = await fetch("http://localhost:3001/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => (res.ok ? res.json() : (null)))
      .catch((e) => {
        console.log("Error : ", e);
        return null;
      });
    return res;
  }
  async updateCharityAmount(request: Charity): Promise<Charity> {
    const res = await fetch(`http://localhost:3001/charities/${request.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => (res.ok ? res.json() : (null)))
      .catch((e) => {
        console.log("Error : ", e);
        return null;
      });
    return res;
  }
}
