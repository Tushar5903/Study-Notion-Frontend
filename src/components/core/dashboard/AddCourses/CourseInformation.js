import React, { useEffect, useState } from 'react'
import './css/CourseInformation.css'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../services/operation/CourseDetails"
import ChipInput from './ChipInput';
import Upload from './Upload';
import RequiredField from './RequiredField';
import Iconsbtn from "../../../common/Iconsbtn"
import { setCourse, setStep } from '../../../../slices/CourseSlice'
import { COURSE_STATUS } from '../../../../utils/constant';
import { toast } from 'react-hot-toast'

const CourseInformation = () => {
  const { register, handleSubmit, setValue, getValues, formState: { errors }, } = useForm();
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const { token } = useSelector((state) => state.auth)


  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const res = await fetchCourseCategories();
      if (res?.length > 0) {
        setCourseCategories(res);
      }
      setLoading(false);
    }

    if (editCourse) {
      // Set form values using backend keys
      setValue("courseTitle", course.courseName);
      setValue("courseDescription", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", Array.isArray(course.tag) ? course.tag : (typeof course.tag === "string" ? course.tag.split(",") : []));
      setValue("courseBenefits", course.whatWillYouLearn);
      setValue("courseCategory", course.category?._id || "");
      setValue("courseRequirements", course.instruction || []);
      setValue("thumbnail", course.thumbnail || null);
    }

    getCategories();
  }, [editCourse, course, setValue]);

  const isFormUpdated = () => {
    const currentValue = getValues();
    if (
      currentValue.courseTitle !== course.courseName ||
      currentValue.courseDescription !== course.courseDescription ||
      currentValue.coursePrice !== course.price ||
      (Array.isArray(currentValue.courseTags) && currentValue.courseTags.join(",") !== course.tag) ||
      currentValue.courseBenefits !== course.whatWillYouLearn ||
      currentValue.thumbnail !== course.thumbnail ||
      JSON.stringify(currentValue.courseRequirements) !== JSON.stringify(course.instruction) ||
      currentValue.courseCategory !== course.category?._id
    ) {
      return true;
    }
    return false;
  }


  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValue = getValues()
        const formData = new FormData()
        formData.append("courseId", course._id)  // Send courseId for update

        if (currentValue.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }

        if (currentValue.courseDescription !== course.courseDescription) {
          formData.append("courseDescription", data.courseDescription)
        }

        if (currentValue.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }

        if ((Array.isArray(currentValue.courseTags) && currentValue.courseTags.join(",") !== course.tag)) {
          // Backend expects tag as string, so join array to CSV
          formData.append("tag", data.courseTags.join(","))
        }

        if (currentValue.courseBenefits !== course.whatWillYouLearn) {
          formData.append("whatWillYouLearn", data.courseBenefits)
        }

        if (currentValue.thumbnail !== course.thumbnail) {
          formData.append("thumbnailImage", data.thumbnail)
        }

        if (currentValue.courseCategory !== course.category?._id) {
          formData.append("category", data.courseCategory)
        }

        if (JSON.stringify(currentValue.courseRequirements) !== JSON.stringify(course.instruction)) {
          formData.append("instructions", data.courseRequirements.join(","))
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token, course._id);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
          toast.success("Course updated successfully");
        }

      } else {
        toast.error("No changes made to the form")
      }
      return;
    }

    // Add new course flow
    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseDescription)
    formData.append("price", data.coursePrice)
    formData.append("tag", data.courseTags.join(","))
    formData.append("whatWillYouLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.thumbnail)
    setLoading(true);
    const result = await addCourseDetails(formData, token)
    setLoading(false);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result))
      toast.success("Course added successfully");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='course-Information-entier-section'>
      <div className='course-information-input-div'>
        <label htmlFor='courseTitle' className='course-information-label'>Course Title <sup className='course-information-super'>*</sup></label>
        <input id='courseTitle' placeholder='Enter your course Title'
          {...register("courseTitle", { required: true })}
          className='course-information-input-tag'>
        </input>{errors.courseTitle &&
          (<span className='course-information-warning'>
            Course Title is Required
          </span>)}
      </div>

      <div className='course-information-input-div' >
        <label className='course-information-label' htmlFor='courseDescription'>Course Description <sup className='course-information-super'>*</sup></label>
        <textarea id='courseDescription' placeholder='Enter your Course Description'
          {...register("courseDescription", { required: true })}
          className='course-information-textarea-input'>
        </textarea>{errors.courseDescription && (
          <span className='course-information-warning'>
            Course Description is Required
          </span>
        )}

      </div>

      <div className='course-information-input-div'>
        <label htmlFor='coursePrice' className='course-information-label'>Course Price <sup className='course-information-super'>*</sup></label>
        <input id='coursePrice' placeholder='Enter your course Price'
          {...register("coursePrice", { required: true })}
          className='course-information-input-tag'>
        </input>{errors.coursePrice &&
          (<span className='course-information-warning'>
            Price is required
          </span>)}
      </div >

      <div className='course-information-input-div'>
        <label htmlFor='courseCategory' className='course-information-label'>Course Categories <sup className='course-information-super'>*</sup></label>
        <select id='courseCategory' defaultValue=''
          {...register("courseCategory", { required: true })}
          className='course-information-select-tag'>
          <option value='' disabled> Choose a Category</option>
          {
            !loading && courseCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))
          }
        </select>
        {errors.courseCategory && (
          <span className='course-information-warning'>
            Course Category is required
          </span>
        )}

      </div>

      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <Upload
        title={"Course Thumbnail"}
        name="thumbnail"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      <div className='course-information-input-div' >
        <label className='course-information-label' htmlFor='courseBenefits'>Benefits Of Course <sup className='course-information-super'>*</sup></label>
        <textarea id='courseBenefits' placeholder='Enter Benefits Of Courses'
          {...register("courseBenefits", { required: true })}
          className='course-information-textarea-input'>
        </textarea>{errors.courseBenefits && (
          <span className='course-information-warning'>
            Benefits Of the Course is Required
          </span>
        )}

      </div>

      <RequiredField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      <div className='course-information-buttons'>
        {
          editCourse && (
            <button type="button" onClick={() => dispatch(setStep(2))} className='course-information-edit-button'>
              Continue Without Saving
            </button>
          )
        }
        <Iconsbtn text={!editCourse ? "Next" : "Save Changes"} />
      </div>
    </form>
  )
}

export default CourseInformation
