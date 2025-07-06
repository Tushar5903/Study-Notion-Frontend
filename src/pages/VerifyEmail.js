import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import OTPInput from 'react-otp-input';
import './css/VerifyEmail.css';
import { useNavigate } from 'react-router-dom';
import { signUp, sendOtp } from '../services/operation/authApi';
import { BiLeftArrowAlt } from "react-icons/bi";

const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { signupData, loading } = useSelector((state) => state.auth);
    const [inputWidth, setInputWidth] = useState("48px");

    useEffect(() => {
        if (!signupData) {
            navigate('/Signup')
        }
    })

    useEffect(() => {
        const updateWidth = () => {
          setInputWidth(window.innerWidth < 480 ? "36px" : "48px");
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
      }, []);
      

    const submitHandler = (event) => {
        event.preventDefault();

        const { accountType, firstName, lastName, email, password, confirmPassword } = signupData
        console.log(signupData);

        const response = dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate))
        console.log("SIGNUP API RESPONSE............", response);

    }

    return (
        <div className='verify-email-first-div'>
            {loading ? (<div className='spinner-position'><Spinner /></div>)
                :
                (
                    <div className='verifying-email-inner-div'>
                        <h1 className='verifying-email-heading'>Verify Email</h1>
                        <p className='verifying-email-para'>A Verification code has been sent to you. Enter the code below</p>
                        <form onSubmit={submitHandler}>
                            <OTPInput value={otp} onChange={setOtp} numInputs={6} renderInput={(props) => <input {...props} />} className='otp-verification' inputStyle={{
                                width: inputWidth,
                                height: inputWidth,
                                fontSize: "1rem",
                                borderRadius: "8px",
                                border: "2px solid #ccc",
                                margin: "4px",
                                textAlign: "center",
                            }}
                                containerStyle={{
                                    justifyContent: "center",
                                    flexWrap: "wrap",
                                }}>

                            </OTPInput>

                            <button type='submit' className='verifying-email-button'> Verfiy Email</button>
                        </form>

                        <div className='verification-last-button-group'>

                            <div className='verify-email-forwarding' onClick={() => { navigate('/Login') }}>
                                <BiLeftArrowAlt className='verify-email-forwarding-icon' />
                                Back to login
                            </div>

                            <button className='Verification-resent-button' onClick={() => dispatch(sendOtp(signupData.email,navigate))}>
                                Resent IT
                            </button>

                        </div>
                    </div>
                )}

        </div>
    )
}

export default VerifyEmail
