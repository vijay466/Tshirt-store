import React,{useState,useEffect} from "react";
import Imagehelper from "./helper/Imagehelper";
import { addItemToCart, removeItems } from './helper/Carthelper';
import { Redirect } from "react-router-dom";



const Card = ({ product, addtoCart = true, removeFromCart = false, setReload = f => f , reload = undefined}) => {

  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)


  const AddToCart = () => {
    addItemToCart(product,() => setRedirect(true))
  }


  const getARedirect = (redirect) => {
      if(redirect) {
        return <Redirect to = "/Cart"/>
      }
  }

  const CardTitle = product ? product.name : "A photo from pixels";
  const CardDescription = product ? product.description : "default description";
  const CardPrice = product ? product.price : "Default";


  const showAddToCart = addtoCart => {
    return (
      addtoCart && (
        <button
          onClick={AddToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItems(product._id);
            setReload(!reload)

          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead font-weight-bold">{CardTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        < Imagehelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {CardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {CardPrice}.00</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
