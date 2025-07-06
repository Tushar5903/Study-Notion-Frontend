import {combineReducers} from "@reduxjs/toolkit";
import AuthReducer from '../slices/AuthSlice'
import profileReducer from '../slices/profileSlice';
import cartReducer from '../slices/cartSlice';
import courseReducer from '../slices/CourseSlice';
import viewCourseReducer from '../slices/ViewCourseSlice';


const rootreducer = combineReducers({
    auth:AuthReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer,
})

export default rootreducer;