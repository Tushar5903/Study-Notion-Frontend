import React from 'react'
import './css/Dashboard.css'
import { useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/core/dashboard/SideBar'
import { useState } from 'react'
import { FaArrowCircleRight } from "react-icons/fa";
import ConfirmationModal from '../components/common/ConfirmationModal';

const Dashboard = ({menuOpen,setMenuOpen}) => {

    const { loading: authloading } = useSelector((state) => state.auth);
    const { loading: profileloading } = useSelector((state) => state.profile);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    if (profileloading || authloading) {
        return (
            <div className='dashboard-spinner-div'><Spinner /></div>
        )
    }
    
    return (
        <div className='dashboard-entire-div'>
            {menuOpen ? (""):  (<button className={`sidebar-toggle-button ${isSidebarOpen ? 'hide-toggle' : ''} `}  onClick={toggleSidebar}><FaArrowCircleRight /></button>)  }
            
            <div className={`dashboard-sidebar ${isSidebarOpen ? "sidebar-visible" : "sidebar-hidden"}`}>
                <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setConfirmationModal={setConfirmationModal} />
            </div>
            <div className={`dashboard-content ${!isSidebarOpen ? "content-full" : ""}`}>
                <Outlet />
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>


    )
}

export default Dashboard
