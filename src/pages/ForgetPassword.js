import React, { useState } from 'react'
import './css/ForgetPassword.css'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner'
import { getPasswordResetToken } from '../services/operation/authApi'
import { BiLeftArrowAlt } from "react-icons/bi";
import {useNavigate} from 'react-router-dom';

const ForgetPassword = () => {

    const { loading } = useSelector((state) => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const navigate =useNavigate();

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

    return (
        <div className='forget-password-first-div'>
            {
                loading ? (
                    <div className='spinner-position'><Spinner /></div>
                ) : (
                    <div className='forget-password-inner-div'>
                        <h1 className='forget-password-heading'>
                            {
                                !emailSent ? "Reset Your Password" : "Check Your Email"
                            }
                        </h1>
                        <p className='forget-password-para'>
                            {
                                !emailSent ? " Have no fear. We'll email you instruction to reset your password. If you don't have access to your email we can try account recovery" : ` we will sent the reset email to ${email}`
                            }
                        </p>
                        <form onSubmit={handleOnSubmit}>
                            {
                                !emailSent && (
                                    <label>
                                        <p className='para'>Email Address <sup className="colour">*</sup></p>
                                        <input required type='email' name='email' value={email} className="input_design background" onChange={(event) => setEmail(event.target.value)} placeholder='Enter Your Email Address'></input>
                                    </label>
                                )
                            }
                            <button className='forget-password-form-button' type='submit'>
                                {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                }
                            </button>
                        </form>
                        <div className='forget-password-forwarding' onClick={()=> {navigate('/login')}}>
                            <BiLeftArrowAlt className='forget-password-forwarding-icon' />
                            Back to login
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default ForgetPassword
