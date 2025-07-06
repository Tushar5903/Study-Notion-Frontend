import React from 'react'
import './InstructorSection.css'
import DTAButton from "./Button"
import Instructor from '../../../assets/Images/Instructor.png'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
    return (
        <div>
            <div className='Instructor-first-div'>
                <div className='Instructor-image'>
                    <img src={Instructor} alt='Instructor-Image' />
                </div>
                <div className='Instructor-text'>
                    <h2 className='Instructor-heading'>Become an <span className='highlighting'>instructor</span></h2>
                    <p className='Instructor-para'> Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                    <div className='Instructor-button-main-section'>
                        <DTAButton active={true} linkto={"/Signup"} >
                            <div className='Instuctor-section-button'>
                                <div>Start Teaching Today</div>
                                <FaArrowRight />
                            </div>
                        </DTAButton>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default InstructorSection
