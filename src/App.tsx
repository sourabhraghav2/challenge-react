import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { chnageMessage, updateTotalDonation } from "./modules/actions";
import { Store, StoreState } from "modules/types";
import { Charity } from "modules/models";
import { summaryDonations } from "modules/util";
import { Card } from "components/Card";
import { Service } from "service/Service";
import "components/style/app.scss";

interface State {
  charities: Array<Charity>;
  selectedAmount: number;
}

type Props = {
  donate: Array<number>;
  message: string;
  chnageMessage: (msg: string) => {};
  updateTotalDonation: (amt: number) => {};
};
const service = new Service();
const App = (prop: Props) => {
  const [state, setState] = useState({
    charities: [],
    selectedAmount: 10,
  } as State);

  const loadCharities = async () => {
    var charityList = await service.getCharityList();
    setState({ ...state, charities: charityList });
  };
  const loadPayments = async () => {
    var paymentList = await service.getPaymentListList();
    prop.updateTotalDonation(
      summaryDonations(paymentList.map((item) => item.amount))
    );
  };

  useEffect(() => {
    loadCharities();
    loadPayments();
  }, []);

  const load = () => {
    loadCharities();
    loadPayments();
  };
  const changeMessageHandler = () => {
    console.log("changeMessageHandler");
    prop.chnageMessage("changed message");
    var payments = [
      {
        charitiesId: 2,
        amount: 40,
        currency: "THB",
        id: 1,
      },
    ];
    prop.updateTotalDonation(
      summaryDonations(payments.map((item) => item.amount))
    );
  };

  const handlePay = (id: number, amount: number, currency: string) => {}
  const payAmountHandler = (id, currency) => {
    console.log("payAmountHandler")
  }
  const selectPaymentHandler = (amount) => {}
  return (
    <div className="app">
      <button onClick={() => changeMessageHandler()}>Change Me</button>
      <button onClick={() => load()}>Load</button>
      <h1>Tamboon React</h1>
      <p>All donations: {prop.donate}</p>
      <p className="message">{prop.message}</p>
      <Card
        payAmountHandler={payAmountHandler}
        selectPaymentHandler={selectPaymentHandler}
        charities={state.charities}
      />
    </div>
  );
};

function mapStateToProps(state: Store) {
  var result = state.appStore;
  console.log("result : ", JSON.stringify(result));
  console.log("state : ", JSON.stringify(state));
  return result;
}

export default connect(mapStateToProps, {
  chnageMessage,
  updateTotalDonation,
})(App);
