import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Iconsbtn from '../../../common/Iconsbtn';
import './css/CourseBuilerForm.css'
import { BiRightArrow } from "react-icons/bi";
import NestedView from './NestedView'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast'
import { setStep, setEditCourse, setCourse } from '../../../../slices/CourseSlice';
import { updateSection, createSection } from '../../../../services/operation/CourseDetails';

const CourseBuilderForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);



  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))

  }

  const gotoNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }
    if (
      course.courseContent.some((section) => section.subsection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    dispatch(setStep(3))

  }

  const onSubmit = async (data) => {
    setLoading(true)

    let result

    if (editSectionName) {
      result = await updateSection(

        {

          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      )

      console.log("Sending updateSection payload:", {
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      })
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      )
    }
    if (result) {
      dispatch(setCourse(result))
      console.log("UPDATED COURSE IN REDUX:", result);
      setEditSectionName(null)
      setValue("sectionName", "")
    }
    setLoading(false)
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }



  return (
    <div className='course-builer-entire-div'>
      <h1 className='course-builder-heading'>Course Builder</h1>
      <form className='course-builder-entire-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='course-builder-first-main-div'>
          <label className='section-label-tag'>Section Name <sup className='course-information-super'>*</sup></label>
          <input id='sectionName' placeholder='Add Section Name' disabled={loading} {...register('sectionName', { required: true })} className='section-input-tag' />{errors.sectionName && (
            <span className='course-information-warning'>
              Section Name is Required
            </span>
          )}
        </div>
        <div className='course-builder-second-main-div'>
          <Iconsbtn type='submit' text={editSectionName ? "Edit Section Name+" : "Create Section + "} outline={true} disabled={loading} />
          {editSectionName && (
            <button type='button' onClick={cancelEdit} className='cancel-button-in-course-builder'>
              Cancel edit
            </button>
          )}
        </div>
      </form>

      {
        course.courseContent.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        )
      }

      <div className='course-builder-buttons'>
        <button onClick={goBack} className='go-back-button-course-Builder'>
          Back
        </button>
        <Iconsbtn text="Next" onClick={gotoNext}> <BiRightArrow /> </Iconsbtn>
      </div>

    </div>
  )
}

export default CourseBuilderForm
