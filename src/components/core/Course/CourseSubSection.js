import React,  { useEffect, useRef, useState } from 'react'
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineVideoCamera } from "react-icons/hi"
import './css/CourseSubSection.css'

const CourseSubSection = ({subSec}) => {
  return (
    <div>
        <div className='course-sub-section-second-div'>
            <div className='course-sub-sectoin-third-div'>
                <span>
                     <HiOutlineVideoCamera />
                </span>
                <p className='course-sub-section-para'>{subSec?.title}</p>
            </div>
        </div>
      
    </div>
  )
}

export default CourseSubSection
