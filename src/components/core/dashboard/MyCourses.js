import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchInstructorCourses } from "../../../services/operation/CourseDetails"
import Iconsbtn from '../../common/Iconsbtn'
import './css/MyCourses.css'
import CourseTable from './MyCourses/CourseTable'

const MyCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourse = async () => {
            const result = await fetchInstructorCourses(token);
            if (result) {
                setCourses(result)
            }
        }
        fetchCourse();
    }, [])
    return (
        <div className='My-coursess-entire-div'>
            <div className='My-courses-second-div'>
                <div className='My-courses-third-div'>
                    <h1 className='My-Courses-heading'>My Courses</h1>
                    <Iconsbtn text="Add Courses" onClick={() => navigate("/dashboard/add-course")} />
                </div>

                {
                    courses && <CourseTable courses={courses} setCourses={setCourses} />
                }

                
            </div>

        </div>
    )
}

export default MyCourses
