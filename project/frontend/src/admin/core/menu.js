import React, {Fragment} from "react"
import {Link,withRouter} from "react-router-dom"
import { signout } from "../auth/helper";
import { isAutheticated } from './../auth/helper/index';



const currentTab = (history,path) => {
    if(history.location.pathname === path){
        return {color : "#26ae60"}
    }else {
        return {color : "#FFFFFF"}
    }

}
    
const Menu = ({history})=>(
    <div>
        <ul className="nav nav-tabs bg-dark fixed-top">
            <li className="nav-item">
                <Link style={currentTab(history,"/")} className = "nav-link font-weight-bold" to= "/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history,"/cart")} className = "nav-link font-weight-bold" to= "/cart">
                    Cart
                </Link>
            </li>
            {isAutheticated() && isAutheticated().user.role ===0 && (
                <li className="nav-item">
                    <Link style={currentTab(history,"/user/dashboard")} className = "nav-link font-weight-bold" to= "/user/dashboard">
                        Dashboard
                    </Link>
                </li>
            )}
            {isAutheticated() && isAutheticated().user.role ===1 && (
                <li className="nav-item">
                 <Link style={currentTab(history,"/admin/dashboard")} className = "nav-link font-weight-bold" to= "/admin/dashboard">
                     Dashboard
                 </Link>
                </li>
            )} 
                
            
            {!isAutheticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link style={currentTab(history,"/signup")} className = "nav-link font-weight-bold" to= "/signup">
                            signup
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link style={currentTab(history,"/signin")} className = "nav-link font-weight-bold" to= "/signin">
                            signin
                        </Link>
                    </li>
                </Fragment>
            )}
            {isAutheticated() && (
                <li className="nav-item font-weight-bold">
                    <span className = "nav-link text-warning" 
                        onClick = {()=> {
                            signout(() => {
                                history.push("/")
                            })
                        }}
                        
                    >
                        Logout
                    </span>
                </li>
            )}
        </ul>
    </div>
)
export default withRouter(Menu);