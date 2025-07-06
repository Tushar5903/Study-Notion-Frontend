import React, { useState } from 'react'
import './css/SideBar.css'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operation/authApi'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../common/Spinner'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal'
import { FaArrowCircleLeft } from "react-icons/fa";

const SideBar = ({ isOpen, toggleSidebar , setConfirmationModal  }) => {

    const { user, loading: profileloading } = useSelector((state) => state.profile);
    const { loading: authloading } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (profileloading || authloading) {
        return (
            <div className='dashboard-spinner-div'><Spinner /></div>
        )
    }


    return (
        <div className={`sidebar-entire-div ${isOpen ? "sidebar-show" : "sidebar-hide"}`}>
            <button className="sidebar-toggle-close" onClick={toggleSidebar}><FaArrowCircleLeft /></button>
            <div className='sidebar-second-div'>
                {
                    sidebarLinks.map((element, index) => {
                        if (element.type && user?.accountType !== element.type) return null
                        return (
                            <SidebarLink element={element} iconName={element.icon} key={element.id} />
                        )
                    })
                }
            </div>
            <div className='sidebar-third-div'></div>
            <div className='sidebar-forth-div'>
                <SidebarLink element={{ name: "Setting", path: "dashboard/setting" }} iconName="VscSettingsGear" />
                <button onClick={() => setConfirmationModal({
                    text1: "Are You Sure",
                    text2: "You Will be Logged Out from your Account",
                    btn1Text: " Logout ",
                    btn2Text: " cancel ",
                    btn1handler: () => dispatch(logout(navigate)),
                    btn2handler: () => setConfirmationModal(null),
                })} className='sidebar-setting-button'>
                    <div className='Logout-sidebar-button'>
                        <VscSignOut className='logout-button-icon-sidebar' />
                        <span>Logout</span>
                    </div>
                </button>
            </div>

           

        </div>
    )
}

export default SideBar
