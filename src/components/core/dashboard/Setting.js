import React from 'react'
import './css/Setting.css'
import ChangeProfileImg from './setting/ChangeProfileImg'
import EditProfile from './setting/EditProfile'
import DeleteAccount from './setting/DeleteAccount'

const Setting = () => {
    return (
        <div className='setting-first-div'>
            <div className='setting-second-div'>
                <h1 className='settings-heading'>Edit Profile</h1>

                <ChangeProfileImg />

                <EditProfile />

                <DeleteAccount />

            </div>
        </div>
    )
}

export default Setting
