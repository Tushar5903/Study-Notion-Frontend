import React from 'react'
import './css/Signinform.css'
import { useState } from 'react';
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { sendOtp } from "../../../services/operation/authApi"
import { setSignupData } from '../../../slices/AuthSlice'
import { ACCOUNT_TYPE } from '../../../utils/constant';


const Signinform = ({ setIsLogin }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [formdata, setformData] = useState({
        firstName: "", lastName: "", email: "", password: "", confirmPassword: ""
    });

    const [showpassword, setshowpassword] = useState(false);
    const [showconfirmpassword, setshowconfirmpassword] = useState(false);


    const { firstName, lastName, email, password, confirmPassword } = formdata

    function changeHandler(event) {
        setformData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    function submitHandler(event) {
        event.preventDefault();

        if (formdata.password !== formdata.confirmPassword) {
            toast.error("Password is not correct");
            return;
        }
        const signupData = {
            ...formdata,
            accountType,
        }


        dispatch(setSignupData(signupData))

        dispatch(sendOtp(formdata.email, navigate))

        setformData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }
    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]



    return (
        <div>


            <div className="special_button">
                {tabData.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setAccountType(tab.type)}
                        className={accountType === tab.type ? "instruct" : "common"}
                    >
                        {tab.tabName}
                    </button>
                ))}
            </div>


            <form onSubmit={submitHandler}>

                <div className="signup_form">
                    <label >
                        <p className="para">First Name <sup className="colour">*</sup></p>
                        <input required type="text" name="firstName" value={formdata.firstName} placeholder="Enter First Name" onChange={changeHandler} className="first_name"></input>
                    </label>
                    <label>
                        <p className="para">Last Name<sup className="colour">*</sup></p>
                        <input required type="text" name="lastName" value={formdata.lastName} placeholder="Enter Last Name" onChange={changeHandler} className="first_name"></input>
                    </label>
                </div>
                <label className="label">
                    <p className="para">Email Address<sup className="colour">*</sup></p>
                    <input required type="email" name="email" value={formdata.email} placeholder="Enter Email Address" onChange={changeHandler} className="input_design"></input>
                </label>
                <div className="signup_form_password ">
                    <label className="relattive">
                        <p className="para">Create Password<sup className="colour">*</sup></p>
                        <input required type={showpassword ? ("text") : ("password")} name="password" value={formdata.password} placeholder="Enter Password" onChange={changeHandler} className="signup_password"></input>
                        <span onClick={() => setshowpassword((prev) => !prev)} className="eye_icons">  {showpassword ? (<FaEye />) : (<FaEyeSlash />)} </span>
                    </label>
                    <label className="relattive">
                        <p className="para">Confirm Password<sup className="colour">*</sup></p>
                        <input required type={showconfirmpassword ? ("text") : ("password")} name="confirmPassword" value={formdata.confirmPassword} placeholder="Confirm Password" onChange={changeHandler} className="signup_password"></input>
                        <span onClick={() => setshowconfirmpassword((prev) => !prev)} className="eye_icons">  {showconfirmpassword ? (<FaEye />) : (<FaEyeSlash />)} </span>
                    </label>
                </div>
                <button className="buttonss">Create Password</button>
            </form>
        </div>
    )
}

export default Signinform