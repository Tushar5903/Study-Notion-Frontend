import React from 'react'
import './css/AboutUs.css'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import Foundation from '../components/core/aboutUs/Foundation'
import OurSection from '../components/core/aboutUs/OurSection'
import LearningGrid from '../components/core/aboutUs/LearningGrid'
import AboutContact from '../components/core/aboutUs/AboutContact'
import ReviewSlider from '../components/common/ReviewSlider'
import Footer from '../components/common/Footer'

const AboutUs = () => {
    return (
        <div>
            <section className='section-1-about-page'>
                <div className='section-1-first-div'>
                    <div className='section-1-second-div'>
                        <h1 className='section-1-about-heading'>Driving Innovation in Online Education for a <span className='blue-highlighting'>Brighter Future</span> </h1>
                        <p className='section-1-about-para'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                    </div>
                    <div className='for-spacing-only'>

                    </div>
                    <div className='section-1-about-image-section'>
                        <img src={BannerImage1} alt='banner1'></img>
                        <img src={BannerImage2} alt='banner2'></img>
                        <img src={BannerImage3} alt='banner3'></img>

                    </div>
                </div>
            </section>

            <section className='section-2-about-page'>
                <div className='section-2-first-div'>
                    <h1 className='section-2-about-heading'>We are passionate about revolutionizing the way we learn. Our innovative platform <span className='blue-highlighting'>combines technology</span>,<span className='orange-highlighting'> expertise</span>, and community to create an <span className='yellow-highlighting'> unparalleled educational experience.</span></h1>
                </div>

            </section>

            <section className='section-3-about-page'>
                <div className='section-3-first-para'>
                    <Foundation />
                    <OurSection />

                </div>

            </section>

            <section className='section-4-about-page'>
                <div className='section-4-first-div'>
                    <div className='section-4-parts'>
                        <h1 className='section-4-heading'>5K</h1>
                        <p className='section-4-para'>Active Students</p>
                    </div>
                    <div className='section-4-parts'>
                        <h1 className='section-4-heading'>10+</h1>
                        <p className='section-4-para'>Mentors</p>
                    </div>
                    <div className='section-4-parts'>
                        <h1 className='section-4-heading'>200+</h1>
                        <p className='section-4-para'>Courses</p>
                    </div>
                    <div className='section-4-parts'>
                        <h1 className='section-4-heading'>50+</h1>
                        <p className='section-4-para'>Awards</p>
                    </div>
                </div>
            </section>

            <section className='section-5-about-page'>
                <LearningGrid />
            </section>

            <div className='section-three-starting-div'>
                    <h2 className='Section-three-first-heading'>Reviews from other learners</h2>
                    <div className='section-three-second-div'><ReviewSlider/></div>
            </div>

            <section className='section-6-about-page'>
                <div className='section-6-about-page-first-div'>
                    <h1 className='about-contact-heading'>Get in Touch</h1>
                    <p className='about-contact-para'>We'd love to here for you, Please fill out this form.</p>
                    <AboutContact />
                </div>
            </section>

        <Footer/>

        </div>
    )
}

export default AboutUs
