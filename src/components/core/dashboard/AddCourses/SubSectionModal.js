import React from 'react'
import './css/SubSectionModal.css'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"
import { createSubSection, updateSubSection } from '../../../../services/operation/CourseDetails'
import { setCourse } from '../../../../slices/CourseSlice'
import Iconsbtn from '../../../common/Iconsbtn'
import Upload from './Upload'



const SubSectionModal = ({ modalData, setModalData, add = false, view = false, edit = false, }) => {

    const { register, handleSubmit, setValue, formState: { errors }, getValues, } = useForm()

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)

    useEffect(() => {
        if (view || edit) {

            setValue("lectureTitle", modalData.title)
            setValue("lectureDesc", modalData.description)
            setValue("lectureVideo", modalData.videoUrl)
        }
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues()

        if (
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl
        ) {
            return true
        }
        return false
    }


    const handleEditSubsection = async () => {
        const currentValues = getValues()

        const formData = new FormData()

        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id)
        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle)
        }
        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc)
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("videoFile", currentValues.lectureVideo)
        }
        setLoading(true)
        const result = await updateSubSection(formData, token)
        if (result) {

            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData.sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)
    }


    const onSubmit = async (data) => {

        if (view) return

        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made to the form")
            } else {
                handleEditSubsection()
            }
            return
        }


        const formData = new FormData()
        formData.append("sectionId", modalData)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("videoFile", data.lectureVideo)
        setLoading(true)
        const result = await createSubSection(formData, token)
        if (result) {

            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setModalData(null)
        setLoading(false)
    }






    return (
        <div className='subsection-modal-entire-div'>
            <div className='subsection-modal-second-div' >
                <div className='subsection-modal-third-div'>
                    <p className='subsection-modal-para'>
                        {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
                    </p>
                    <button onClick={() => (!loading ? setModalData(null) : {})} className='subsection-modal-cross-button'>
                        <RxCross2 className="subsection-modal-cross-button-icon" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='subsection-modal-entire-form'>
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />

                    <div className='subsection-modal-forth-div'>
                        <label className='subsection-modal-label' htmlFor='lectureTitle'>
                            Lecture Title {!view && <sup className="course-information-super">*</sup>}
                        </label>
                        <input
                            disabled={view || loading}
                            id="lectureTitle"
                            placeholder="Enter Lecture Title"
                            {...register("lectureTitle", { required: true })}
                            className="subSection-modal-input"
                        />
                        {errors.lectureTitle && (
                            <span className="subSection-modal-warning">
                                Lecture title is required
                            </span>
                        )}

                    </div>

                    <div className='subsection-modal-forth-div'>
                        <label className='subsection-modal-label' htmlFor='lectureDesc'>
                            Lesture description {" "} {!view && <sup className="course-information-super">*</sup>}
                        </label>
                        <textarea
                            disabled={view || loading}
                            id="lectureDesc"
                            placeholder="Enter Lecture Description"
                            {...register("lectureDesc", { required: true })}
                            className="subSection-modal-textarea"
                        />
                        {errors.lectureDesc && (
                            <span className="subSection-modal-warning">
                                Lecture Description is required
                            </span>
                        )}
                    </div>

                    {!view && (
                        <div className="Seb-Section-modal-save-button">
                            <Iconsbtn
                                disabled={loading}
                                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
                            />
                        </div>
                    )}


                </form>
            </div>

        </div>
    )
}

export default SubSectionModal
