import React, {useEffect,useState} from 'react'
import { isAutheticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { loadItems } from './helper/Carthelper';
import Signin from './../user/Signin';
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from './../backend';


const  StripeCheckout = ({products, setReload = f => f, reload = undefined}) =>  {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
     })
     const token = isAutheticated() &&  isAutheticated().token
     const userId = isAutheticated() &&  isAutheticated().user._id


    const Totalprice = () => {
        let amount = 0
        products.map(p => {
            amount = p.price + amount
        })
        return amount;


    }

    const MakePayment = token => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "application/json"
        };
        return fetch(`${API}stripepayments`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response)
            // call further methods
        }).catch(error => 
            console.log(error)
        )
        
    }
    const ShowStripeButton = () => {
        return isAutheticated() ? (
            <StripeCheckoutButton
            stripeKey = "pk_test_51HVCBhDoJm8tKw8DaLTLUvxeA4dwfjNQkJGeLq6z53CL686VMrCh9GbKryhg4vorCgyRGg4Xvux0Z2HsjjIYP5WA00MSXVvAsT"
            token = {MakePayment}
            amount = {Totalprice() * 100}
            name = "Buy Tshirts"
            shippingAddress
            billingAddress
            >            
                <button className="btn btn-success">Pay with stripe</button>
            </StripeCheckoutButton>
        ) : (
            
                <Link to = "/signin">
                    <button className="btn btn-outline-info">signin</button>
                </Link>
            
        );
    };

    return (
        <div>
            <h3 className = "text-white">Total Cart Amount ${Totalprice()}.00 </h3>
            {ShowStripeButton()}
        </div>
    )
}
export default  StripeCheckout;
