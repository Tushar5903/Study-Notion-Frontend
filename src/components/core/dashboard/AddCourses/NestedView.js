import { useDispatch, useSelector } from 'react-redux'
import './css/NestedView.css'
import React, { useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { AiFillCaretDown } from "react-icons/ai"
import ConfirmationModal from '../../../common/ConfirmationModal'
import SubSectionModal from './SubSectionModal'
import { setCourse } from '../../../../slices/CourseSlice'
import { deleteSection, deleteSubSection } from '../../../../services/operation/CourseDetails'


const NestedView = ({ handleChangeEditSectionName }) => {
    const { course } = useSelector((state) => state.course);
    console.log("NestedView course data:", course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubuSection, setEditSubSection] = useState(null);
    const [confirmationModal, setConfirmationModel] = useState(null);

    const handleDeleleSection = async (sectionId) => {
        console.log("Deleting section:", sectionId);
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token,
        })
        if (result) {
            dispatch(setCourse(result))
        }
        setConfirmationModel(null)
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ subSectionId, sectionId, token })
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setConfirmationModel(null)
    }

    return (
        <div>
            <div className='Nested-view-first-div' id="nestedViewContainer">
                {
                    course?.courseContent?.map((section) => (
                        <details key={section._id + section.sectionName} open>
                            <summary className='Nested-view-summary-contant'>
                                <div className='Nested-view-third-div'>
                                    <RxDropdownMenu className='nested-section-drop-down' />
                                    <p className='nested-view-section-name'>{section.sectionName}</p>
                                </div>

                                <div className='Nested-view-third-div'>
                                    <button
                                        onClick={() => handleChangeEditSectionName(
                                            section._id,
                                            section.sectionName
                                        )
                                        }
                                        className='Nested-button-icons'
                                    >
                                        <MdEdit className="Nested-view-edit-button" />
                                    </button>

                                    <button
                                        onClick={() =>
                                            setConfirmationModel({
                                                text1: "Delete this Section?",
                                                text2: "All the lectures in this section will be deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1handler: () => handleDeleleSection(section._id),
                                                btn2handler: () => setConfirmationModel(null),
                                            })
                                        }
                                        className='Nested-button-icons'
                                    >
                                        <RiDeleteBin6Line className="Nested-view-edit-button" />
                                    </button>
                                    <span className="nested-view-section-name">|</span>
                                    <AiFillCaretDown className="Nested-view-edit-button" />

                                </div>


                            </summary>

                            <div className='subsection-entire-div'>
                                {
                                    section?.subsection.map((data) => (
                                        <div key={data?._id} onClick={() => setViewSubSection(data)} className='Nested-view-subsection-second-div'>
                                            <div className="Nested-view-subsection-third-div">
                                                <RxDropdownMenu className="nested-section-drop-down" />
                                                <p className="nested-view-section-name">
                                                    {data.title}
                                                </p>
                                            </div>

                                            <div className='Nested-view-subsection-forth-div' onClick={(e) => e.stopPropagation()} >
                                                <button
                                                    onClick={() => { setViewSubSection(null); setEditSubSection({ ...data, sectionId: section._id }) }}
                                                className="Nested-view-edit-button-subsection"

                                                >
                                                <MdEdit className="Nested-view-edit-button-subsection-icon" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setConfirmationModel({
                                                        text1: "Delete this Sub-Section?",
                                                        text2: "This lecture will be deleted",
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                        btn1handler: () =>
                                                            handleDeleteSubSection(data._id, section._id),
                                                        btn2handler: () => setConfirmationModel(null),
                                                    })
                                                }
                                                className="Nested-view-edit-button-subsection"

                                            >
                                                <RiDeleteBin6Line className="Nested-view-edit-button-subsection-icon" />
                                            </button>
                                        </div>

                                        </div>
                            ))
                                }

                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className="Next-view-add-subsection-button"
                            >
                                <FaPlus className="plus-icon-sunsection-button" />
                                <p>Add Lecture</p>
                            </button>
                        </div>

                        </details>
            ))
                }
        </div>

            {
        addSubSection ? (
            <SubSectionModal
                modalData={addSubSection}
                setModalData={setAddSubSection}
                add={true}
            />
        ) : viewSubSection ? (
            <SubSectionModal
                modalData={viewSubSection}
                setModalData={setViewSubSection}
                view={true}
            />
        ) : editSubuSection ? (
            <SubSectionModal
                modalData={editSubuSection}
                setModalData={setEditSubSection}
                edit={true}
            />
        ) : (
            <></>
        )
    }
    {/* Confirmation Modal */ }
    {
        confirmationModal ? (
            <ConfirmationModal modalData={confirmationModal} />
        ) : (
            <></>
        )
    }

        </div >
    )
}

export default NestedView
