import React from 'react'
import { AiFillThunderbolt } from "react-icons/ai";
import RenderSteps from './RenderSteps';
import './css/AddCourses.css'

export default function AddCourse () {
    return (
        <div className='Add-Course-entire-div'>
            <div className='Add-course-second-div'>
                <div className='Add-courses-third-div'>
                    <h1 className='Add-courses-heading'>Add Courses</h1>
                    <div>
                        <RenderSteps />
                    </div>
                </div>
                <div className='Add-courses-forth-div'>
                    <p className='Add-courses-para'><AiFillThunderbolt className='thunderbolt' />Course Upload Tips</p>
                    <ul className='Add-courses-unordered-list'>
                        <li>Set the course Price option or make it free. </li>
                        <li>Standard size for the course thubnail is 1024X576.</li>
                        <li>Video Section Controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

