import React from 'react'
import { Link } from 'react-router-dom'
import "./Button.css"

const Button = ({ children, linkto, active }) => {
    return (
        <Link to={linkto}>
            <div className={`${active ? "yellowcolor" : "bluecolor"}`}>
                {children}
            </div>
        </Link>
    )
}

export default Button
