import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import './css/PublishForm.css'
import Iconsbtn from '../../../common/Iconsbtn';
import { resetCourseState, setStep } from '../../../../slices/CourseSlice';
import { editCourseDetails } from '../../../../services/operation/CourseDetails';
import { COURSE_STATUS } from '../../../../utils/constant';
import {useNavigate} from "react-router-dom"

const PublishForm = () => {
  const {register,handleSubmit,setValue, getValues} = useForm();
  const dispatch = useDispatch();
  const {token} = useSelector ((state)=>state.auth);
  const{course} = useSelector ((state)=>state.course);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(course?.status === COURSE_STATUS.PUBLISHED){
      setValue("public", true);
    }
  },[]);

  const goBack =() =>{
    dispatch(setStep(2))
  }

   const goToCourses = () =>{
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async() =>{
    if ((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)){
      goToCourses();
      return;
    }
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus)

    setLoading(true);
    const result = await editCourseDetails(formData,token)
    if (result) {
      goToCourses();
    }
    setLoading(false);

  }

 

  const onSubmit = () =>{
    handleCoursePublish();
  }

  

  return (
    <div className='publish-form-entire-div'>
      <h3>Publish Course</h3>      
      <form onSubmit={handleSubmit(onSubmit)} className='publish-form-entire-form'>
        <div className='publish-form-second-div'>
          <label htmlFor='public'>
            Make This Course As Public
          </label>
          <input type='checkbox' id='public' {...register("public")} className='public-form-input'></input>
        </div>

        <div className='publish-form-buttons-div'>
          <button disabled={loading} type='button' onClick={goBack} className='publish-course-back-button'>
            Back
          </button>
          <Iconsbtn disabled={loading} text="Save Changes" />
        </div>

      </form>
    </div>
  )
}

export default PublishForm
