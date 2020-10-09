import React,{useEffect, useState} from 'react';
import Base from './Base';
import Card from "./Card";
import { loadItems  } from './helper/Carthelper';
import Payment from './payment';
import StripeCheckout from './StripeCheckout';




const  Cart =() => {
    
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadItems())
    },[reload])

    const loadAllProducts = () => {
        return (
            <div>
                <h1 className= "text-white font-italic">Your Cart items</h1>
                {products.map((product,index) => (
                    <Card
                        key = {index}
                        product = {product}
                        addtoCart = {false}
                        removeFromCart = {true}
                        setReload = {setReload}
                        reload = {reload}
                     />
                ))}
            </div>
        )
    }

    const loadCheckouts = () => {
        return (
            <div>
                <h1 className= "text-white font-italic ">checkout your Cart items</h1>
            </div>
        )
    }
  
  return (
    <Base className = "font-weight-bold" title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-4">{products.length > 0 ?loadAllProducts() : (<h3 className= "text-white">NO products in csrt</h3>)}</div>
        <div className="col-4"><StripeCheckout products = {products} setReload = {setReload}/></div>
        <div className="col-4 text-white"><Payment products = {products} setReload = {setReload} /></div>
        
        
    
      </div>
    </Base>
  );
}
export default Cart;
