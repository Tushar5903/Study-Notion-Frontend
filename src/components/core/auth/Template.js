import react from "react";
import Signinform from "./Signinform";
import Loginform from "./Loginform";
import Frame from "../../../assets/Images/frame.png"
import './css/Template.css'

const Template = ({ title, desc1, image, formType, setIsLogin }) => {
    return (
        <div className="entire-template">
            <div className="template_starting">
                <div className="form_div">
                    <h1 className="form_heading">{title}</h1>
                    <p className="template_description_starting">
                        <span className="form_description_1">{desc1}</span>
                    </p>
                    {formType === "signup" ? <Signinform setIsLogin={setIsLogin} /> : <Loginform setIsLogin={setIsLogin} />}
                </div>

                <div className="image_positoning">
                    <img src={Frame} alt="Pattern" width={458} height={404} loading="lazy" className="pattern_img"></img>
                    <img src={image} alt="Contant" className="form_images" width={458} height={390} loading="lazy"></img>
                </div>
            </div>
        </div>
    )

}

export default Template