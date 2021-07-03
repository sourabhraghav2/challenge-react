import { Charity } from "modules/models";
import styled from "styled-components";
const CardTemplate = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
`;

interface Props {
  payAmountHandler;
  charities: Array<Charity>;
  selectPaymentHandler;
}
export const Card = (prop: Props) => {
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
  const cardTemplateList = prop.charities.map((item: any, i) => (
    <CardTemplate key={i}>
      <p>{item.name}</p>
      {payments}
      <button onClick={prop.payAmountHandler.bind(item.id, item.currency)}>
        Pay
      </button>
    </CardTemplate>
  ));
  return <div>{cardTemplateList}</div>;
};
