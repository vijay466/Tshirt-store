import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { getAllCategory,AddProduct } from "./helper/adminapicall";
import { isAutheticated } from './../auth/helper/index';





const CreateProduct = () => {

    const [values,setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: "false",
        error: "",
        createdProduct: "",
        getaRedirect: "false",
        formData: ""

    });
    
    const {name,description,price,stock,categories,category,loading,error,createdProduct,getaRedirect,formData} = values;
    const {user,token} = isAutheticated()

    const preLoad  = () =>{
        getAllCategory().then(data => {
            console.log(data)
            if(data?.error){
                setValues({...values, error: data?.error,getaRedirect: false})
            }else {
                setValues({...values, categories: data, formData: new FormData()});
                //console.log(categories)
            }
        });
    };
    useEffect(() => {
        preLoad();
    },[]);

    const SuccessMessage = () => (
      <div className="alert alert-success mt-2"
        style = {{display : createdProduct ? "" : "none"}}
        >
          <h4>{createdProduct} created successfully</h4>
      </div>
      
    )

    const ErrorMessage = () => (
      <div className="alert alert-danger mt-2"
        style = {{display : error ? "" : "none"}}
        >
          <h4> Failed to create the Product</h4>
          <p>NOTE : {error}</p>
      </div>
      
    )

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values,error:"", loading: true})
        AddProduct(user._id, token, formData).then(data => {
            if(data?.error){
                setValues({...values,error: data?.error,})
            }else{
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    price: "",
                    photo: "",
                    error: "",
                    stock: "",
                    loading: false,
                    createdProduct: data.name

                }); 
            };
        });

    };


    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value})
    };


    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group ">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option >Select</option>
              {categories &&
              categories.map((cate,index) => (
                <option key= {index} value={cate._id}>{cate.name}</option>
              ))

              }
             
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3 ">
            Create Product
          </button>
        </form>
      );



    return (
        <Base className = "container bg-info p-4" title = "Add a product" description = "Hey admin you can add products here!!">
        
            <Link to = "/admin/dashboard" className ="btn btn-md btn-dark mb-3">
                Admin Home
            </Link>
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {SuccessMessage()}
                    {ErrorMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    ); 
};
export default CreateProduct;