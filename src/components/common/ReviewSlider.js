import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FaStar } from "react-icons/fa"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
import { apiConnector } from "../../services/apiConnector"
import { ratingEndPoints } from "../../services/api"
import './css/ReviewSlider.css'

function ReviewSlider() {
    const [reviews, setReviews] = useState([])
    const truncateWords = 15

    useEffect(() => {
        ; (async () => {
            const { data } = await apiConnector("GET", ratingEndPoints.REVIEWS_DETAILS_API)
            if (data?.sucess) {
                setReviews(data?.data)
            }
        })()
    }, [])

    return (
        <div className="review-slider-entire-div">
            <div className="review-slider-second-div">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={25}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className="review-slider-swiper"
                    breakpoints={{
                        0:{
                            slidesPerView:1,
                        },
                        662:{
                            slidesPerView:2,
                        },
                        920:{
                            slidesPerView:3,
                        },
                    }}
                    >

                    {
                        reviews.map((review, i) => {
                            return (
                                <SwiperSlide key={i}>
                                    <div className="review-slider-third-div">
                                        <div className="review-slider-forth-div">
                                            <img
                                                src={
                                                    review?.user?.image
                                                        ? review?.user?.image
                                                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                                                }
                                                alt="profile-image"
                                                className="review-slider-profile-image"
                                            />
                                            <div className="review-slider-fifth-div">
                                                <h1 className="review-slider-first-heading">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                                                <h2 className="review-slider-second-heading">{review?.course?.courseName}</h2>
                                            </div>
                                        </div>

                                        <p className="review-slider-first-para">
                                            {review?.review.split(" ").length > truncateWords ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...` : `${review?.review}`}
                                        </p>

                                        <div className="review-slider-sixth-div">
                                            <h3 className="review-slider-third-heading">{review.rating.toFixed(1)}</h3>
                                            <ReactStars
                                                count={5}
                                                value={review.rating}
                                                size={20}
                                                edit={false}
                                                activeColor="#ffd700"
                                                emptyIcon={<FaStar />}
                                                fullIcon={<FaStar />}
                                            />

                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }

                </Swiper>
            </div>
        </div>

    )

}

export default ReviewSlider