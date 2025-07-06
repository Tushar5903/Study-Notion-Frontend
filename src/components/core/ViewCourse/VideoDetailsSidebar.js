import React, { useEffect, useState } from 'react'
import './css/VideoDetailsSidebar.css'
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Iconsbtn from '../../common/Iconsbtn'
import { AiOutlineDown } from "react-icons/ai"

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState(false)
  const [videoBarActive, setVideoBarActive] = useState("")
  const [showSidebar, setShowSidebar] = useState(window.innerWidth >= 800)
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()

  const { courseSectionData, courseEntireData, totalNoOfLectures, completedLectures } = useSelector(
    (state) => state.viewCourse
  )

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setShowSidebar(false)
      } else {
        setShowSidebar(true)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!courseSectionData.length) return

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndx = courseSectionData?.[currentSectionIndx]?.subsection.findIndex(
      (data) => data._id === subSectionId
    )

    const activeSubSectionId =
      courseSectionData[currentSectionIndx]?.subsection?.[currentSubSectionIndx]?._id

    setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
    setVideoBarActive(activeSubSectionId)
  }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <>
      {/* Sidebar Toggle Button for Mobile */}
      {!showSidebar && (
        <div
          className="sidebar-show-button"
          onClick={() => setShowSidebar(true)}
          title="Show Sidebar"
        >
          <IoIosArrowForward size={24} />
        </div>
      )}

      <div
        className={`video-details-side-bar-first-div ${showSidebar ? 'show' : 'hide'}`}
      >
        <div className='video-details-side-bar-second-div'>
          <div className='video-details-side-bar-third-div'>
            {/* Back Button */}
            <div
              className='video-details-side-bar-forth-div'
              onClick={() => {
                if (window.innerWidth < 800) {
                  setShowSidebar(false)
                } else {
                  navigate(`/dashboard/enrolled-courses`)
                }
              }}
              title='Back'
            >
              <IoIosArrowBack size={30} />
            </div>

            <Iconsbtn
              text="Add Review"
              onClick={() => setReviewModal(true)}
              customClasses="video-details-side-bar-first-custom-class"
            />
          </div>

          <div className='video-details-side-bar-fifth-div'>
            <p className='video-details-side-bar-first-para'>{courseEntireData?.courseName}</p>
          </div>
        </div>

        <div className='video-details-side-bar-sixth-div'>
          {courseSectionData.map((section, index) => (
            <div
              onClick={() => setActiveStatus(section?._id)}
              key={index}
              className='video-details-side-bar-seventh-div'
            >
              <div className='video-details-side-bar-eight-div'>
                <div className='video-details-side-bar-ninth-div'>{section?.sectionName}</div>
                <div className='video-details-side-bar-tenth-div'>
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveStatus(
                        activeStatus === section?._id ? null : section?._id
                      )
                    }}
                    className='video-details-side-bar-eleventh-div'
                  >
                    <span
                      className={`video-details-side-bar-first-span ${activeStatus === section?._id
                        ? "video-details-side-bar-part-one"
                        : "video-details-side-bar-part-two"
                        }`}
                    >
                      <AiOutlineDown />
                    </span>
                  </div>
                </div>
              </div>

              {activeStatus === section?._id && (
                <div className="video-details-side-bar-twelth-div">
                  {section.subsection.map((topic, i) => (
                    <div
                      className={`video-details-side-bar-thirteen-div ${videoBarActive === topic._id
                        ? "video-details-side-bar-thirteen-div-part-one"
                        : "video-details-side-bar-thirteen-div-part-one"
                        } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                    >
                      
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default VideoDetailsSidebar
