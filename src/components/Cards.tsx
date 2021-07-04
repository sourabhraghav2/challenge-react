import { Charity } from "modules/models";
import "antd/dist/antd.css";
import "./style/cards.scss";

import { Card } from "antd";
import { useEffect, useState } from "react";
const { Meta } = Card;

interface Props {
  payAmountHandler;
  charityList: Array<Charity>;
  selectPaymentHandler;
}


const getImageUrl = (id:number) => {
  const availableImages = ["a", "b", "c", "d", "e"];
  return `./assets/images/{imageName}.jpg`.replace("{imageName}",
    availableImages[id % (availableImages.length - 1)]
  );
};
export const Cards = (prop: Props={charityList:[],selectPaymentHandler:()=>{},payAmountHandler:()=>{}}) => {
  
  const  [state,setState] =useState(prop);
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
  useEffect(()=>{
    setState(prop)
  },[prop])
  const closeCharity=(id:number)=>{
      setState({...state,charityList:state.charityList.filter(e=>e.id!==id)})
  }
  const cardTemplateList = state.charityList.map((item: any, i: number) => {
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
         
        <div className="card-body">
          <div className="image-contaier">
            <img src={getImageUrl(item.id)}></img>
          </div>
          <div className="button-container">
            <div className="close-button" onClick={()=>{closeCharity(item.id)}}>X</div> 
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
  return <div className="card-container">
      {cardTemplateList}
    </div>;
};
