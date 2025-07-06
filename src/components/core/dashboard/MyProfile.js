import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Iconsbtn from '../../common/Iconsbtn'
import './css/MyProfile.css'
import { getUserDetails } from '../../../services/operation/profileApi'


const MyProfile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.profile)
  
  const navigate = useNavigate();
   useEffect(() => {
    if (token && !user) {
      dispatch(getUserDetails(token));
    }
  }, [token, user, dispatch]);

  if (!user) {
    return <div>Loading profile...</div>;
  }


  
  return (
    <div className='myprofile-entire-section'>
      <h1 className='myprofile-heading'>My Profile</h1>

      {/* section 1 */}
      <div className='myprofile-section-1-first-div'>
        <div className='myprofile-section-1-second-div'>
          <img src={`${user?.image}`} alt={`profile-${user?.firstName}`} className='myprofile-user-image' />
          <div className='myprofile-section-1-third-div'>
            <p className='myprofile-section-1-first-para'>{user?.firstName + " " + user?.lastName}</p>
            <p className='myprofile-section-1-second-para'>{user.email}</p>
          </div>
        </div>
        <Iconsbtn text="Edit" onClick={() => navigate("/dashboard/setting")} />
      </div>

      {/* Section 2 */}
      <div className='myprofile-section-2-first-div'>
        <div className='myprofile-section-2-second-div'>
          <p className='myprofile-section-2-first-para'>About</p>
          <Iconsbtn text="Edit" onClick={() => navigate("/dashboard/setting")} />
        </div>
        <p className='myprofile-section-2-second-para'>{user?.additionalDetails?.about ?? "Write Something about Yourself"}</p>
      </div>

      {/* section 3 */}
      <div className='myprofile-section-3-first-div'>
        <div className='myprofile-section-3-second-div'>
          <p className='myprofile-main-heading-section-3'>Personal Details</p>
          <Iconsbtn text="Edit" onClick={() => navigate("/dashboard/setting")} />
        </div>


        <div className='myprofile-section-3-third-div'>


          <div className='myprofile-section-3-forth-div'>
            <div className='myprofile-section-3-common-div'>
              <p className='fixed-details'>First Name</p>
              <p className='changable-details'>{user?.firstName}</p>
            </div>
            <div className='myprofile-section-3-common-div'>
              <p className='fixed-details'>Last Name</p>
              <p className='changable-details'>{user?.lastName}</p>
            </div>
          </div>
          
          <div className='myprofile-section-3-fifth-div'>
            <div className='myprofile-section-3-common-div'>
              <p className='fixed-details'>Email</p>
              <p className='changable-details'>{user?.email}</p>
            </div>
            <div className='myprofile-section-3-common-div'>
              <p className='fixed-details'>Phone Number</p>
              <p className='changable-details'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
            </div>
          </div>


          <div className='myprofile-section-3-sixth-div'>
            <div className='myprofile-section-3-common-div'>
              <p className='fixed-details'>Gender</p>
              <p className='changable-details'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
            </div>

            <div className='myprofile-section-3-common-div'>
              <p className='fixed-details'>Date Of Birth</p>
              <p className='changable-details'>{user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth"}</p>
            </div>
          </div>




        </div>

      </div>

      <div className='for-black-spacing-after-all-3-sections'></div>


    </div>
  )
}

export default MyProfile
