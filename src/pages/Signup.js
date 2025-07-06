import Template from "../components/core/auth/Template"
import signupImg from "../assets/Images/signup.webp"

const Signup=({setIsLogin})=>{
    return(
        <Template
        title="Join the millions learning to code with StudyNotion for free"
        desc1={
            <>
              Build skills for today, tomorrow, and beyond{" "}
              <span className="special-highlighting">Education to future-proof your career.</span>
            </>
          }
        image={signupImg}
        formType="signup"
        setIsLogin = {setIsLogin} 
        />
    )
}
export default Signup