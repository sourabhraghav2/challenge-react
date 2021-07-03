
import styled from 'styled-components';
import {useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {chnageMessage,updateTotalDonation} from './modules/actions'
import { Store, StoreState } from 'modules/types';
import { Charities } from 'modules/models';

const Card = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
`;

interface State{
  charities:Array<Charities>,
  selectedAmount:number
}

type Props={
  donate:Array<number>,
  message:string
  chnageMessage:(msg:string)=>{},
  updateTotalDonation:(amt:number)=>{}
}

const  App=(prop:Props)=> {
    
    const [state,setState] = useState({
      charities: [],
      selectedAmount: 10,
    }as State );
    
    useEffect(()=>{
      console.log ("Prop :",JSON.stringify(prop))
      setState({...state,charities:[{
        id: 1,
        name: "Baan Kru Noi",
        image: "baan-kru-noi.jpg",
        currency: "THB"
      },{
        id: 1,
        name: "Baan Kru Noi",
        image: "baan-kru-noi.jpg",
        currency: "THB"
      }]})
      var payments= [
        {
          "charitiesId": 2,
          "amount": 10,
          "currency": "THB",
          "id": 1
        }]
        prop.updateTotalDonation(summaryDonations(payments.map((item) => item.amount)))
    },[])
    const summaryDonations = (danations:Array<number>) =>danations.reduce((accumulator, value) => accumulator + value);
    const changeMessageHandler=()=>{
      console.log ("changeMessageHandler")
      prop.chnageMessage("changed message")
      var payments= [
        {
          "charitiesId": 2,
          "amount": 40,
          "currency": "THB",
          "id": 1
        }]
      prop.updateTotalDonation(summaryDonations(payments.map((item) => item.amount)))
    }
    
    const handlePay=(id:number, amount:number, currency:string)=> {}
    
      const self = this;
      const cards = state.charities.map( (item:any, i)=> {
        const payments = [10, 20, 50, 100, 500].map((amount, j) => (
          <label key={j}>
            <input
              type="radio"
              name="payment"
              onClick={ () =>{
                setState({ ...state,selectedAmount: amount });
              }}
            />
            {amount}
          </label>
        ));

        return (
          <Card key={i}>
            <p>{item.name}</p>
            {payments}
            <button
              onClick={()=>handlePay.call(
                self,
                item.id,
                state.selectedAmount,
                item.currency
              )}
            >
              Pay
            </button>
          </Card>
        );
      });

      const style = {
        color: 'red',
        margin: '1em 0',
        fontWeight: 20,
        fontSize: '16px',
      };

      return (
        <div>
          <button onClick={()=>changeMessageHandler()}>Change Me</button>
          <h1>Tamboon React</h1>
          <p>All donations: {prop.donate}</p>
          Here should be the message[
          <p style={style}>{prop.message}</p>]
          {cards}
        </div>
      )
  }

function mapStateToProps(state:Store) {
 var result= state.appStore
  console.log ("result : ",JSON.stringify(result))
  console.log ("state : ",JSON.stringify(state))
  return result;
}

export default connect((mapStateToProps),{
  chnageMessage,
  updateTotalDonation
})(App);