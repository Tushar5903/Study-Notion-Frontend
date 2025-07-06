import React, { useEffect, useState } from 'react'
import './css/CourseDetails.css'
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import RatingStars from '../components/common/RatingStars';
import CourseAccordingBar from '../components/core/Course/CourseAccordingBar';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import { Formatdata } from '../services/Formatdata'
import { fetchCourseDetails } from '../services/operation/CourseDetails'
import { buyCourse, directEnrollCourse } from '../services/operation/StudentFeaturesApi';
import GetAvgRating from '../utils/avgRating'
import Error from './Error'

const CourseDetail = () => {

  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { courseId } = useParams()
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  useEffect(() => {
    ; (async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    })()
  }, [courseId])
  console.log("Course ID from useParams:", courseId);

  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.data?.ratingAndReview || [])
    console.log("Rating and Reviews", response?.data?.ratingAndReview)
    setAvgReviewCount(count)
  }, [response])

  const [isActive, setIsActive] = useState(Array(0))

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    )
    console.log("click hua ha ji")
  }

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  console.log("The console data at course-Detials: ", response);

  if (loading || !response) {
    return (
      <div className="course-details-first-div-before-return">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!response.success) {
    return <Error />
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatWillYouLearn,
    courseContent = [],
    ratingAndReview = [],
    instructor = {},
    studentEnrolled = [],
    createdAt, } = response.data


  const handleBuyCourse = () => {
    if (token) {
      // buyCourse(token, [courseId], user, navigate, dispatch)

      directEnrollCourse(token, courseId, navigate);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1handler: () => navigate("/login"),
      btn2handler: () => setConfirmationModal(null),
    })
  }

  if (paymentLoading) {
    // console.log("payment loading")
    return (
      <div className="course-details-first-div-before-return">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <div className='course-details-first-div'>
        <div className='course-details-second-div'>
          <div className='course-details-third-div'>
            <div className='course-details-forth-div'>
              <div className='course-details-fifth-div'>
                <img src={thumbnail} alt='Course Thumbnail' className='course-details-first-image' />
              </div>

              <div className='course-details-sixth-div'>
                <div>
                  <p className='course-details-first-para'> {courseName} </p>
                </div>
                <p className='course-details-second-para'>{courseDescription}</p>
                <div className='course-details-seventh-div'>
                  <span className='course-details-first-span'>{avgReviewCount}</span>
                  <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                  <span>{`(${ratingAndReview.length} reviews)`}</span>
                  <span>{`${studentEnrolled.length} students enrolled`}</span>
                </div>

                <div>
                  <p className='course-details-third-para'>
                    Created By {`${instructor.firstName} ${instructor.lastName}`}
                  </p>
                </div>

                <div className='course-details-eight-div'>
                  <p className='course-details-third-para'>
                    {" "}
                    <BiInfoCircle /> Created at {Formatdata(createdAt)}
                  </p>
                  <p className='course-details-third-para'>
                    {" "}
                    <HiOutlineGlobeAlt /> English
                  </p>
                </div>
              </div>

              <div className='course-details-ninth-div'>
                <p className='course-details-fifth-para'>
                  Rs. {price}
                </p>

                <button className='course-details-card-first-button' onClick={handleBuyCourse}>
                  Buy Now
                </button>

                <button className='course-details-card-second-button'>
                  Add To Cart
                </button>

              </div>
            </div>

            <div className='course-details-tenth-div'>
              <CourseDetailsCard
                course={response?.data}
                setConfirmationModal={setConfirmationModal}
                handleBuyCourse={handleBuyCourse}
              />

            </div>


          </div>
        </div>

        <div className='course-details-eleventh-div'>
          <div className='course-details-twelth-div'>
            <div className='course-details-forteen-div'>
              <p className='course-detail-sixth-para'>What you'll learn</p>
              <div className='course-details-fifteen-div'>
                <ReactMarkdown>{whatWillYouLearn}</ReactMarkdown>
              </div>
            </div>


            <div className='course-details-sixteen-div'>
              <div className='course-details-seventeen-div'>
                <p className='course-detail-seventh-para'>Course Content</p>
                <div className='course-detail-eighteen-div'>
                  <div className='course-detail-ninteen-div'>
                    <span>
                      {courseContent.length} {`section(s)`}
                    </span>
                    <span>
                      {totalNoOfLectures} {`lecture(s)`}
                    </span>
                    <span>{response.data?.totalDuration} total length</span>
                  </div>
                  <div>
                    <button onClick={() => setIsActive([])} className='course-details-first-button'>
                      Collapse all sections
                    </button>
                  </div>
                </div>
              </div>

              <div className='course-details-twenteen-div'>
                {courseContent?.map((course, index) => (
                  <CourseAccordingBar
                    course={course}
                    key={index}
                    isActive={isActive}
                    handleActive={handleActive}
                  />
                ))}
              </div>

              <div className='course-details-twentyone-div'>
                <p className='course-detail-eight-para'>Author</p>
                <div className='course-details-twentytwo-div'>
                  <img
                    src={
                      instructor.image
                        ? instructor.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                    }
                    alt="Author"
                    className='course-details-second-image'
                  />
                  <p className='course-details-ninth-para'>{`${instructor.firstName} ${instructor.lastName}`}</p>
                </div>
                <p className='course-details-tenth-para'>
                  {instructor?.additionalDetails?.about}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default CourseDetail
