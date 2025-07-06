import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import './css/ViewCourses.css';
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import { getFullDetailsOfCourse } from "../services/operation/CourseDetails";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/ViewCourseSlice";

export default function ViewCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      if (courseData?.courseDetails) {
        dispatch(setCourseSectionData(courseData.courseDetails.courseContent || []));
        dispatch(setEntireCourseData(courseData.courseDetails));
        dispatch(setCompletedLectures(courseData.completedVideos || []));
        let lectures = 0;
        courseData.courseDetails.courseContent?.forEach((sec) => {
          lectures += sec.subSection?.length || 0;
        });
        dispatch(setTotalNoOfLectures(lectures));
      }
      setLoading(false);
    })();
  }, [courseId, token, dispatch]);

  if (loading) return <div className="view-course-loading">Loading course...</div>;

  return (
    <>
      <div className="view-courses-entire-div">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="view-courses-second-div">
          <div className="view-courses-third-div">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}
