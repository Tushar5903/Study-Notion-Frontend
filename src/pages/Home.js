import React from 'react';
import './css/Homes.css';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import DTAButton from "../components/core/homepage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/homepage/CodeBlocks"
import TimeLineSection from "../components/core/homepage/TimeLineSection"
import LearnigCodingSection from "../components/core/homepage/LearnigCodingSection"
import InstructorSection from "../components/core/homepage/InstructorSection"
import ExploreMore from "../components/core/homepage/ExploreMore"
import ReviewSlider from '../components/common/ReviewSlider'
import Footer from '../components/common/Footer';


const Home = () => {
    return (
        <div>
            <div className='home-entire-div'>
                {/* Section 1 designing */}
                <div className='section1-div'>
                    <Link to={"/Signup"}>
                        <div className='section1-first-link-div'>
                            <div className='instructor-button'>
                                <p>Become an Instructor</p>
                                <FaArrowRight />
                            </div>
                        </div>
                    </Link>

                    <div className='section-1-heading'>
                        Empower Your Future with <span className='highlighting'>Coding Skills</span>
                    </div>
                    <div className='section-1-para'>
                        with our online coding courses, you can learn at your own place, from anywhere in the world, and get access to a wealth of resources, including hand-on projects, quizzes and personalized feedback from instructors
                    </div>

                    <div className='section-1-buttons'>
                        <DTAButton active={true} linkto={"/Signup"}>
                            Learn More
                        </DTAButton>
                        <DTAButton active={false} linkto={"/Signup"}>
                            Book a Demo
                        </DTAButton>
                    </div>

                    <div className='video-section'>
                        <video autoPlay muted loop className='video-class'>
                            <source src={Banner} />
                        </video>

                    </div>

                    <div className='double-content-section-1' >
                        <CodeBlocks
                            position="row"
                            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                            codeColor="yellow"
                            heading={<div className='datablock-heading'>Unlock your <span className='highlighting'>coding potential</span> with our online courses.</div>}
                            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                            ctabtn1={{ btnText: "Try it Yourself", active: true, linkto: "/Signup" }}
                            ctabtn2={{ btnText: "Learn More", active: false, linkto: "/Signup" }}

                        />
                    </div>
                    <div className='double-content-section-1' >
                        <CodeBlocks
                            position="row-reverse"
                            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                            codeColor="#0F7A9D"
                            heading={<div className='datablock-heading'>Start <span className='highlighting'>coding in seconds.</span> </div>}
                            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                            ctabtn1={{ btnText: "Continue Learning", active: true, linkto: "/Signup" }}
                            ctabtn2={{ btnText: "Learn More", active: false, linkto: "/Signup" }}

                        />
                    </div>

                    <ExploreMore />
                </div>


                {/* Section 2 Starts from their */}

                <div className='Section-two-starting-div'>
                    <div className='background-image-section'>
                        <div className='image-content-section'>
                            <div className='button-section'>
                                <DTAButton active={true} linkto={"/Signup"}>
                                    <div className='active-button'>
                                        Explore Full Catalog
                                        <FaArrowRight />
                                    </div>
                                </DTAButton >
                                <DTAButton active={false} linkto={"/Signup"}>
                                    Learn More
                                </DTAButton>
                            </div>

                        </div>



                    </div>

                    <div className='white-second-section'>
                        <div className='part-one'>
                            <div className='first-part-one'>
                                Get the skills you need for a <span className='highlighting'> job that is in demand.</span>
                            </div>
                            <div className='second-part-one'>
                                <div className='heading-second-part-one'>
                                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                                </div>
                                <div className='button-second-part-one'>
                                    <DTAButton active={true} linkto={"/signup"}> Learn More</DTAButton>
                                </div>
                            </div>
                        </div>

                        <TimeLineSection />
                        <LearnigCodingSection />

                    </div>
                </div>

                {/* section 3 start from their */}

                <div className='section-three-starting-div'>
                    <InstructorSection />
                    <h2 className='Section-three-first-heading'>Reviews from other learners</h2>
                    <div className='section-three-second-div'><ReviewSlider /></div>
                </div>

            </div>

            <Footer/>
        </div>
    )
}

export default Home
