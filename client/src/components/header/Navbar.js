import React, { useContext, useEffect, useState } from 'react';
import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from "../context/ContextProvider";
import MenuIcon from '@mui/icons-material/Menu';
import RightHead from './RightHead';
import { Drawer, IconButton, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);
  const history = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text, setText] = useState("");
  const [liopen, setLiOpen] = useState(true);

  const { products } = useSelector(state => state.getProductsdata);
  const [dropen, setDropen] = useState(false);

  const getDetailValidUser = async () => {
    try {
      const res = await fetch("/validuser", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();

      if (res.status !== 201) {
        console.log("Error fetching valid user");
      } else {
        setAccount(data);
      }
    } catch (error) {
      console.log("Error fetching valid user details:", error);
    }
  };

  const handleOpen = () => {
    setDropen(true);
  };

  const handleDrawerClose = () => {
    setDropen(false);
  };

  const logoutUser = async () => {
    try {
      const res2 = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data2 = await res2.json();

      if (res2.status !== 201) {
        console.log("Error logging out");
      } else {
        toast.success("Logout", {
          position: "top-center",
        });
        history("/");
        setAccount(false);
      }
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  useEffect(() => {
    getDetailValidUser();
  }, []);

  const getText = (items) => {
    setText(items);
    setLiOpen(false);
  }

  return (
    <header>
      <nav>
        <div className='left'>
          <IconButton className="hamburgur" onClick={handleOpen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>

          <Drawer open={dropen} onClose={handleDrawerClose}>
            <RightHead Logclose={handleDrawerClose} Logoutuser={logoutUser}/>
          </Drawer>

          <div className='navlogo'>
            <NavLink to="/">
              <img src="https://github.com/harsh17112000/E-commerceapp/blob/main/client/public/amazon_PNG25.png?raw=true" alt='' />
            </NavLink>
          </div>
          <div className='nav_searchbaar'>
            <input type='text' name=''
              onChange={(e) => getText(e.target.value)}
              placeholder='Search your products'
              id='' />
            <div className='search_icon'>
              <SearchIcon id="search" />
            </div>

            { /*search filter*/}
            {
              text &&
              <List className='extrasearch' hidden={liopen}>
                {
                  products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                    <ListItem key={product.id}>
                      <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiOpen(true)}>
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))
                }
              </List>
            }
          </div>
        </div>
        <div className='right'>
          <div className='nav_btn'>
            <NavLink to='/login'>Sign in</NavLink>
          </div>
          <div className='cart_btn'>
            {account ? (
              <NavLink to="/buynow">
                <Badge badgeContent={account.carts ? account.carts.length : 0} color='primary'>
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={0} color='primary'>
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}
            <ToastContainer />
            <p>Cart</p>
          </div>
          {account && account.fname ? (
            <Avatar className='avtar2'
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              {account.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar className='avtar'
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            />
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {account && (
              <MenuItem onClick={logoutUser}>
                <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />
                Logout
              </MenuItem>
            )}
          </Menu>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
