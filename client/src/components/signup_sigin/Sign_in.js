import React, { useState } from 'react'
import './signUp.css';
import { NavLink } from 'react-router-dom';

const Sign_in = ()=> {

  const[logdata,setData] = useState({
     email:"",
     password:""
  });

  const addData = (e)=>{
    const {name,value} = e.target;
    setData(()=>{
      return {
        ...logdata,
        [name]:value
      }
    })
  }
  return (
   <>
    <section>
      <div className='sign_container'>
          <div className='sign_header'>
            <img src='https://github.com/harsh17112000/E-commerceapp/blob/main/client/public/blacklogoamazon.png?raw=true' alt='amazon logo'/>
          </div>
          <div className='sign_form'>
            <form>
                <h1>Sign-In</h1>
                <div className='form_data'>
                  <lable htmlFor="email">Email</lable>
                  <input type='text' 
                  onChange={addData} value={logdata.email} name='email' id='email'/>
                </div>
                <div className='form_data'>
                  <lable htmlFor="password">Password</lable>
                  <input type='password'
                  onChange={addData} value={logdata.password} placeholder='At least 6 char' name='passwword' id='password'/>
                </div>
                <button className='signin_btn'>Continue</button>
                
            </form>
          </div>
          <div className='create_accountinfo'>
            <p>New To Amazon?</p>
          <NavLink to="/register"><button>Creat Your amazon account</button></NavLink> 
          </div>
      </div>
    </section>
   </>
  )
}

export default Sign_in
