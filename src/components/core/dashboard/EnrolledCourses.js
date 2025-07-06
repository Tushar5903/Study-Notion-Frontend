import React, { useEffect, useState } from 'react'
import './css/EnrolledCourses.css'
import { useSelector, useDispatch } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operation/profileApi'
import Spinner from '../../common/Spinner'
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom"
import { setEntireCourseData, setCourseSectionData } from '../../../slices/ViewCourseSlice'

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      console.log("Unable to fetch enrolled courses", error)
    }
  }

  useEffect(() => {
    getEnrolledCourses();
  }, [])

  return (
    <div className='enrolled-courses-entire-div'>
      <div className='enrolled-courses-alignment'>
        <h1 className='enrolled-courses-heading'>Enrolled Courses</h1>

        {
          !enrolledCourses ? (
            <div className='spinner-alignment'><Spinner /></div>
          ) : !enrolledCourses.length ? (
            <p className='enrolled-courses-length-para'>You have not enrolled in any courses yet</p>
          ) : (
            <div className='enrolled-courses-second-div'>
              <div className='enrolled-courses-third-div'>
                <p className='enrolled-courses-first-para'>Courses Name</p>
                <p className='enrolled-courses-second-para'>Duration</p>
                <p className='enrolled-courses-third-para'>Progress</p>
              </div>

              {
                enrolledCourses.map((course, index) => {
                  const isCompleted = localStorage.getItem(`course-completed-${course._id}`) === "true";
                  const progress = isCompleted ? 100 : 0;

                  return (
                    <div className='enrolled-courses-forth-div' key={index}>
                      <div
                        className='enrolled-courses-fifth-div'
                        onClick={() => {
                          const content = course?.courseContent;
                          const firstSection = content?.[0];
                          const firstSubsection = firstSection?.subsection?.[0];

                          if (
                            Array.isArray(content) &&
                            content.length > 0 &&
                            firstSection &&
                            Array.isArray(firstSection.subsection) &&
                            firstSubsection
                          ) {
                            dispatch(setEntireCourseData(course));
                            dispatch(setCourseSectionData(content));
                            navigate(
                              `/view-course/${course._id}/section/${firstSection._id}/sub-section/${firstSubsection._id}`
                            );
                          } else {
                            alert("This course doesn't have structured content yet.");
                          }
                        }}
                      >
                        <img src={course.thumbnail} className='enrolled-courses-first-image' alt="Course Thumbnail" />
                        <div className='enrolled-courses-sixth-div'>
                          <p className='enrolled-courses-forth-para'>{course.courseName}</p>
                          <p className='enrolled-courses-fifth-para'>{course.courseDescription}</p>
                        </div>
                      </div>

                      <div className='enrolled-courses-seventh-div'>
                        {course?.totalDuration}
                      </div>

                      <div className='enrolled-courses-eight-div'>
                        <p className='enrolled-courses-sixth-para'>Progress: {progress}%</p>
                        <ProgressBar
                          completed={progress}
                          height="8px"
                          isLabelVisible={false}
                          bgColor={progress === 100 ? "#22c55e" : "#d1d5db"}  // Green if 100%, gray otherwise
                          baseBgColor="#e5e7eb"
                        />
                      </div>
                    </div>
                  );
                })
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default EnrolledCourses
