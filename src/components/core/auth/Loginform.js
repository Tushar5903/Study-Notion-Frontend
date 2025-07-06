import { useState } from 'react'
import React  from 'react'
import './css/LoginForm.css'
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../../../services/operation/authApi';

function Loginform  ()  {

    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const [formData, setformData] = useState({
        email: "", password: ""
    });

    const [showpassword, setshowpassword] = useState(false)
    const { email, password } = formData
    function changeHandler(event) {
        setformData(prevdata => ({
            ...prevdata,
            [event.target.name]: event.target.value
        }))
    }

    function submitHandler(event){
        event.preventDefault();
        dispatch(login(email, password, navigate))
    }

    return (
        <form onSubmit={submitHandler} className="login_form_complete_access">
            <label className="label">
                <p className="para">Email Address <sup className="colour">*</sup></p>
                <input required type="text" value={formData.email} onChange={changeHandler} placeholder="Enter Email" name="email" className="input_design"></input>
            </label>
            <label className="label relattive">
                <p className="para">Password <sup className="colour">*</sup></p>
                <input required type={showpassword ? ("text") : ("password")} value={formData.password} onChange={changeHandler} placeholder="Enter Password" name="password" className="input_design"></input>
                <span onClick={() =>setshowpassword((prev) => !prev)} className="eye_icon"> {showpassword ? (<FaEye/>):(<FaEyeSlash/>)}</span>

                <Link to="/forget-password" > <p className="forget" > Forget Password </p></Link>
            </label>

            <button className="buttonss" >Sign In</button>
        </form>
    )
}

export default Loginform