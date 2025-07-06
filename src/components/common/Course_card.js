import React, {useState,useEffect} from 'react'
import GetAvgRating from '../../utils/avgRating';
import RatingStars from './RatingStars';
import { Link } from 'react-router-dom';
import './css/Course_card.css'

const Course_card = ({course,Height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course?.ratingAndReview || []);
        console.log("Average rating ha ji:" ,avgReviewCount)
        setAvgReviewCount(count);
    }, [course])

    


    return (
        <div>
            <Link to={`/courses/${course._id}`}>
            <div>
                <div className='course-card-third-div'>
                    <img src={course?.thumbnail} alt="course thumnail" className={` course-card-thumbnail-image`} ></img>
                </div>

                <div className='course-card-forth-div'>
                    <p className='course-div-first-para'>
                        {course?.courseName}
                    </p>

                    <p className='course-div-second-para'>
                        {course?.instructor?.firstName} {course?.instructor?.lastName}
                    </p>

                    <div className='course-div-fifth-div'>
                        <span className='course-div-first-span'>{avgReviewCount || 0}</span>

                        <RatingStars  Review_Count={4.5} Star_Size={24} />

                        <span className='course-div-second-span'>
                            {course?.ratingAndReview?.length} Rating
                        </span>
                    </div>

                    <p className='course-div-first-para'>
                        Rs. {course?.price}
                    </p>
                </div>
            </div>
            
            </Link>

        </div>
    )
}

export default Course_card
