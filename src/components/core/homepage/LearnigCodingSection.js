import React from 'react'
import './LearnigCodingSection.css'
import Know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_other from "../../../assets/Images/Compare_with_others.png"
import Plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import DTAButton from "./Button"

const LearnigCodingSection = () => {
    return (
        <div>
            <div className='entire-Learning-section'>
                <div className='first-heading'>
                    Your swiss knife for <span className='highlighting'>learning any language</span>
                </div>
                <div className='second-section'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>
                <div className='multiple-image-section'>
                    <img src={Know_your_progress} alt='Know_your_progress' className='first-img' />
                    <img src={Compare_with_other} alt='Compare_with_other' className='second-img' />
                    <img src={Plan_your_lesson} alt='Plan_your_lesson' className='third-img' />
                </div>
                <div className='learning-button-section' >
                    <DTAButton active={true} linkto={"/Signup"}>
                        Learn More
                    </DTAButton>
                </div>
            </div>

        </div>
    )
}

export default LearnigCodingSection
