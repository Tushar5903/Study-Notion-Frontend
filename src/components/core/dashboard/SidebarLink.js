import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import './css/SidebarLink.css'

const SidebarLink = ({element,iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname)
    }

  return (
    <NavLink to={element.path}
    // onclick pr kya krna ha yaha pr
    className={`entire-sidebar-Links ${matchRoute(element.path) ? "sidebar-yellow " : "sidebar-tranparent "}`}
    >
        <span className={`inside-sidebar-links ${matchRoute(element.path) ? " first-span-inside-sidebar-link" : "second-span-inside-sidebar-link"} `}></span>
        <div className={`first-div-inside-sidebar-link`}>
            <Icon className="sidebar-link-icons" />
            <span>{element.name}</span>
        </div>
        
    </NavLink>
  )
}

export default SidebarLink
