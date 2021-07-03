
import styled from 'styled-components';
import {useState,useEffect} from 'react'



const Card = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
`;
interface Charities{
  id: number,
  name: string,
  image: string,
  currency: string
}
interface State{
  charities:Array<Charities>,
  selectedAmount:number
}
interface Action{
  type:string,
  payLoad:any
}


const  App=()=> {
    const [donate,setDonate] = useState([])
    const [message,setMessage] = useState("Default message")
    const [state,setState] = useState({
      charities: [],
      selectedAmount: 10,
    }as State );
    
    useEffect(()=>{
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
        },
        {
          "charitiesId": 1,
          "amount": 20,
          "currency": "THB",
          "id": 2
        }]
        setDonate(summaryDonations(payments.map((item) => item.amount)))
    },[])
    const summaryDonations = (danations) =>danations.reduce((accumulator, value) => accumulator + value);
    
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
          <h1>Tamboon React</h1>
          <p>All donations: {donate}</p>
          <p style={style}>{message}</p>
          {cards}
        </div>
      )
  }




export default App