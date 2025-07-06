import React from 'react'
import { TypeAnimation } from "react-type-animation"
import CTAButton from './Button'
import { FaArrowRight } from "react-icons/fa";
import './CodeBlocks.css'
import { useEffect, useState } from 'react';

const CodeBlocks = ({ codeblock, codeColor, heading, subheading, ctabtn1, ctabtn2, position }) => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (

    <div className='entire-codeblocks-div' style={{display: 'flex',flexDirection: isMobile ? 'column' : position}}>
      <div className='dataBlock-second-div'>
        {heading}
        <div className='subheading-div'>
          {subheading}
        </div>
        <div className='buttons'>
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto} >
            <div className='active-button'>
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto} >

            {ctabtn2.btnText}

          </CTAButton>


        </div>
      </div>


      <div className='first-div' style={{ border: ` 1px solid ${codeColor}` }}>
        <div className='indexing-div'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div className='animation-div' style={{ color: `${codeColor}` }}>
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks
