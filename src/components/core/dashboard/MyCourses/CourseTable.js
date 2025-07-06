import React, { useState } from 'react'
import { CiClock1 } from "react-icons/ci";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { COURSE_STATUS } from '../../../../utils/constant'
import { FaCheck } from "react-icons/fa";
import { PiCurrencyInr } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import ConfirmationModal from '../../../common/ConfirmationModal'
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operation/CourseDetails';
import { useSelector } from 'react-redux';
import './CourseTable.css'

const CourseTable = ({ courses, setCourses }) => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [confirmationModal ,setConfirmationModal] = useState(null);
    const {token} = useSelector((state)=> state.auth);

    const handleCourseDelete= async(courseId)=>{
        setLoading(true)

        await deleteCourse( {courseId:courseId} , token);

        const result = await fetchInstructorCourses(token);
        if (result){
            setCourses(result);
        }

        setConfirmationModal(null);
        setLoading(false);

    }
    return (
        <div>
            <Table className='course-table-entire-table'>
                <Thead>
                    <Tr className='course-table-heading-row'>
                        <Th className='course-table-heading-one'>
                            Courses
                        </Th>

                        <Th className='course-table-heading-two'>
                            Price
                        </Th>
                        <Th className='course-table-heading-three'>
                            Actions
                        </Th>
                    </Tr>
                </Thead>
                <Tbody className='course-table-entire-body'>
                    {
                        courses.length === 0 ? (
                            <Tr>
                                <Td className='data-not-found-table-data'>
                                    No Course Found
                                </Td>
                            </Tr>
                        ) : (
                            courses.map((course) => (
                                <Tr key={course._id} className='course-table-row'>
                                    <Td className='course-table-first-data'>
                                        <img src={course?.thumbnail} className='course-table-image'></img>
                                        <div className='course-table-first-data-div'>
                                            <p className='course-table-course-name'>{course.courseName}</p>
                                            <p className='course-table-description'> {course.courseDescription?.split(" ").length > 30 ? course.courseDescription.split(" ").slice(0, 100).join(" ") + "..." : course.courseDescription}</p>
                                            {
                                                course.status === COURSE_STATUS.DRAFT ? (<p className='Drafted-para-course-table'><CiClock1 /> DRAFTED</p>) : (<p className='published-para-course-table'><FaCheck /> Published</p>)
                                            }


                                        </div>
                                    </Td>

                                    <Td className='course-table-second-data'>
                                        <p><PiCurrencyInr /> {course.price}</p>

                                    </Td>

                                    <Td className='course-table-second-data'>
                                        <button disabled={loading} className='course-table-edit-button' onClick={() => {navigate(`/dashboard/edit-course/${course._id}`)}}><MdEdit className='course-table-edit-icon' /></button>
                                        <button disabled={loading} onClick={() => {
                                            setConfirmationModal({
                                                text1: "Do you want to delete this course?",
                                                text2:
                                                    "All the data related to this course will be deleted",
                                                btn1Text: !loading ? "Delete" : "Loading...  ",
                                                btn2Text: "Cancel",
                                                btn1handler: !loading
                                                    ? () => handleCourseDelete(course._id)
                                                    : () => { },
                                                btn2handler: !loading
                                                    ? () => setConfirmationModal(null)
                                                    : () => { },
                                            })
                                        }} className='course-table-delete-button'><MdDelete className='course-table-delete-icon' /></button>
                                    </Td>


                                </Tr>
                            ))
                        )

                    }
                </Tbody>
            </Table>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

        </div>
    )
}

export default CourseTable
