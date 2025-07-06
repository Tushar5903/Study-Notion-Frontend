import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component"
import { MdOutlineStarBorder,MdOutlineStar  } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi"
import { removeFromCart } from '../../../../slices/cartSlice';
import './css/RenderTotalAmount.css'

const RenderTotalAmount = () => {
const {cart} = useSelector((state)=>state.cart)
const dispatch = useDispatch()


  return (
    <div className='Render-total-amount-entire-div'>
        {
            cart.map((course,index)=>(
                <div className='Render-total-amount-second-div'>
                    <div className={`Render-total-amount-third-div ${index !== cart.length-1 && "Render-total-amount-third-div-part-one"} ${index !== 0 && "Render-total-amount-third-div-part-two"}`}>
                        <img src={course?.thumbnail} className='Render-total-amount-first-image' />
                        <div className='Render-total-amount-forth-div'>
                            <p className='Render-total-first-para'>{course?.courseName}</p>
                            <p className='Render-total-second-para'>{course?.category?.name}</p>
                            <div className='Render-total-Fifth-div'>
                                <span className='Render-total-first-span'>4.5</span>
                                <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<MdOutlineStarBorder />}
                                fullIcon={<MdOutlineStar />}
                                />
                                <span className='Render-total-second-span'>{course?.ratingAndReviews?.length} Ratings</span>
                            </div>
                        </div>
                    </div>

                    <div className='Render-total-sixth-div'>
                        <button onClick={()=>dispatch(removeFromCart(course._id))} className='Render-total-first-button'>
                            <FiTrash2/>
                            <span className='Render-total-third-span'>Remove</span>

                        </button>

                        <p className='Render-total-third-para'>Rs {course?.price}</p>
                    </div>

                </div>
            ))
        }
      
    </div>
  )
}

export default RenderTotalAmount
