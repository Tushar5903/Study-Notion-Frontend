import React, { useState } from 'react'
import { HomePageExplore } from "../../../data/homepage-explore"
import './ExploreMore.css'
import { MdPeople } from "react-icons/md";
import { ImTree } from "react-icons/im";

const tabName = [
    "Free",
    "New To Coding",
    "Most Popular",
    "Skills Paths",
    "carrer Paths"
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
    return (
        <div className='Expolre-section-first-div'>
            <div className='Expolre-section-heading'>
                Unlock the  <span className='highlighting'>Power of Code</span>
            </div>
            <div className='Explore-section-para'>
                Learn to Build Anything You Can Imagine
            </div>

            <div className='explore-selecton-buttons'>
                {
                    tabName.map((element, index) => {
                        return (
                            <div className={`explore-selection-tab ${currentTab === element ? "explore-active" : "explore-inactive"}`} key={index} onClick={() => setMyCards(element)}>
                                {element}
                            </div>
                        )
                    })
                }

            </div>

            <div className='for-spacing-only'>

            </div>
            <div className='Explore-section-tab-boxes'>
                {
                    courses.map((element, index) => {
                        return (
                            <div className={`explore-tab-entire-div ${currentCard === element?.heading ? "explore-tab-active" : "explore-tab-iniactive"}`} onClick={() => setCurrentCard(element?.heading)} key={index}>
                                <div className='explore-tab-heading'>
                                    {element.heading}
                                </div>
                                <div className='explore-tab-description'>
                                    {element.description}
                                </div>
                                <div className='explore-tab-icons'>
                                    <div className='explore-tab-left'>
                                        <div>
                                            <MdPeople />
                                        </div>
                                        <div>
                                            {element.level}
                                        </div>
                                    </div>
                                    <div className='explore-tab-right'>
                                        <div>
                                            <ImTree />
                                        </div>
                                        <div>
                                            {element.lessionNumber} Lessons
                                        </div>
                                    </div>
                                </div>
                            </div>


                        )
                    })
                }

            </div>
        </div>
    )
}

export default ExploreMore
