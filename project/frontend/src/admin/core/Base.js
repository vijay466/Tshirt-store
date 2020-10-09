import React from "react";
import Menu from "./menu"
import { Link } from 'react-router-dom';


const Base = ({
    title = "My Title",
    description =  "My description",
    className= "bg-dark text-white p-4 ",
    children
})=> {
    return (
        <div>
            <Menu/>
           <div className="container-fluid">
               <div className=" bg-dark text-white text-center pt-3 ">
                   <h2 className="display-4 font-italic p-4">{title}</h2>
                   <p className="lead font-italic">{description}</p>
               </div>
              <div className = {className}>{children}</div>
            </div>  
            <div className=" bg-dark mt-auto py-3 ">
                <div className= "container-fluid bg-success text-white text-center">
                    <h4 className = "font-weight-bold">if you got any questions, feel free to reach out!</h4>
                    <Link to = "/contact" className= "btn btn-warning">Contact us</Link>
                </div>
            </div> 
        </div>
        
    )
}
export default Base;