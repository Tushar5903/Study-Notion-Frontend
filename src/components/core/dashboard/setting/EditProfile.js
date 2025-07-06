import React from 'react'
import './css/EditProfile.css'
import { useNavigate } from "react-router-dom"
import Iconsbtn from '../../../common/Iconsbtn'
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { updateProfile } from '../../../../services/operation/settingApi'

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.profile)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors }, } = useForm()

  const submitProfileForm = async (data) => {
    try {
      dispatch(updateProfile(token, data))
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }


  return (
    <form className='edit-profile-form' onSubmit={handleSubmit(submitProfileForm)}>
      <div>
        <div className='edit-profile-first-div'>
          <div className='edit-profile-alignment'>
            <h1 className='edit-profile-heading'>Profile Information</h1>
            <div className='edit-profile-second-div'>
              <div className='edit-profile-third-div'>
                <label htmlFor='firstName' className='edit-profile-label'>First Name</label>
                <input type='text' name='firstName' id='firstName' placeholder='Enter First Name' className='edit-profile-input'
                  {...register("firstName", { required: true })}
                  defaultValue={user?.firstName}
                />
                {errors.firstName && (
                  <span className="warning-span">
                    Please enter your first name.
                  </span>
                )}
              </div>
              <div className='edit-profile-third-div'>
                <label htmlFor='lastName' className='edit-profile-label'>Last Name</label>
                <input type='text' name='lastName' id='lastName' placeholder='Enter Last Name' className='edit-profile-input'
                  {...register("lastName", { required: true })}
                  defaultValue={user?.lastName}
                />
                {errors.lastName && (
                  <span className='warning-span'>
                    Please enter your last name.
                  </span>
                )}
              </div>
            </div>

            <div className='edit-profile-second-div'>
              <div className='edit-profile-third-div'>
                <label htmlFor='dateOfBirth' className='edit-profile-label'>Date Of Birth</label>
                <input type='date' name='dateOfBirth' id='dateOfBirth' placeholder='dd-mm-yyyy' className='edit-profile-input'
                  {...register("dateOfBirth", {
                    required:
                    {
                      value: true,
                      message: "Please Enter Your Date Of Birth. "
                    },
                    max: {
                      value: new Date().toISOString().split("T")[0],
                      message: "Date of Birth cannot be in the future. "
                    },
                  })}
                  defaultValue={user?.additionalDetails?.dateOfBirth}
                />
                {errors.dateOfBirth && (
                  <span className='warning-span'>
                    {errors.dateOfBirth.message}
                  </span>
                )}
              </div>
              <div className='edit-profile-third-div'>
                <label htmlFor='Gender' className='edit-profile-label'>Gender</label>
                <select type='text' name='Gender' id='Gender' placeholder='Enter Last Name' className='edit-profile-input' {...register("gender", { required: true })} defaultValue={user?.additionalDetails?.gender} >
                  {genders.map((element, index) => {
                    return (
                      <option key={index} value={element}>
                        {element}
                      </option>
                    )
                  })}
                </select>
                {errors.gender && (
                  <span className='warning-span'>
                    Please Select Your Gender
                  </span>
                )}
              </div>
            </div>

            <div className='edit-profile-second-div'>
              <div className='edit-profile-third-div'>
                <label htmlFor='dob' className='edit-profile-label'>Contact Number</label>
                <input type='tel' name='contactNumber' id='contactNumber' placeholder='Enter Contact Number' className='edit-profile-input' {...register("contactNumber",
                  {
                    required:
                    {
                      value: true,
                      message: "Please Enter Your Contact",
                    },
                    maxLength:
                    {
                      value: 12,
                      message: "Invalid Contact Number",
                    }, minLength: {
                      value: 10,
                      message: "Invalid Contact Number"
                    }

                  })} 
                  defaultValue={user?.additionalDetails?.contactNumber}
                  />
                  {errors.contactNumber && (
                    <span className='warning-span'>
                      {errors.contactNumber.message}
                    </span>
                  )}
              </div>
              <div className='edit-profile-third-div'>
                <label htmlFor='about' className='edit-profile-label'>About</label>
                <input type='text' name='about' id='about' placeholder='Enter Bio Details' className='edit-profile-input' {...register("about",{required:true})} defaultValue={user?.additionalDetails?.about} />
                {errors.about && (
                  <span className='warning-span'>
                    Please Enter Your Bio
                  </span>
                )}
              </div>
            </div>



          </div>
        </div>

        <div className='edit-profile-buttons'>
          <button onClick={() => { navigate("/dashboard/my-profile") }} className='edit-profile-cancel-button' >Cancel</button>
          <Iconsbtn text="Save" type="submit" />
        </div>

      </div>

    </form>
  )
}

export default EditProfile
