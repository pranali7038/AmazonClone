import React, { useState } from 'react'
import './signUp.css';
import { NavLink } from 'react-router-dom';

const SignUp=() =>{

    const[userData,setUserData] = useState({
        fname:"",
        email:"",
        mobile:"",
        password:"",
        cpassword:""
    });

    //console.log(userData)
    const addData = (e)=>{
        const{name,value} = e.target;

        setUserData(()=>{
            return{
                ...setUserData,
                [name]:value
            }
        })
    }

  return (
    <section>
    <div className='sign_container'>
        <div className='sign_header'>
          <img src='https://github.com/harsh17112000/E-commerceapp/blob/main/client/public/blacklogoamazon.png?raw=true' alt='amazon logo'/>
        </div>
        <div className='sign_form'>
          <form>
              <h1>Create account</h1>
              <div className='form_data'>
                <lable htmlFor="fname">Your name</lable>
                <input type='text' onChange={addData} value={userData.fname} name='fname' id='fname'/>
              </div>
              <div className='form_data'>
                <lable htmlFor="email">Email</lable>
                <input type='text' onChange={addData} value={userData.email} name='email' id='email'/>
              </div>
              <div className='form_data'>
                <lable htmlFor="number">Mobile</lable>
                <input type='text' onChange={addData} value={userData.mobile} name='mobile' id='mobile'/>
              </div>
              <div className='form_data'>
                <lable htmlFor="password">Password</lable>
                <input type='password' onChange={addData} value={userData.password} placeholder='At least 6 char' name='passwword' id='password'/>
              </div>
              <div className='form_data'>
                <lable htmlFor="password">Password Again</lable>
                <input type='password' onChange={addData} value={userData.cpassword} name='cpasswword' id='cpassword'/>
              </div>
              <button className='signin_btn'>Continue</button>

              <div className='signin_info'>
                <p>Already have an account?</p>
                <NavLink to="/login">SignIn</NavLink>
              </div>
          </form>
        </div>
    </div>
  </section>
  )
}

export default SignUp
