import { toast } from "react-hot-toast"
import React, { useEffect, useState } from 'react'
import './css/AboutContact.css'
import { useForm } from 'react-hook-form'
import { apiConnector } from "../../../services/apiConnector"
import countryCode from '../../../data/countrycode.json'
import { contactusEndpoint } from '../../../services/api'

const AboutContact = () => {
    const [loading, setloading] = useState(false)
    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

    const submitContactForm = async (data) => {
        console.log("Logging data", data);
        try {
            setloading(true)
            console.log("URL:", contactusEndpoint.CONTACT_US_API);
            const response =await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
            toast.success("Mail Send Successfully")
            console.log('logging response' , response)
            setloading(false)
        } catch (error) {
            console.log("error", error.message);
            setloading(false)
        }
    }

    
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: '',
                firstName: '',
                lastName: '',
                message: '',
                phoneNumber: ''

            })
        }
    }, [isSubmitSuccessful, reset])

    return (
        <div className='about-contact-entire-div'>

            <form className='about-contact-form' onSubmit={handleSubmit(submitContactForm)}>
                <div className='about-contact-first-div'>
                    <div className='about-section-second-div'>
                        <label htmlFor='firstName'><p className='about-contact-para-div'>First Name</p></label>
                        <input type='text' placeholder='Enter first name' className='input-about-contact' name='firstName' id='firstName'
                            {...register("firstName", { required: true })}></input>
                        {errors.firstName && (
                            <span className='error-message'>Please Enter your First Name</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor='lastName'><p className='about-contact-para-div'>Last Name</p></label>
                        <input type='text' placeholder='Enter Last Name ' className='input-about-contact' name='lastName' id='lastName' {...register("lastName", { required: true })}></input>
                        {errors.lastName && (
                            <span className='error-message'>Please Enter your Last Name</span>
                        )}
                    </div>
                </div>
                <div className='about-section-third-div'>
                    <label htmlFor='email'><p className='about-contact-para-div'>Email Address</p></label>
                    <input type='email' placeholder='Enter Email Address' className='email-input-about-contact' name='email' id='email' {
                        ...register("email", { required: true })
                    }></input>
                    {errors.email && (
                        <span className='error-message'>Please Enter Your Email Address</span>
                    )}
                </div>
                <div className='about-section-forth-div'>
                    <label htmlFor='phoneNo'><p className='about-contact-para-div'>Phone Number</p></label>
                    <div className='about-contact-number-section'>
                        <div className='about-contact-drop-down'>
                            <select name='dropdown' id='dropdown' {...register("countryCode", { required: true })} className='about-drop-down'>
                                {
                                    countryCode.map((element, index) => {
                                        return (
                                            <option key={index} value={element.code} className='drop-down-options'>
                                                {element.code} - {element.country}
                                            </option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div className='about-contact-number-div'><input type='number' placeholder='12345 67890' className='about-contact-number-enter-section' name='phoneNo' id='phoneNo' {...register("phoneNo",
                            {
                                required: {value:true ,message:"Please Enter Your Phone Number"},
                                maxLength: { value: 10, message: "Invalid Phone Number" },
                                minLength: { value: 8, message: "Invalid Phone Number" }
                            }
                        )}></input>
                            {errors.phoneNo && (
                                <span className='error-message'>{errors.phoneNo.message}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className='about-section-fifth-div'>
                    <label htmlFor='message'><p className='about-contact-para-div' >Message</p></label>
                    <textarea placeholder='Enter your message here' className='about-contact-text-area-section' name='message' id='message' {...register("message", { required: true })}></textarea>
                    {errors.message && (
                        <span className='error-message'>Please Enter Your Message</span>
                    )}
                </div>
                <div className='about-contact-submit-div'>
                    <button className='about-contact-submit-button' type='submit'>Send Message</button>
                </div>

            </form>
        </div>
    )
}

export default AboutContact
