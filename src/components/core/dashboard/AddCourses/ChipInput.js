import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"
import './css/ChipInput.css'

export default function ChipInput({
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues,
}) {
    const { editCourse, course } = useSelector((state) => state.course)
    const [chips, setChips] = useState([])

    useEffect(() => {
        if (editCourse) {
            const tags = course?.tag
            if (Array.isArray(tags)) {
                setChips(tags)
            } else if (typeof tags === 'string') {
                setChips(tags.split(',').map(tag => tag.trim()))
            } else {
                setChips([])
            }
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
    }, [])

    useEffect(() => {
        setValue(name, chips)
    }, [chips])

    const handleKeyDown = (event) => {

        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault()
            const chipValue = event.target.value.trim()
            if (chipValue && !chips.includes(chipValue)) {
                const newChips = [...chips, chipValue]
                setChips(newChips)
                event.target.value = ""
            }
        }
    }

    const handleDeleteChip = (chipIndex) => {

        const newChips = chips.filter((_, index) => index !== chipIndex)
        setChips(newChips)
    }

    return (
        <div className='chip-input-entire-div'>
            <label className='chip-input-label' htmlFor={name}>
                {label}<sup className='chip-input-super'>*</sup>
            </label>

            <div className='chip-input-second-div'>
                {Array.isArray(chips) &&
                    chips.map((chip, index) => (
                        <div key={index} className='chip-input-third-div'>
                            {chip}
                            <button onClick={() => handleDeleteChip(index)} className='chip-input-close-button'><MdClose className='close-button-icon-in-chip-inputs' /></button>
                        </div>
                    ))}

                <input id={name} name={name} type='text' placeholder={placeholder} onKeyDown={handleKeyDown} className='chip-input'></input>

            </div>{
                errors[name] && (
                    <span className='chip-input-warning'>
                        {label} is required
                    </span>
                )
            }

        </div>
    )
}


