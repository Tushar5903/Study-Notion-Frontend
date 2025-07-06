import React, { useEffect, useState } from 'react'
import './css/CourseReviewModal.css'
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
// import ReactStars from "react-rating-stars-component" // ❌ Removed
import { useSelector } from "react-redux"
import Iconsbtn from '../../common/Iconsbtn'
import { createRating } from '../../../services/operation/CourseDetails'
import StarRating from '../../common/StarRating' // ✅ Import custom component

const CourseReviewModal = ({ setReviewModal }) => {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { courseEntireData } = useSelector((state) => state.viewCourse)

    const { register, handleSubmit, setValue, formState: { errors }, } = useForm()
    const [rating, setRating] = useState(0)

    useEffect(() => {
        setValue("review", "")
        setValue("rating", 0)
    }, [])

    useEffect(() => {
        setValue("rating", rating)
    }, [rating, setValue])

    const onSubmit = async (data) => {
        await createRating(
            {
                courseId: courseEntireData._id,
                rating: data.rating,
                review: data.review,
            },
            token
        )
        setReviewModal(false)
    }

    return (
        <div className='course-review-modal-entire-div'>
            <div className='course-review-modal-second-div'>
                <div className='course-review-modal-third-div'>
                    <p className='course-review-modal-first-para'>Add Review</p>
                    <button className='course-review-moda-cross-icon-div' onClick={() => setReviewModal(false)}>
                        <RxCross2 className='course-review-modal-cross-icon' />
                    </button>
                </div>

                <div className='course-review-modal-forth-div'>
                    <div className='course-review-modal-fifth-div'>
                        <img src={user?.image} alt={user?.firstName + " profile"} className='course-review-modal-first-image' />
                        <div>
                            <p className='course-review-modal-second-para'>{user?.firstName} {user?.lastName}</p>
                            <p className='course-review-modal-third-para'>Posting Publicly</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="course-review-modal-entire-form">
                        <div className="course-review-stars-wrapper">
                            <StarRating rating={rating} setRating={setRating} className='star-sizing' />
                        </div>

                        <div className='course-review-modal-sixth-div'>
                            <label htmlFor='review' className='course-review-first-label'>
                                Add Your Experience <sup className='course-review-first-sup'>*</sup>
                            </label>
                            <textarea
                                id="review"
                                placeholder="Add Your Experience"
                                {...register("review", { required: true })}
                                className="course-review-textarea"
                            />
                            {errors.review && (
                                <span className="course-review-first-span">
                                    Please Add Your Experience
                                </span>
                            )}
                        </div>

                        <div className='course-review-modal-seventh-div'>
                            <button onClick={() => setReviewModal(false)} className='course-review-modal-first-button'>Cancel</button>
                            <Iconsbtn text="Save" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CourseReviewModal
