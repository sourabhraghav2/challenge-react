import { Charity } from "modules/models";
import "antd/dist/antd.css";
import "./style/cards.scss";
import { useEffect, useState } from "react";
import { AVAILABLE_PAYMENT_OPTIONS } from "common/constants";

type Props = {
  payAmountHandler: (item: Charity) => void;
  charityList: Array<Charity>;
  selectPaymentHandler: (item: Charity, amount: number) => void;
};

const getImageUrl = (imageName:string) => {
  return `./assets/images/{imageName}`.replace("{imageName}",imageName);
};

export const Cards = (
  prop: Props = {
    charityList: [],
    selectPaymentHandler: (item, amt) => {},
    payAmountHandler: (item) => {},
  }
) => {
  const [state, setState] = useState(prop);
  useEffect(() => {
    setState(prop);
  }, [prop]);
  const closeCharity = (id: number) => {
    setState({
      ...state,
      charityList: state.charityList.filter((e) => e.id !== id),
    });
  };
  const cardTemplateList = state.charityList.map((item: any, i: number) => {
    const payments = AVAILABLE_PAYMENT_OPTIONS.map((amount, j) => (
      <label key={j}>
        <input
          type="radio"
          name={"payment" + item.name}
          onClick={() => prop.selectPaymentHandler(item, amount)}
        />
        {amount}
      </label>
    ));
    return (
      <div key={i} className="card-container">
        
        <div className="card-body">
          <div className="image-contaier">
            <img alt="" src={ `./assets/images/${item.image}`}></img>
          </div>
          <div className="button-container">
            <div
              className="close-button"
              onClick={() => {
                closeCharity(item.id);
              }}
            >
              X
            </div>
            <div className="heading-text">
              Select the amount to donate ({item.currency})
            </div>
            <div className="select-buttons">{payments}</div>
            <button onClick={() => prop.payAmountHandler(item)}>Pay</button>
          </div>
        </div>
        <div className="card-footer">
          <div className="card-name">{item.name}</div>
          <div className="card-button">
            <div className="donated-amount">
              <h5>
                Donated :{(item.donatedAmount?item.donatedAmount:0)} {item.currency}
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <div className="card-holder">{cardTemplateList}</div>;
};
