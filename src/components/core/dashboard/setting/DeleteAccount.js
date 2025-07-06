import React from 'react'
import { FiTrash2 } from "react-icons/fi"
import './css/DeleteAccount.css'
import {useSelector , useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { deleteProfile } from '../../../../services/operation/settingApi'

const DeleteAccount = () => {

  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }


  return (
    <div className='delete-account-entire-div'>
      <div className='edit-profile-alignment'>
        <div className='delte-account-second-div'>
          <div className='delete-icon'>
            <FiTrash2 />
          </div>

          {/* delete-content-begins */}


          <div className='delete-content-div'>
            <h2 className="delete-content-heading">Delete Account</h2>
            <div className='delete-content-second-div'>
              <p>Would you like to delete account?</p>
              <p>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</p>
            </div>
            <button type='button' className='confirm-delte-button' onClick={handleDeleteAccount}>I want to delete my account.</button>

          </div>

        </div>
      </div>

    </div>
  )
}

export default DeleteAccount
