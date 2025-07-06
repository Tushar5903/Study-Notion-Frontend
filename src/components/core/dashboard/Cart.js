import React from 'react'
import { useSelector } from "react-redux"
import RenderCartCourses from './cart/RenderCartCourses';
import RenderTotalAmount from './cart/RenderTotalAmount';
import './css/Cart.css'

const Cart = () => {
    const { total, totalItems } = useSelector((state) => state.cart);
    return (
        <div className='cart-entire-div'>
            <div className='cart-allignment'>
                <h1 className='cart-heading'>Your Cart</h1>
                <p className='cart-total-count-para'>{totalItems} Courses in Cart</p>

                {
                    total > 0 ? (<div>
                        <RenderCartCourses />
                        <RenderTotalAmount />
                    </div>) : (
                        <p className='empty-cart-dataset'> Your Cart is Empty</p>
                    )
                }

            </div>
        </div>
    )
}

export default Cart
