import React from 'react'
import "./Newnav.css";
const Newnav = () => {
  return (
    <div className='new_nav'>
        <div className='nav_data'>
            <div className='left_data'>
                <p>All</p>
                <p>Mobile</p>
                <p>Bestseller</p>
                <p>Fashion</p>
                <p>Customer services</p>
                <p>Electronics</p>
                <p>Prime</p>
                <p>Today's deal</p>
                <p>Amazon Pay</p>
            </div>
            <div className='right_data'>
                <img src='https://github.com/harsh17112000/E-commerceapp/blob/main/client/public/nav.jpg?raw=true' alt='NavData'/>
            </div>
        </div>
    </div>
  )
}

export default Newnav
