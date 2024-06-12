import React, { useState, useContext } from 'react';
import './signUp.css';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';

const Sign_in = () => {
  const [logdata, setData] = useState({
    email: "",
    password: ""
  });

  const { setAccount } = useContext(LoginContext);

  const addData = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const senddata = async (e) => {
    e.preventDefault();

    const { email, password } = logdata;

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log('Login response data:', data);

    if (res.status === 400 || !data) {
      console.log("Invalid details");
      toast.warn("Invalid details", {
        position: "top-center",
      });
    } else {
      console.log("Data valid");
      setAccount(data);
      toast.success("User valid", {
        position: "top-center",
      });
      setData({ email: "", password: "" });
    }
  };

  return (
    <>
      <section>
        <div className='sign_container'>
          <div className='sign_header'>
            <img src='https://github.com/harsh17112000/E-commerceapp/blob/main/client/public/blacklogoamazon.png?raw=true' alt='amazon logo' />
          </div>
          <div className='sign_form'>
            <form method='POST'>
              <h1>Sign-In</h1>
              <div className='form_data'>
                <label htmlFor="email">Email</label>
                <input type='text'
                  onChange={addData} value={logdata.email} name='email' id='email' />
              </div>
              <div className='form_data'>
                <label htmlFor="password">Password</label>
                <input type='password'
                  onChange={addData} value={logdata.password} placeholder='At least 6 char' name='password' id='password' />
              </div>
              <button className='signin_btn' onClick={senddata}>Continue</button>
            </form>
          </div>
          <div className='create_accountinfo'>
            <p>New To Amazon?</p>
            <NavLink to="/register"><button>Create Your Amazon Account</button></NavLink>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}

export default Sign_in;
