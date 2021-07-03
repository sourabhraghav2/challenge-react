import { Charity } from "modules/models";
import "antd/dist/antd.css";
import "./style/cards.scss";

import { Card } from "antd";
const { Meta } = Card;

interface Props {
  payAmountHandler;
  charityList: Array<Charity>;
  selectPaymentHandler;
}

var currentImage = 0;
const getImageUrl = () => {
  const availableImages = ["a", "b", "c", "d", "e"];
  currentImage += 1;
  return `./assets/images/{imageName}.jpg`.replace(
    "{imageName}",
    availableImages[currentImage % (availableImages.length - 1)]
  );
};
export const Cards = (prop: Props) => {
  const payments = [10, 20, 50, 100, 500].map((amount, j) => (
    <label key={j}>
      <input
        type="radio"
        name="payment"
        onClick={prop.selectPaymentHandler.bind(amount)}
      />
      {amount}
    </label>
  ));
  
  const cardTemplateList = prop.charityList.map((item: any, i: number) => {
    const payments = [10, 20, 50, 100, 500].map((amount, j) => (
      <label key={j}>
        <input
          type="radio"
          name="payment"
          onClick={prop.selectPaymentHandler.bind(amount)}
        />
        {amount}
      </label>
    ));

    return (
      <div key={i} className="card-box">
        {/* <div className="close-button">X</div> */}
        <div className="card-body">
          <div className="image-contaier">
            <img src={getImageUrl()}></img>
          </div>
          <div className="button-container">
            <div className="heading-text">Select the amount to donate (USD)</div>
            <div className="select-buttons">{payments}</div>
            <button>Pay</button>
          </div>
        </div>
        <div className="card-footer">
          <div className="card-button">
            <button>Donate</button>
          </div>
        </div>
      </div>
    );
  });
  return <div className="card-container">{cardTemplateList}</div>;
};
