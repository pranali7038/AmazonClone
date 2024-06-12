import { useEffect, useState } from "react";
import React from 'react'

const Right = ({item}) => {
  const [price,setprice] = useState(0);

  useEffect(()=>{
    totalAmount();
  },[item])

  const totalAmount = ()=>{
    let price =0;
    item.map((item)=>{
      price = item.price.cost + price;
    });
    setprice(price)
  }
  return (
    <div className='right_buy'>
      <img src='https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png' alt='amazon_img'/>
      <div className='cost_right'>
        <p>Your Order is eligible for FREE delivery.</p><br/>
        <span style={{color:'#565959x'}}>Select this option at checkout. Details</span>
        <h3>Subtotal ({item.length} items): <span style={{fontWeight:700}}>₹{price}.00</span></h3>
        <button className='rightbuy_btn'>Process to Buy</button>
        <div className='emi'>
            Emi Available
        </div>
      </div>
    </div>
  )
}

export default Right
