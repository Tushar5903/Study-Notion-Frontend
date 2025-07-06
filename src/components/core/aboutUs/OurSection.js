import React from 'react'
import './css/OurSection.css'

const OurSection = () => {
  return (
    <div className='our-section-entire-div'>
        <div className='our-section-first-div'>
            <div className='our-section-two-div'>
                <h1 className='our-section-heading'><span className='orange-highlighting'>Our Vision</span></h1>
                <p className='our-section-para'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>

            </div>
            <div className='our-section-third-div'>
                <h1 className='our-section-heading'><span className='blue-highlighting'>Our Mission</span></h1>
                <p className='our-section-para'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>

            </div>
        </div>
      
    </div>
  )
}

export default OurSection
