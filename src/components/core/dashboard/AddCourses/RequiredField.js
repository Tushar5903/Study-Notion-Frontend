import React, { useEffect, useState } from 'react'
import './css/RequiredField.css'

const RequiredField = ({ name, label, register, errors, setValue, getValues }) => {
    const [requirement, setRequirements] = useState("")
    const [requirementList, setRequirementList] = useState([]);


    useEffect( ()=>{
        register(name, {
            requirement:true,
            validate : (value) => value.length > 0
        })

    },[])

    useEffect (()=>{
        setValue(name, requirementList);
    },[requirementList])

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirements("");
        }
    }

    const handleRemoveRequiremnt = (index) => {
        const updatedREquirementList = [...requirementList];
        updatedREquirementList.splice(index,1);
        setRequirementList(updatedREquirementList); 

    }

    return (
        <div className='requirement-field-entire-div'>
            <label className='course-information-label' htmlFor={name}>{label}<sup className='course-information-super' >*</sup></label>
            <div className='requirement-field-second-div'>
                <input type='text' id={name} value={requirement} onChange={(e)=>setRequirements(e.target.value)} className='course-information-input-tag' placeholder='Enter Course Requirements' />
                <button type='button' onClick={handleAddRequirement} className='add-requirement-button'>Add</button>
            </div>
            {
                requirementList.length > 0 && (
                    <ul className='requirement-unordered-list'>
                        {
                            requirementList.map((requirement,index)=>(
                                <li key={index} className='requirement-ordered-list'>
                                    <span>{requirement}</span>
                                    <button type='button' onClick={()=>handleRemoveRequiremnt(index)} className='clear-requirement-button'>clear</button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            {
                errors[name] &&  (
                    <span className='course-information-warning'>{label}is required</span>
                )
            }

        </div>
    )
}

export default RequiredField
