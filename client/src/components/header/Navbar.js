import React from 'react'
import "./navbar.css"
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avtar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
        <nav>
            <div className='left'>
                <div className='navlogo'>
                 <NavLink to="/"><img src="https://github.com/harsh17112000/E-commerceapp/blob/main/client/public/amazon_PNG25.png?raw=true" alt=''/></NavLink>
                </div>
                <div className='nav_searchbaar'>
                    <input type='text' name='' id=''/>
                    <div className='search_icon'>
                        <SearchIcon id="search"/>
                    </div>
                </div>
            </div>
            <div className='right'>
                <div className='nav_btn'>
                    <NavLink to='/login'>signin</NavLink>
                </div>
                <div className='cart_btn'>
                    <Badge badgeContent={4} color='primary'>
                        <ShoppingCartIcon id="icon"/>
                    </Badge>
                    <p>Cart</p>
                </div>
                <Avtar className='avtar'/>
            </div>
        </nav>
    </header>
  )
}

export default Navbar
