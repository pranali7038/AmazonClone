import React from 'react'
import "./footer.css"

const Footer = () => {

    const year = new Date().getFullYear();

  return (
    <footer>
      <div className='footer_container'>
        <div className='footr_details_one'>
            <h3>Get to know US</h3>
            <p>About US</p>
            <p>Careers</p>
            <p>Press realeases</p>
            <p>Amazon Cares</p>
        </div>
        <div className='footr_details_one'>
            <h3>Connect with Us</h3>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
            
        </div>
        <div className='footr_details_one forres'>
            <h3>Make Money with Us</h3>
            <p>About US</p>
            <p>Careers</p>
            <p>Press realeases</p>
            <p>Amazon Cares</p>
        </div>
        <div className='footr_details_one forres'>
            <h3>Make Money with Us</h3>
            <p>About US</p>
            <p>Careers</p>
            <p>Press realeases</p>
            <p>Amazon Cares</p>
        </div>
        </div>
        <div className='lastdetails'>
            <img src="https://github.com/harsh17112000/E-commerceapp/blob/main/client/public/amazon_PNG25.png?raw=true" alt='amzon_png25.png'/>
            <p>Conditions of Use & Sale &nbsp;&nbsp; &nbsp;   Privacy Notice  &nbsp;&nbsp;&nbsp;      Internet-Based Ads    &nbsp;&nbsp;&nbsp;    © 1996-{year} Amazon.com, Inc. or its affiliates</p>
        </div>
      
    </footer>
  )
}

export default Footer
