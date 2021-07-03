import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  chnageMessage,
  updateTotalDonation,
  loadCharity,
} from "./modules/actions";
import { Store } from "modules/types";
import { Charity } from "modules/models";
import { summaryDonations } from "modules/util";
import { Cards } from "components/Cards";
import { Service } from "service/Service";
import "components/style/home.scss";

interface State {
  selectedAmount: number;
}

type Props = {
  donate: Array<number>;
  message: string;
  chnageMessage: (msg: string) => {};
  updateTotalDonation: (amt: number) => {};
  loadCharity: (charityList: Array<Charity>) => {};
  charityList: Array<Charity>;
};
const service = new Service();
const Home = (prop: Props) => {
  const [state, setState] = useState({ selectedAmount: 10 } as State);

  const loadcharityList = async () => {
    prop.loadCharity(await service.getCharityList());
  };
  const loadPayments = async () => {
    var paymentList = await service.getPaymentListList();
    prop.updateTotalDonation(
      summaryDonations(paymentList.map((item) => item.amount))
    );
  };

  useEffect(() => {
    loadcharityList();
    loadPayments();
  }, []);

  const payAmountHandler = (id, currency) => {
    console.log("payAmountHandler");
  };
  const selectPaymentHandler = (amount) => {
    console.log("selectPaymentHandler");
  };
  return (
    <div className="home">
      <h1>Tamboon React</h1>
      <p>All donations: {prop.donate}</p>
      <p className="message">{prop.message}</p>
      <Cards
        payAmountHandler={payAmountHandler}
        selectPaymentHandler={selectPaymentHandler}
        charityList={prop.charityList}
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
  loadCharity,
})(Home);
