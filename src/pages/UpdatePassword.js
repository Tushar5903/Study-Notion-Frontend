import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner'
import { BiLeftArrowAlt } from "react-icons/bi";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { resetPassword } from '../services/operation/authApi';
import './css/UpdatePassword.css'

const UpdatePassword = () => {

    const { loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const location = useLocation();

    const navigate = useNavigate();

    const [formdata, setformData] = useState({
        password: '', confirmPassword: ''
    });

    const { password, confirmPassword } = formdata

    function handleOnChange(event) {
        setformData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token))
    }
    return (
        <div className='update-password-first-div'>
            {loading ? (<div className='spinner-position'><Spinner /></div>) :
                (<div className='update-password-inner-div'>
                    <h1 className='update-password-heading'>Choose New Password</h1>
                    <p className='update-password-para'>Almost done. Enter your new password and you are all set</p>
                    <form onSubmit={handleOnSubmit}>
                        <label>
                            <p className='para'>New Password <sup className="colour">*</sup></p>
                            <input type='password' className="input_design background" required placeholder='Enter Your Password' name='password' value={password} onChange={handleOnChange}></input>
                        </label>
                        <label>
                            <p className='para'>Confirm Password <sup className="colour">*</sup></p>
                            <input type='password' required placeholder='Confirm Your Password' className="input_design background" name='confirmPassword' value={confirmPassword} onChange={handleOnChange}></input>
                        </label>
                        <button className='update-password-form-button' type='submit'>Reset Password</button>

                    </form>

                    <div className='forget-password-forwarding' onClick={() => { navigate('/Login') }}>
                        <BiLeftArrowAlt className='forget-password-forwarding-icon' />
                        Back to login
                    </div>

                </div>)

            }
        </div>
    )
}

export default UpdatePassword
