import React from 'react'
import './css/LearningGrid.css'
import DTAButton from '../homepage/Button'

const LearningGridArray = [
    {
        order:-1,
        heading:(
            <div className="grid-heading-data">
                World-Class Learning for <span className="blue-highlighting">Anyone, Anywhere</span>
            </div>
        ),
        description:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        btnText:"Learn More",
        btnLink : "/"
    },
    {
        order:1,
        heading:"Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
    },
    {
        order:2,
        heading:"Our Learning Methods",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring."
    },
    {
        order:3,
        heading:"Certification",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring."
    },
    {
        order:4,
        heading:`Rating "Auto-grading"`,
        description:"Studynotion partners with more than 275+ leading universities and companies to bring."
    },
    {
        order:5,
        heading:"Ready to Work",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring."
    }
];

const LearningGrid = () => {
  return (
    <div className='learning-grid-entire-div'>
        {
            LearningGridArray.map((card,index)=>{
                return(
                    <div key={index} className={`${index === 0 && "double-width-grid"} ${card.order===-1 && "black-color-first-grid"} ${card.order%2 === 1 ? "grey-color-grid" : " black-color-grid"}  ${card.order === 3 && "grid-positioning"} ${card.order===1 && "for-media-in-learning-grid"}`}>
                        {
                            card.order<0 ? (
                                <div className='learning-grid-1-inner-div'>
                                    <h1 className='learning-grid-1-heading'>{card.heading}</h1>
                                    <p className='learning-frid-1-para'>{card.description}</p>
                                    <DTAButton active={true} linkto={card.btnLink}>{card.btnText}</DTAButton>
                                </div>
                            ):(
                                <div className='learning-grid-2-inner-div'>
                                    <h1 className='learning-grid-remaining-heading'>{card.heading}</h1>
                                    <p className='learning-grid-remaining-para'>{card.description}</p>
                                </div>
                            )
                        }

                    </div>
                )
            })
        }
      
    </div>
  )
}



export default LearningGrid
