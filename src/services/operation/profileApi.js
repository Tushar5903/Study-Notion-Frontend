import { apiConnector } from "../apiConnector";
import { setUser } from "../../slices/profileSlice";
import { toast } from "react-hot-toast"
import { profileEndpoints } from "../api";


const BASE_URL = process.env.REACT_APP_BASE_URL
const {GET_USER_ENROLLED_COURSES_API,GET_INSTRUCTOR_DATA_API} = profileEndpoints

export const getUserDetails = (token) => async (dispatch) => {
  try {
    const response = await apiConnector("GET", `${BASE_URL}/profile/getAllUserDetails`, null, {
      Authorization: `Bearer ${token}`,
    });

    const userData = response?.data?.getUserDetail;
    if (userData) {
    
      dispatch(setUser(userData));
      localStorage.setItem("user", JSON.stringify(userData));
    }
  } catch (error) {
    console.log("GET_USER_DETAILS ERROR:", error);
    toast.error("Could Not Get User Details")
  }
};


export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    console.log("GET_USER_ENROLLED_COURSES_API API RESPONSE............",response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}



export async function getInstructorData(token) {
  // const toastId = toast.loading("Loading...");
  let result = [];
  try{
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, 
    {
      Authorization: `Bearer ${token}`,
    })

    console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.courses

  }
  catch(error) {
    console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data")
  }
  // toast.dismiss(toastId);
  return result;
}