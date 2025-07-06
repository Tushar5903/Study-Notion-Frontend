import React from 'react'
import { useSelector } from "react-redux"
import "./css/RenderSteps.css"
import { FaCheck } from "react-icons/fa";
import CourseInformation from './CourseInformation';
import CourseBuilderForm from './CourseBuilderForm';
import PublishForm from './PublishForm';

const RenderSteps = () => {
    const step = useSelector((state) => state.course?.step) || 1;

    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish"
        },
    ]

    return (
        <div className='RenderSteps-entire-div'>

            <div className='RenderSteps-number-div'>
                {steps.map((item) => (
                    <div className='rendersteps-second-div'>
                        <div key={item.id} className='RenderSteps-third-div'>

                            <button className={` number-button-render-steps ${step === item.id ? "yellow-step" : "grey-step"}`}>
                                {
                                    step > item.id ? (<FaCheck />) : (item.id)
                                }

                            </button>
                        </div>
                        

                    </div>
                ))}
            </div>


            <div className='render-step-heading-div'>
                {steps.map((item) => (
                    <>
                        <div key={item.id} className='render-step-first-inside-heading-div'>
                            <p className={` ${step >= item.id ? "white-text-heading" : "black-text-heading"}`}>
                                {item.title}
                            </p>
                        </div>
                    </>
                ))}
            </div>


            {step === 1 && <CourseInformation />}
            {step === 2 && <CourseBuilderForm />}
            {step === 3 && <PublishForm />}

        </div>
    )
}

export default RenderSteps
