import React, { useEffect, useState } from 'react'

const Subtotal = ({item}) => {



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
    <div className='sub_item'>
      <h3>Subtotal ({item.length } items):<strong style={{fontWeight:700,color:'#111'}}>₹{price}.00</strong> </h3>
    </div>
  )
}

export default Subtotal
