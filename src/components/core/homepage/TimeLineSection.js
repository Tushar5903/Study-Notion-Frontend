import React from 'react'
import './TimeLineSection.css'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimeLine from "../../../assets/Images/TimelineImage.png"

const timeLine = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description: "The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        heading: "Solve the problem",
        Description: "Code your way to a solution",
    }
]

const TimeLineSection = () => {
    return (
        <div>
            <div className='part-two'>
                <div className='entire-icons-section'>
                    {
                        timeLine.map((element, index) => {
                            return (
                                <div className='entire-left-timeline'>
                                    <div key={index} className='single-timeline'>
                                        <div className='Logo-div'>
                                            <img src={element.Logo} alt='Logo Images'></img>
                                        </div>
                                        <div>
                                            <h2 className='heading-portion'>{element.heading}</h2>
                                            <p className='description-portion'>{element.Description}</p>
                                        </div>
                                    </div>
                                    {/* <div className='doted-lines'>

                                    </div> */}

                                </div>
                            )
                        })
                    }

                </div>

                <div className='image-div'>
                    <img src={TimeLine} alt='TimeLineImage' className='image-tag'></img>
                    <div className='overlap-over-image'>
                        <div className='left-direction'>
                            <p className='left-number'>10</p>
                            <p className='left-text'>Years Of Experience</p>
                        </div>
                        <div className='right-direction'>
                            <p className='right-number'>250</p>
                            <p className='right-text'>Type of Courses</p>
                        </div>

                    </div>
                </div>

            </div>


        </div>
    )
}

export default TimeLineSection
