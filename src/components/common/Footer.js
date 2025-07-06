import React from 'react'
import './css/Footer.css'
import { FooterLink2 } from '../../data/footer-links'
import { Link } from "react-router-dom";
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = ["Articles", "Blog", "Chart Sheet", "Code challenges", "Docs", "Projects", "Videos", "Workspaces",];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];



const Footer = () => {
  return (
    <div className='footer-first-div'>
      <div className='footer-second-div'>
        <div className='footer-third-div'>
          {/* Section 1 */}
          <div className='footer-section1-first-div'>
            <div className='footer-section1-second-div'>
              <img src={Logo} alt='Company Logo' className='footer-logo-image' />
              <h1 className='footer-section1-first-heading'>Company</h1>

              <div className='footer-section1-third-div'>
                {
                  ["About", "Careers", "Affiliates"].map((element, index) => {
                    return (
                      <div key={index} className='footer-section1-forth-div'>
                        <Link to={element.toLowerCase()}>
                          {element}
                        </Link>
                      </div>
                    );
                  })
                }
              </div>
              <div className='footer-section1-fifth-div' >
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            <div className='footer-section1-fifth-div'>
              <h1 className='footer-section1-second-heading'>Resources</h1>

              <div className='footer-section1-sixth-div'>
                {
                  Resources.map((element, index) => {
                    return (
                      <div key={index} className='footer-section1-seventh-div'>
                        <Link to={element.split(" ").join("-").toLowerCase()}>
                          {element}
                        </Link>
                      </div>
                    );
                  })
                }
              </div>

              <h1 className='footer-section1-third-heading'>Support</h1>
              <div className='footer-section1-eight-div'>
                <Link to={"#"}>Help Center</Link>
              </div>
            </div>

            <div className='footer-section1-ninth-div'>
              <h1 className='footer-section1-forth-heading'>
                Plans
              </h1>

              <div className='footer-section1-tenth-div'>
                {
                  Plans.map((element, index) => {
                    return (
                      <div key={index} className='footer-section1-eleventh-div'>
                        <Link to={element.split(" ").join("-").toLowerCase()}>
                          {element}
                        </Link>
                      </div>
                    );
                  })
                }
              </div>

              <h1 className='footer-section1-fifth-heading'>Community</h1>
              <div className='footer-section1-tweleth-div'>
                {
                  Community.map((element,index)=>{
                    return(
                      <div key={index} className='footer-section1-thirteenth-div'>
                        <Link to={element.split(" ").join("-").toLowerCase()} >
                        {element}
                        </Link>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>

          {/* Section-2 */}

          <div className='footer-section2-first-div'>
            {
              FooterLink2.map((element,index)=>{
                return(
                  <div key={index} className='footer-section2-second-div'>
                    <h1 className='footer-section2-first-heading'>{element.title}</h1>
                    <div className='footer-section2-third-div'>
                      {element.links.map((link,index)=>{
                        return (
                        <div key={index} className='footer-section2-forth-div'>
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                      })}
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>

      <div className="footer-section2-fifth-div">
        {/* Section 3 */}
        <div className="footer-section3-first-div">
          <div className="footer-section3-second-div">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i ? "footer-section3-third-div-part-one": "footer-section3-third-div-part-two"} footer-section3-third-div `} >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="footer-section3-forth-div">Made with ❤️ © 2025 Study Notion</div>
        </div>
      </div>

    </div>
  )
}

export default Footer