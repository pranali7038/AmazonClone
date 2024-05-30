import React from 'react'

const Right = () => {
  return (
    <div className='right_buy'>
      <img src='https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png' alt='amazon_img'/>
      <div className='cost_right'>
        <p>Your Order is eligible for FREE delivery.</p><br/>
        <span style={{color:'#565959x'}}>Select this option at checkout. Details</span>
        <h3>Subtotal (1 items): <span style={{fontWeight:700}}>₹4049.00</span></h3>
        <button className='rightbuy_btn'>Process to Buy</button>
        <div className='emi'>
            Emi Available
        </div>
      </div>
    </div>
  )
}

export default Right
