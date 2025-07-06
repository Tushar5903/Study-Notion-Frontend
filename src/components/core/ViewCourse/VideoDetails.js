import React, { useEffect, useRef, useState } from "react";
import "./css/VideoDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { markLectureAsComplete } from "../../../services/operation/CourseDetails";
import { updateCompletedLectures } from "../../../slices/ViewCourseSlice";
import Iconsbtn from "../../common/Iconsbtn";
import { toast } from "react-hot-toast";

const VideoDetails = () => {
  const { courseId, sectionId, subsectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } = useSelector(
    (state) => state.viewCourse
  );

  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      !courseSectionData ||
      courseSectionData.length === 0 ||
      !courseId ||
      !sectionId ||
      !subsectionId
    ) return;

    const section = courseSectionData.find((s) => s._id === sectionId);
    if (!section) return;

    const subSection = section.subsection.find((ss) => ss._id === subsectionId);
    if (!subSection) return;

    setVideoData(subSection);
    setPreviewSource(courseEntireData?.thumbnail || "");
    setVideoEnded(false);
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const sectionIdx = courseSectionData.findIndex((s) => s._id === sectionId);
    const subSectionIdx = courseSectionData[sectionIdx]?.subsection.findIndex(
      (ss) => ss._id === subsectionId
    );
    return sectionIdx === 0 && subSectionIdx === 0;
  };

  const isLastVideo = () => {
    const sectionIdx = courseSectionData.findIndex((s) => s._id === sectionId);
    const subSections = courseSectionData[sectionIdx]?.subsection || [];
    const subSectionIdx = subSections.findIndex((ss) => ss._id === subsectionId);
    return (
      sectionIdx === courseSectionData.length - 1 &&
      subSectionIdx === subSections.length - 1
    );
  };

  const goToNextVideo = () => {
    const sectionIdx = courseSectionData.findIndex((s) => s._id === sectionId);
    const subSections = courseSectionData[sectionIdx].subsection;
    const subSectionIdx = subSections.findIndex((ss) => ss._id === subsectionId);

    if (subSectionIdx < subSections.length - 1) {
      const nextSubSectionId = subSections[subSectionIdx + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    } else if (sectionIdx < courseSectionData.length - 1) {
      const nextSection = courseSectionData[sectionIdx + 1];
      const nextSectionId = nextSection._id;
      const nextSubSectionId = nextSection.subsection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
    }
  };

  const goToPrevVideo = () => {
    const sectionIdx = courseSectionData.findIndex((s) => s._id === sectionId);
    const subSections = courseSectionData[sectionIdx].subsection;
    const subSectionIdx = subSections.findIndex((ss) => ss._id === subsectionId);

    if (subSectionIdx > 0) {
      const prevSubSectionId = subSections[subSectionIdx - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    } else if (sectionIdx > 0) {
      const prevSection = courseSectionData[sectionIdx - 1];
      const prevSectionId = prevSection._id;
      const prevSubSectionList = prevSection.subsection;
      const prevSubSectionId = prevSubSectionList[prevSubSectionList.length - 1]._id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    // const res = await markLectureAsComplete({ courseId, subsectionId }, token);
    // if (res) {
    //   dispatch(updateCompletedLectures(subsectionId));
      if (isLastVideo()) {
        toast.success("🎉 Congratulations! You've completed the course.");
        localStorage.setItem(`course-completed-${courseId}`, "true");
        setTimeout(() => {
          navigate("/dashboard/enrolled-courses");
        }, 1000);
      } else {
        toast.success("Marked as completed!");
      }
    setLoading(false);
  };


  return (
    <div className="video-details-entire-div">
      <ReactPlayer
        ref={playerRef}
        url={videoData?.videoUrl}
        controls
        width="72%"
        height="80%"
        onEnded={() => setVideoEnded(true)}
        className="video-details-video"
      />

      {videoEnded && (
        <div className="video-details-first-div">
          <div className="video-details-first-button-div">
            {!completedLectures.includes(subsectionId) && (
              <Iconsbtn
                disabled={loading}
                onClick={handleLectureCompletion}
                text={!loading ? "Mark As Completed" : "Loading..."}
                customClasses="video-details-first-iconbtn"
              />
            )}

            <Iconsbtn
              disabled={loading}
              onClick={() => {
                if (playerRef.current) {
                  playerRef.current.seekTo(0);
                  setVideoEnded(false);
                }
              }}
              text="Rewatch"
              customClasses="video-details-first-iconbtn"
            />
          </div>

          <div className="video-details-second-div">
            {!isFirstVideo() && (
              <button
                disabled={loading}
                onClick={goToPrevVideo}
                className="video-details-first-button"
              >
                Prev
              </button>
            )}
            {!isLastVideo() && (
              <button
                disabled={loading}
                onClick={goToNextVideo}
                className="video-details-first-button"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}

      <div className="video-details-last-div">
        <h1 className="video-details-first-heading">{videoData?.title}</h1>
        <p className="video-details-first-para">{videoData?.description}</p>
      </div>
    </div>
  );
};

export default VideoDetails;
