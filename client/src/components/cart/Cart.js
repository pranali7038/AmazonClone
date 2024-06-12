import React, { useContext, useEffect, useState } from 'react';
import "./cart.css";
import { Divider } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {LoginContext} from "../context/ContextProvider";

const Cart = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const {account,setAccount} = useContext(LoginContext)

  

 const [inddata, setInddata] = useState({}); 
  console.log('Current product data:', inddata);

  const getInddata = async () => {
    try {
      const res = await fetch(`/getproductsone/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (res.status !== 201) {
        console.log("No data available");
      } else {
        console.log("Data fetched successfully");
        setInddata(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getInddata();
    }
  }, [id]);

  if (!inddata || Object.keys(inddata).length === 0) {
    return <div>Loading...</div>;
  }

  //  //add cart function
  //  const addtocart = async(id)=>{
  //   const checkres =await fetch(`/addcart/${id}`,{
  //     method:"POST",
  //     headers:{
  //       Accept:"application/json",
  //       "Content-Type" : "application/json"
  //     },
  //     body:JSON.stringify({
  //       inddata
  //     }),
  //     credentials:"include",
      
  //   });

  //   const data1 = await checkres.json();
  //   console.log(data1);

  //   if(checkres.status === 401 || data1){
  //     alert("user invalid");
  //   }else{
  //     alert("data added in your cart")
  //   }
  // }


  const addtocart = async (id) => {
    try {
      const checkres = await fetch(`/addcart/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          // Send only the product ID
          id: id
        })
      });
  
      const data1 = await checkres.json();
      console.log(data1);
  
      if (checkres.status === 400 || !data1) {
        //throw new Error("Failed to add item to cart");
        console.log("user invalid");
      } else {
        alert("Data added to your cart");
        navigate("/buynow")
        setAccount(data1)
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      alert("Failed to add item to cart. Please try again later.");
    }
  };
  

  return (
    <div className='cart_section'>
      <div className='cart_container'>
        <div className='left_cart'>
          <img src={inddata.url} alt='cart_image' />
          <div className='cart_btn'>
            <button className='cart_btn1' onClick={()=>addtocart(inddata.id)}>Add to Cart</button>
            <button className='cart_btn2'>Buy Now</button>
          </div>
        </div>
        <div className='right_cart'>
          <h3>{inddata.title.shortTitle}</h3>
          <h4>{inddata.title.longTitle}</h4>
          <Divider />
          <p className='mrp'>M.R.P : ₹{inddata.price.mrp}</p>
          <p>Deal of The Day: <span style={{ color: "#B12704" }}>₹{inddata.price.cost}</span></p>
          <p>You Save: <span style={{ color: "#B12704" }}>₹{inddata.price.mrp - inddata.price.cost} ({inddata.price.discount})</span></p>
         
          <div className='discount_box'>
            <h5>Discount: <span style={{ color: '#111' }}>{inddata.discount}</span></h5>
            <h4>Free Delivery: <span style={{ color: '#111', fontWeight: 600 }}>Oct 8 - 21</span> Details</h4>
            <p>Fastest delivery: <span style={{ color: '#111', fontWeight: 600 }}>Tomorrow 11AM</span></p>
          </div>
          <p className='description'>About the Item :
            <span style={{ color: '#565959', fontSize: 15, fontWeight: 500, letterSpacing: "0.4" }}>
              {inddata.description}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
