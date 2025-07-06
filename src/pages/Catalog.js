import React, { useEffect, useState } from 'react'
import './css/Catalog.css'
import { useParams } from "react-router-dom"
import { apiConnector } from '../services/apiConnector'
import { categories } from '../services/api'
import CourseSlider from '../components/common/CourseSlider'
import { getCatalogaPageData } from '../services/operation/PageAndComponentData'
import Course_card from '../components/common/Course_card'
import Footer from '../components/common/Footer'

const Catalog = () => {

  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [catagoryId, setCatagoryId] = useState("");
  const [active, setActive] = useState(1)

  useEffect(() => {
    const getCategoryDetails = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API)
      const category_id = res?.data?.allShowCategory?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
      setCatagoryId(category_id);
    }
    getCategoryDetails();
  }, [catalogName])


  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogaPageData(catagoryId);
        console.log("Printing res: ", res);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error)
      }

    }
    if (catagoryId) {
      getCategoryDetails();
    }


  }, [catagoryId])



  return (
    <div>
      <div className='catalog-hero-section-start'>
        <div className='catalog-hero-second-div'>
          <p className='catalog-hero-para'>{`Home / Catalog / `}
            <span className='catalog-hero-yellow'>
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className='catalog-hero-second-para'>{catalogPageData?.data?.selectedCategory?.name}</p>
          <p className='catalog-hero-third-para'>{catalogPageData?.data?.selectedCategory?.description}</p>
        </div>
      </div>

      <div className='catalog-background-maintaing'>
        <div className='catalog-entire-sections-div'>

          {/* Section :1 */}
          <div className='catalog-section-1-first-div'>Courses to get you started</div>
          <div >
            <div className='catalog-section-1-second-div'>
              <p className={`catalog-section-para ${active === 1 ? "yellow-catalog" : "black-catalog"}`} onClick={() => setActive(1)}>Most Popular</p>
              <p className={`catalog-section-para ${active === 2 ? "yellow-catalog" : "black-catalog"}`} onClick={() => setActive(2)}>New</p>
            </div>
            <CourseSlider course={catalogPageData?.data?.selectedCategory?.course} />
          </div>

          {/* Section :2 */}
          <div className='catalog-section-2-entire-div'>
            <div className='catalog-section-2-second-div'>Top Courses in </div>
            <div>
              <CourseSlider course={catalogPageData?.data?.selectedCategory?.course} />
            </div>
          </div>


          {/* Section 3 */}

          <div className='catalog-section-3-entire-div'>
            <div className='catalog-section-2-second-div'>Frequently Bought Together</div>
            <div className='catalog-section-3-third-div'>
              <div className='catalog-section-3-forth-div'>
                {
                  catalogPageData?.data?.mostSellingCourses
                    ?.slice(0, 4)
                    .map((course, i) => (
                      <Course_card course={course} key={i} Height={"height: 400px;"} />
                    )

                    )
                }

              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Catalog
