import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from "./core/Home"
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashboard from './user/UserDashBoard';
import AdminDashBoard from './user/AdminDashBoard';
import CreateCategory from "./admin/AddCategory";
import CreateProduct from "./admin/AddProduct";
import ManageCategory from "./admin/ManageCategory";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from "./core/Cart";
import ContactPage from './core/contactPage';






const Routes = ()=> {
    return (
        <Router>
            <Switch>
                <Route path = "/" exact component= {Home}   />
                <Route path = "/signup" exact component= {Signup}   />
                <Route path = "/signin" exact component= {Signin}   />
                <Route path = "/Cart" exact component= {Cart}   />
                <PrivateRoute path = "/user/dashboard" exact component= {UserDashboard}   />
                <AdminRoute path = "/admin/dashboard" exact component= {AdminDashBoard}  />
                <AdminRoute path = "/admin/create/category" exact component= {CreateCategory }  />
                <AdminRoute path = "/admin/create/product" exact component= {CreateProduct }  />
                <AdminRoute path = "/admin/categories" exact component= {ManageCategory }  />
                <AdminRoute path = "/admin/products" exact component= {ManageProducts}/>
                <AdminRoute path = "/admin/product/update/:productId" exact component= {UpdateProduct}/>
                <AdminRoute path = "/admin/category/update/:categoryId" exact component= {UpdateCategory}/>
                <Route path = "/contact" exact component = {ContactPage}/>
            </Switch>
        </Router>
    );      
    
};
export default Routes;

