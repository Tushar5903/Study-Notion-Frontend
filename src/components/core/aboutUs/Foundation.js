import React from 'react'
import './css/Foundation.css'
import FoundationImgae from '../../../assets/Images/FoundingStory.png'

const Foundation = () => {
  return (
    <div className='Foundation-entire-div'>
        <div className='foudation-first-div'>
            <h1 className='foundation-heading'> <span className='red-highlighting'>Our Founding Story</span></h1>
            <p  className='foundation-para'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
            <p className='foundation-second-para'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential. </p>
        </div>
        <div className='foundation-image'>
            <img src={FoundationImgae} alt='foundation-image'></img>
        </div>
      
    </div>
  )
}

export default Foundation
