import React, { useEffect, useState } from 'react';
import "./buynow.css";
import { Divider } from '@mui/material';
import Option from './Option';
import Subtotal from './Subtotal';
import Right from './Right';

const Buynow = () => {
    const [cartData, setCartData] = useState([]);

    const getDataBuy = async () => {
        try {
            const res = await fetch('/cartdetails', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            setCartData(data.carts || []); // Set the carts or an empty array if data.carts is undefined
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        getDataBuy();
    }, []);

    return (
        <>
            {cartData.length > 0 ? (
                <div className='buynow_section'>
                    <div className='buynow_container'>
                        <div className='left_buy'>
                            <h1>Shopping Cart</h1>
                            <p>Select all items</p>
                            <span className='leftbuyprice'>Price</span>
                            <Divider />

                            {cartData.map((item, index) => (
                                <>
                                <div className='item_containert' key={index}>
                                    <img
                                        src={item.url} // Ensure `url` is available in `item`
                                        alt='cart_item_image'
                                    />
                                    <div className='item_details'>
                                        <h3>{item.title.shortTitle}</h3>
                                        <h3>{item.title.longTitle}</h3>
                                        <h3 className='diffrentprice'>₹{item.price.cost}</h3>
                                        <p className='unusuall'>Usually dispatched in 8 days</p>
                                        <p>Eligible for FREE Shipping</p>
                                        <img
                                            src='https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png'
                                            alt='small-image'
                                        />
                                        <Option  deletedata={item.id} get = {getDataBuy} />
                                        
                                
                                    </div>
                                    <h3 className='item_price'>₹{item.price.cost}</h3>
                                </div>
                                <Divider />
                            </>
                                
                            ))}

                            
                            <Subtotal item={cartData} />
                        </div>
                        <Right item={cartData} />
                    </div>
                </div>
            ) : (
                <p>No items in the cart.</p>
            )}
        </>
    );
};

export default Buynow;
