import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import { EmptyCart, loadItems } from './helper/Carthelper';
import { getMeToken, processpayment } from './helper/paymentBhelper';
import { createOrder } from './helper/OrderHelper';

import DropIn from "braintree-web-drop-in-react"
const  Payment = ({products, setReload = f => f, reload =  undefined}) =>  {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    });

    const userId =  isAutheticated() && isAutheticated().user._id
    const token =  isAutheticated() && isAutheticated().token

    const getToken = (userId, token) => {
        getMeToken(userId, token).then(info => {
            //console.log("INFORMATION" , info)
            if(info?.error) {
                setInfo({...info, error: info?.error});
            } else {
                const clientToken = info.clientToken;
                setInfo({clientToken})
            }
        });
    };
     const showBtdropIn = () => {
         return isAutheticated() ?(
          <div>
          {info.clientToken !== null && products.length > 0 ?(
             <div>
              <DropIn
                options={{ authorization: info.clientToken }}
                onInstance={(instance) => (info.instance = instance)}
              />
              <button className= "btn btn-success btn-block" onClick={onPurchase}>Pay with paypal</button>
            </div>
          ) :(<h3>Please login or add something to cart</h3>)}
      </div>
         ) :(
          <Link to = "/signin">
          <button className="btn btn-outline-info">signin</button>
      </Link>
         )
             
         
     }
    useEffect(() => {
        getToken(userId, token)
    }, [])

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then(data => {
          nonce = data.nonce;
          const paymentData = {
            paymentMethodNonce: nonce,
            amount: getAmount()
          };
          processpayment(userId, token, paymentData)
            .then(response => {
              setInfo({ ...info, success: response.success, loading: false });
              console.log("PAYMENT SUCCESS");

              const orderData = {
                products: products,
                transaction_id: response.transaction.id,
                amount: response.transaction.amount
              };
              createOrder(userId, token, orderData)
              //TODO: empty the cart

              EmptyCart(() => {
                console.log("did i got a crash")
              })
              //TODO: force reload
              setReload(!reload)
            })
            .catch(error => {
              setInfo({ loading: false, success: false });
              console.log("PAYMENT FAILED");
            });
        });
      };

      const getAmount = () => {
        let amount = 0;
        products.map(p => {
          amount = amount + p.price;
        });
        return amount;
      };
    
    
    
    return (
        <div>
            <h3> Total Cart amount ${getAmount()}.00</h3>
            {showBtdropIn()}
            
        </div>
    )
}
export default Payment;