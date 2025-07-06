import './css/EditCourse.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCourseDetails, getFullDetailsOfCourse } from '../../../services/operation/CourseDetails';
import { setCourse, setEditCourse } from '../../../slices/CourseSlice';
import RenderSteps from './AddCourses/RenderSteps'

const EditCourse = () => {
    const dispatch = useDispatch()
    const { courseId } = useParams()
    const { course } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)
    console.log("Redux course state in EditCourse:", course)

    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true)
            const result = await getFullDetailsOfCourse(courseId, token)
            console.log("Course fetched result:", result)
            if (result) {
                dispatch(setEditCourse(true))
                dispatch(setCourse(result))
            }
            setLoading(false)
        }
        populateCourseDetails();

    }, [courseId, token, dispatch])



    return (
        <div className='edit-course-entire-div'>
            <div className='edit-course-alligment'>
                <h1 className='Edit-course-heading'>
                    Edit Course
                </h1>
                <div className='edit-course-second-div'>
                    {course ? (<RenderSteps />) : (<p className='edit-course-para'>Course Not Found</p>)}
                </div>
            </div>

        </div>
    )
}

export default EditCourse
