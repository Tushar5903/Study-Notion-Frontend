import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import './css/ProfileDropdown.css'
import useOnClickOutside from "../../../hook/ClickOutside"
import { logout } from "../../../services/operation/authApi"


const ProfileDropdown = ({setMenuOpen}) => {

  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null
  return (
    <button className="profile-dropdown-button" onClick={() => setOpen(true)}>
      <div className="profile-drop-down-first-div">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="profile-user-image"
        />
        <AiOutlineCaretDown className="profile-cart-button" />
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          ref={ref} 
          className="profile-drop-down-second-div"
        >
          <Link to="/dashboard/my-profile" onClick={() => {
            setOpen(false)
            setMenuOpen?.(false)}}>
            <div  className="profile-drop-down-third-div">
              <VscDashboard className="profile-dashboard-button" />
              Dashboard
            </div>
          </Link>
          <div 
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
              setMenuOpen?.(false)
            }}
            className="profile-drop-down-forth-div"
          >
            <VscSignOut className="profile-signout-button" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}


export default ProfileDropdown
