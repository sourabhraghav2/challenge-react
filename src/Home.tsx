import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  chnageMessage,
  updateTotalDonation,
  loadCharity,
} from "./modules/actions";
import { Store } from "modules/types";
import { Charity, Payment } from "modules/models";
import { summaryDonations } from "modules/util";
import { Cards } from "components/Cards";
import { Service } from "service/Service";
import { useToasts } from "react-toast-notifications";
import "components/style/home.scss";
import React from "react";

type Props = {
  donate: Array<number>;
  message: string;
  chnageMessage: (msg: string | React.ReactElement) => {};
  updateTotalDonation: (amt: number) => {};
  loadCharity: (charityList: Array<Charity>) => {};
  charityList: Array<Charity>;
};
const service = new Service();
const Home = (prop: Props) => {
  const { addToast } = useToasts();
  const [selectedPaymentList, setSelectedPaymentList] = useState<
    Array<Payment>
  >([]);
  const loadcharityList = async () => {
    prop.loadCharity(await service.getCharityList());
  };
  const loadPayments = async () => {
    var paymentList = await service.getPaymentListList();
    const amount = summaryDonations(paymentList);
    prop.updateTotalDonation(amount);
  };

  useEffect(() => {
    loadcharityList();
    loadPayments();
  }, []);

  const payAmountHandler = async (item: Charity) => {
    const index = selectedPaymentList.findIndex(
      (e) => e.charitiesId === item.id
    );
    if (index < 0) {
      addToast(`Please select payment amount to charity : ${item.name} `, {
        appearance: "error",
      });
    } else {
      const request = {
        ...selectedPaymentList[index],
        currency: item.currency,
      };
      const paymentResponse = await service.performPayment(request);
      if (paymentResponse) {
        const response = await service.updateCharityAmount({
          ...item,
          donatedAmount: (item.donatedAmount?item.donatedAmount:0) + paymentResponse.amount,
        });
        if (response) {
          addToast(
            `Payment of ${paymentResponse.amount} ${paymentResponse.currency} to trust ${item.name} succesful!`,
            { appearance: "success" }
          );
          loadPayments();
          loadcharityList();
          prop.chnageMessage(
            createReactElementFromString(paymentResponse, item)
          );
        } else {
          addToast(`Update to charity failed : ${item.name} `, {
            appearance: "error",
          });
        }
      } else {
        addToast(`Payment failed : ${item.name} `, { appearance: "error" });
      }
    }
  };
  const createReactElementFromString = (
    payment: Payment,
    charity: Charity
  ): React.ReactElement => {
    return React.createElement(
      "div",
      null,
      `Payment of `,
      React.createElement("h4", null, `${payment.amount} ${payment.currency}`),
      ` to trust `,
      React.createElement("h4", null, charity.name)
    );
  };
  const selectPaymentHandler = (item: Charity, amount: number) => {
    const newPayment = { charitiesId: item.id, amount } as Payment;
    setSelectedPaymentList([
      ...selectedPaymentList.filter((e) => e.charitiesId !== item.id),
      newPayment,
    ]);
    addToast(`Amount ${amount} selected for Charity : ${item.name} `, {
      appearance: "success",
    });
  };
  return (
    <div className="home">
      <h1>Omise Tamboon React</h1>
      <div className="detail-container">
        <h4>Total donations:</h4> {prop.donate} USD
        <br />
        <h4>Recent Payment : </h4>
        {prop.message}
      </div>
      <Cards
        payAmountHandler={payAmountHandler}
        selectPaymentHandler={selectPaymentHandler}
        charityList={prop.charityList}
      />
    </div>
  );
};

function mapStateToProps(state: Store) {
  return state.appStore;
}

export default connect(mapStateToProps, {
  chnageMessage,
  updateTotalDonation,
  loadCharity,
})(Home);
