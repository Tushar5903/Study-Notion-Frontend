import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/common/Navbar";
import OpenRoute from './components/core/auth/openRoute';
import ForgetPassword from "./pages/ForgetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import MyProfile from './components/core/dashboard/MyProfile'
import PrivateRoute from "./components/core/auth/privateRoute";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import { useState, useEffect } from "react";
import Setting from "./components/core/dashboard/Setting";
import { useDispatch, useSelector } from "react-redux";
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses";
import Cart from "./components/core/dashboard/Cart";
import { setUser,setToken } from "./slices/profileSlice";
import AddCourse from "./components/core/dashboard/AddCourses";
import MyCourses from "./components/core/dashboard/MyCourses";
import EditCourse from "./components/core/dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetail from "./pages/CourseDetail";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import ViewCourse from "./pages/ViewCourses";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    dispatch(setUser(JSON.parse(savedUser)));
  }

  


 useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      dispatch(setUser(JSON.parse(user)));
      dispatch(setToken(JSON.parse(token)));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/catalog/:catalogName" element={<Catalog />}></Route>
        <Route path="courses/:courseId" element={<CourseDetail/>} />
        <Route path="/Signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        }></Route>


        <Route path="/Login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        }></Route>


        <Route path="/forget-password" element={
          <OpenRoute>
            <ForgetPassword />
          </OpenRoute>
        }></Route>


        <Route path="/update-password/:id" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        }></Route>


        <Route path="/verify-email" element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        }></Route>


        <Route path="/about" element={
          <AboutUs />
        }></Route>


        <Route path="/contact" element={
          <ContactUs />
        }></Route>

        <Route element={
          <PrivateRoute>
            <Dashboard setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
          </PrivateRoute>
        } >
          <Route path="dashboard/my-profile" element={<MyProfile />}></Route>
          <Route path="dashboard/setting" element={<Setting />} ></Route>
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} ></Route>
          <Route path="dashboard/cart" element={<Cart />} ></Route>
          <Route path="dashboard/add-course" element={<AddCourse />} ></Route>
          <Route path="dashboard/my-courses" element={<MyCourses />} ></Route>
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} ></Route>
          
          
        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>
        <Route path="view-course/:courseId/section/:sectionId/sub-section/:subsectionId"element={<VideoDetails />}/>
        </Route>



        <Route path="*" element={<Error />}></Route>

      </Routes>


    </div>
  );
}

export default App;
