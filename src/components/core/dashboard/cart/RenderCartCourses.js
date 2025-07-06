import React from 'react'
import { useSelector } from 'react-redux'
import Iconsbtn from '../../../common/Iconsbtn'
import './css/RenderCartCourses.css'
import { directEnrollCourse } from '../../../../services/operation/StudentFeaturesApi'
import { useNavigate } from "react-router-dom"


const RenderCartCourses = () => {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const handlebuycourses = () => {
    const courses = cart.map((course) => course._id);
    console.log("Bought these courses:", courses)
    courses.forEach((courseId) => {
    directEnrollCourse(token, courseId, navigate);
  });
  }



  return (
    <div className='Render-cart-course-entire-div'>
      <p className='Render-cart-course-first-para'>Total:</p>
      <p className='Render-cart-course-second-para'>Rs {total}</p>

      <Iconsbtn text="Buy Now" onClick={handlebuycourses} />

    </div>
  )
}

export default RenderCartCourses
