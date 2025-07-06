import React from 'react'
import './css/CourseDetailsCard.css'
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addToCart } from '../../../slices/cartSlice'
import { ACCOUNT_TYPE } from '../../../utils/constant'

const CourseDetailsCard = ({ course, setConfirmationModal, handleBuyCourse }) => {

    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { thumbnail: ThumbnailImage, price: CurrentPrice, _id: courseId, } = course

    const handleShare = () => {
        copy(window.location.href)
        toast.success("Link copied to clipboard")
    }

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor. You can't buy a course.")
            return
        }
        if (token) {
            dispatch(addToCart(course))
            return
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1handler: () => navigate("/login"),
            btn2handler: () => setConfirmationModal(null),
        })
    }


    return (
        <div className='course-details-card-entire-div'>
            <div className='course-details-card-second-div'>
                <img src={ThumbnailImage} alt={course?.courseName} className='course-details-card-image' />
                <div className='course-details-card-third-div'>
                    <div className='course-details-card-forth-div'>
                        Rs. {CurrentPrice}
                    </div>
                    <div className='course-details-card-fifth-div'>
                        <button onClick={user && Array.isArray(course?.studentsEnrolled) && course?.studentsEnrolled.includes(user?._id) ? () => navigate("/dashboard/enrolled-courses") : handleBuyCourse} className='course-details-card-first-button'>
                            {user && Array.isArray(course?.studentsEnrolled) && course?.studentsEnrolled.includes(user?._id) ? "Go To Course" : "Buy Now"}
                        </button>

                        {(!user || !Array.isArray(course?.studentsEnrolled) || !course?.studentsEnrolled.includes(user?._id)) && (
                            <button onClick={handleAddToCart} className="course-details-card-second-button">
                                Add to Cart
                            </button>
                        )}

                    </div>

                    <div>
                        <p className='course-details-card-first-para'>
                            30-Day Money-Back Guarantee
                        </p>
                    </div>

                    <div>
                        <p className='course-details-card-second-para'>
                            This Course Includes :
                        </p>
                        <div className='course-details-card-sixth-div'>
                            {course?.instructions?.map((item, i) => {
                                return (
                                    <p className="course-details-card-third-para" key={i}>
                                        <BsFillCaretRightFill />
                                        <span>{item}</span>
                                    </p>
                                )
                            })}

                        </div>
                    </div>

                    <div>
                        <button className='course-details-card-third-button'  onClick={handleShare}>
                            <FaShareSquare size={15} /> Share
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default CourseDetailsCard
