import React, { useState } from 'react';
import './signUp.css';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

    const [userData, setUserData] = useState({
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: ""
    });

    const addData = (e) => {
        const { name, value } = e.target;

        setUserData((prevData) => {
            return {
                ...prevData,
                [name]: value
            };
        });
    };

    const sendData = async (e) => {
        e.preventDefault();
        const { fname, email, mobile, password, cpassword } = userData;

        if (!fname || !email || !mobile || !password || !cpassword) {
            toast.warn("Please fill in all the fields", {
                position: "top-center",
            });
            return;
        }

        try {
            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, mobile, password, cpassword
                })
            });

            const data = await res.json();
            if (res.status === 442 || !data) {
                toast.warn("Invalid details", {
                    position: "top-center",
                });
            } else {
                toast.success("Data successfully added", {
                    position: "top-center",
                });
                setUserData({ fname: "", email: "", mobile: "", password: "", cpassword: "" });
            }
        } catch (error) {
            toast.error("Error during registration", {
                position: "top-center",
            });
        }
    };

    return (
        <section>
            <div className='sign_container'>
                <div className='sign_header'>
                    <img src='https://github.com/harsh17112000/E-commerceapp/blob/main/client/public/blacklogoamazon.png?raw=true' alt='amazon logo' />
                </div>
                <div className='sign_form'>
                    <form method='POST'>
                        <h1>Create account</h1>
                        <div className='form_data'>
                            <label htmlFor="fname">Your name</label>
                            <input type='text' onChange={addData} value={userData.fname} name='fname' id='fname' />
                        </div>
                        <div className='form_data'>
                            <label htmlFor="email">Email</label>
                            <input type='text' onChange={addData} value={userData.email} name='email' id='email' />
                        </div>
                        <div className='form_data'>
                            <label htmlFor="mobile">Mobile</label>
                            <input type='text' onChange={addData} value={userData.mobile} name='mobile' id='mobile' />
                        </div>
                        <div className='form_data'>
                            <label htmlFor="password">Password</label>
                            <input type='password' onChange={addData} value={userData.password} placeholder='At least 6 char' name='password' id='password' />
                        </div>
                        <div className='form_data'>
                            <label htmlFor="cpassword">Password Again</label>
                            <input type='password' onChange={addData} value={userData.cpassword} name='cpassword' id='cpassword' />
                        </div>
                        <button className='signin_btn' onClick={sendData}>Continue</button>
                        <div className='signin_info'>
                            <p>Already have an account?</p>
                            <NavLink to="/login">SignIn</NavLink>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </section>
    );
};

export default SignUp;
