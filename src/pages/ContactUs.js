import React from 'react'
import './css/ContactUs.css'
import { IoMdChatbubbles } from "react-icons/io";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import AboutContact from '../components/core/aboutUs/AboutContact';
import Footer from '../components/common/Footer';

const ContactUs = () => {
    const leftSide = [
        {
            logo: <IoMdChatbubbles/>,
            heading:"Chat on us",
            para:"Our friendly team is here to help.",
            para2:"study1notion@gmail.com",
        },
        {
            logo: <FaEarthAmericas/>,
            heading:"Visit us",
            para:"Come and say hello at our office HQ.",
            para2:"Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
        },
        {
            logo: <IoCall />,
            heading:"Call us",
            para:"Mon - Fri From 8am to 5pm",
            para2:"+123 456 7869",
        },
    ]
  return (
    <div className='contact-us-entire-div'>
        <div className='contact-us-data-div'>
            <div className='contact-us-first-div'>
                {
                    leftSide.map((card,index)=>{
                        return (
                            <div className='contact-us-1st-inner-div' key={index}>
                                <div className='contact-us-2nd-inner-div'>
                                    <div className='contact-us-3rd-inner-div'>{card.logo}</div>
                                    <h3 className='contact-us-inner-heading'>{card.heading}</h3>
                                </div>
                                <p className='contact-us-inner-first-para'>{card.para}</p>
                                <p className='contact-us-inner-second-para'>{card.para2}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className='contact-us-second-div'>
                <div className='contact-us-second-inner-div'>
                <h1 className='contact-us-inner-first-heading'>Got a Idea? We've got the skills. Let's team up</h1>
                <p className='contact-us-inner-third-para'>Tell us more about yourself and what you're got in mind.</p>
                <AboutContact/>

                </div>
                

            </div>
        </div>   
        <Footer/>   
    </div>
  )
}

export default ContactUs
