import React from 'react'
import './css/ChangeProfileImg.css'
import Iconsbtn from '../../../common/Iconsbtn'
import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateDisplayPicture } from '../../../../services/operation/settingApi'
import toast from 'react-hot-toast'
import { getUserDetails } from '../../../../services/operation/profileApi'
import { useNavigate } from 'react-router-dom'


const ChangeProfileImg = () => {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)

    const fileInputRef = useRef(null)

    const handleClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            previewFile(file)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }


    const handleFileUpload = () => {
        try {
            console.log("uploading...")
            setLoading(true)
            const formData = new FormData()
            formData.append("displayPicture", imageFile)
            console.log("formdata", formData)
            dispatch(updateDisplayPicture(token, formData)).then(() => {
                dispatch(getUserDetails(token)); 
                setLoading(false)
                 navigate("/dashboard/my-profile");
            });
           
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }


    return (
        <div className='change-profile-entire-div'>
            <div className='change-profile-second-div'>
                <img src={previewSource || user?.image} alt={`profile-${user?.firstName}`} className='change-profile-image'  ></img>
                <div className='change-profile-third-div'>
                    <p className='change-profile-para'>Change Profile Picture</p>
                    <div className='change-profile-forth-div'>
                        <input type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/png, image/gif, image/jpeg"
                        />
                        <button className='change-profile-select-button' onClick={handleClick} disabled={loading} >Select</button>
                        <Iconsbtn text={loading ? "Uploading..." : "Upload"} onClick={handleFileUpload} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ChangeProfileImg
