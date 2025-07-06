import Template from "../components/core/auth/Template"
import LoginImg from "../assets/Images/login.webp"

const Login=({setIsLogin})=>{
    return(
        <Template
        title="Welcome back"
        desc1={
            <>
              Build skills for today, tomorrow, and beyond{" "}
              <span className="special-highlighting">Education to future-proof your career.</span>
            </>
          }
        image={LoginImg}
        formType="login"
        setIsLogin = {setIsLogin}

        />
    )
}
export default Login