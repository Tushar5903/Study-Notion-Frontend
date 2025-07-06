const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showCategory",
}

export const catalogData ={
  CATALOGPAGEDATA_API: BASE_URL + "/course/categoryPageDetails"
}

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendOTP",
  SIGNUP_API: BASE_URL + "/auth/Signup",
  LOGIN_API: BASE_URL + "/auth/Login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/ResetpasswordToken",
  RESETPASSWORD_API: BASE_URL + "/auth/ResetPassword",
}

export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/ProfileUpdate",
  DELETE_PROFILE_API: BASE_URL + "/profile/ProfileDelete"
}

export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}

export const courseEndpoints = {
  COURSE_CATEGORIES_API: BASE_URL + "/course/showCategory",
  EDIT_COURSE_API: BASE_URL + "/course/updateCourse",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/createSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/subSectionCreation",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updatingSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getAllCoursesDetails",
  GET_ALL_COURSE_API: BASE_URL + "/course/showAllCourses",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/CreateRating",
}

export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  DIRECT_ENROLLED_API: BASE_URL + "/course/enroll-direct"
}

export const ratingEndPoints = {
  REVIEWS_DETAILS_API : BASE_URL + "/course/getAllRating"
}