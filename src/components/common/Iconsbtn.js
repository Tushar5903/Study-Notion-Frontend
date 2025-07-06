import React from 'react'
import "./css/Iconsbtn.css"

const Iconsbtn = ({
    text,
    onClick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
}) => {
    return (
        <button disabled= {disabled} onClick={onClick} type={type} className={`Icons-buttons-common  ${customClasses || ""}`}>
            {
                children ? (<>
                    <span>
                        {text}
                    </span>
                    {children}
                </>)
                    :
                    (
                        text
                    )
            }
        </button>
    )
}

export default Iconsbtn
