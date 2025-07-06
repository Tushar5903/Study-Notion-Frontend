import { useEffect, useRef, useState } from 'react'
import './css/CourseAccordingBar..css'
import { AiOutlineDown } from "react-icons/ai"
import CourseSubSection from './CourseSubSection'

const CourseAccordingBar = ({ course, isActive, handleActive }) => {

    const contentEl = useRef(null)

    const [active, setActive] = useState(false)
    useEffect(() => {
        setActive(isActive?.includes(course._id))
    }, [isActive])

    const [sectionHeight, setSectionHeight] = useState(0)

    useEffect(() => {
        setSectionHeight(active ? contentEl.current.scrollHeight : 0)
    }, [active])


    return (
        <div className='course-according-bar-entire-div'>
            <div>
                <div onClick={() => { handleActive(course._id) }} className='course-according-bar-third-div'>
                    <div className='course-according-bar-forth-div'>
                        <i className={isActive.includes(course._id) ? "course-according-bar-rotate" : "course-according-not-rotate"}></i>
                        <AiOutlineDown />
                        <p>{course?.sectionName}</p>
                    </div>

                    <div className='course-according-bar-fifth-div'>
                        <span className='course-according-bar-first-span'>
                            {`${course.subsection?.length || 0} lecture(s)`}
                        </span>
                    </div>
                </div>
            </div>

            <div ref={contentEl} className='course-according-bar-sixth-div'  style={{height: sectionHeight,}}>
                <div className='course-according-bar-seventh-div'>
                    {course?.subsection?.map((subSec, i) => {
                        return <CourseSubSection subSec={subSec} key={i} />
                    })}
                </div>

            </div>

        </div>
    )
}

export default CourseAccordingBar