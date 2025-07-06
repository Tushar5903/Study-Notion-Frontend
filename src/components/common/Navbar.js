import React, { useEffect, useState } from 'react'
import './css/Navbar.css'
import { BiSolidDownArrow } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useSelector } from 'react-redux'
import { Link, matchPath, useLocation } from "react-router-dom"

import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from '../../services/apiConnector'
import { categories } from "../../services/api"
import Spinner from './Spinner'
import ProfileDropdown from "../core/navbar/ProfileDropdown";

const Navbar = ({ menuOpen, setMenuOpen }) => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isMobileCatalogOpen, setIsMobileCatalogOpen] = useState(false);


    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API)
                setSubLinks(res.data.allShowCategory)
            } catch (error) {
                console.log("Could not fetch Categories.", error)
            }
            setLoading(false)
        })()
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 775) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className='Navbar-firt-div'>
            <div className='Navbar-second-div'>
                <Link to="/" >
                    <img src={Logo} alt='Logo Img' className='navbar-logo-img' loading='lazy' />
                </Link>

                {/* Hamburger for small screens */}
                <div className='hamburger-icon' >
                    {menuOpen ? <IoMdClose size={24} color="white" onClick={() => setMenuOpen(false)} /> : <GiHamburgerMenu size={24} color="white" onClick={() => setMenuOpen(true)} />}
                </div>

                {/* Desktop Menu */}
                <nav className='Navbar-first-nav'>
                    <ul className='Unordered-list'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index} className='Navbar-list'>
                                    {
                                        link.title === "Catalog" ? (
                                            <>
                                                <div className={`catalog-entire-div ${matchRoute("/catalog/:catalogName") ? "Navlink-yellow-para" : "Navlink-white-para"}`}>
                                                    <p>{link.title}</p>
                                                    <BiSolidDownArrow />
                                                    <div className='catalog-first-div'>
                                                        {
                                                            loading ? (<Spinner />) :

                                                                (subLinks && subLinks.length) ? (
                                                                    <>
                                                                        {subLinks
                                                                            // ?.filter(
                                                                            //     (subLink) => subLink?.course?.length > 0
                                                                            // )
                                                                            ?.map((subLink, i) => (
                                                                                <Link
                                                                                    to={`/catalog/${subLink.name
                                                                                        .split(" ")
                                                                                        .join("-")
                                                                                        .toLowerCase()}`}
                                                                                    className="catalog-second-div"
                                                                                    key={i}
                                                                                >
                                                                                    <p>{subLink.name}</p>
                                                                                </Link>
                                                                            ))
                                                                        }
                                                                    </>
                                                                ) : (<div><p>No Courses Found</p></div>)
                                                        }


                                                    </div>
                                                    <div className='catalog-diamond-div' />
                                                </div>
                                            </>

                                        ) :
                                            <Link to={link?.path}>
                                                <p className={`Navlink-para ${matchRoute(link?.path) ? "Navlink-yellow-para" : "Navlink-white-para"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <div className='Navbar-buttons-div'>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to='/dashboard/cart'>
                                <FaShoppingCart className='cart-profile-icon' />
                                {
                                    totalItems > 0 && (
                                        <span>{totalItems}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <>
                                <Link to='/login'>
                                    <button className='login-button'>Log In</button>
                                </Link>
                                <Link to='/signup'>
                                    <button className='signup-button'>Sign Up</button>
                                </Link>
                            </>
                        )
                    }
                    {
                        token !== null && <ProfileDropdown />
                    }
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {
                menuOpen && (
                    <div className='mobile-dropdown'>
                        <ul className='mobile-menu-list'>
                            {
                                NavbarLinks.map((link, index) => (
                                    <li key={index} className='Navbar-list' >
                                        {
                                            link.title === "Catalog" ? (
                                                <div className={`catalog-mobile-details ${matchRoute("/catalog/:catalogName") ? "Navlink-yellow-para" : "Navlink-white-para"}`}>
                                                    <div className='catalog-mobile-inside-details' onClick={() => setIsMobileCatalogOpen(prev => !prev)}>
                                                        <p>{link.title}</p>
                                                        <BiSolidDownArrow />
                                                    </div>
                                                    {isMobileCatalogOpen && (
                                                        <div className='mobile-submenu'>
                                                             {
                                                            loading ? (<Spinner />) :

                                                                (subLinks && subLinks.length) ? (
                                                                    <>
                                                                        {subLinks
                                                                            // ?.filter(
                                                                            //     (subLink) => subLink?.courses?.length > 0
                                                                            // )
                                                                            ?.map((subLink, i) => (
                                                                                <Link
                                                                                    to={`/catalog/${subLink.name
                                                                                        .split(" ")
                                                                                        .join("-")
                                                                                        .toLowerCase()}`}
                                                                                    className="catalog-mobile-div"
                                                                                    key={i}
                                                                                >
                                                                                    <p>{subLink.name}</p>
                                                                                </Link>
                                                                            ))
                                                                        }
                                                                    </>
                                                                ) : (<div><p>No Courses Found</p></div>)
                                                        }
                                                        </div>
                                                    )}
                                                    <div className='catalog-diamond-div' />
                                                </div>
                                            ) :
                                                <Link to={link?.path}>
                                                    <p className={`mobile-link ${matchRoute(link?.path) ? "Navlink-yellow-para" : "Navlink-white-para"}`} onClick={() => setMenuOpen(false)}>
                                                        {link.title}
                                                    </p>
                                                </Link>
                                        }
                                    </li>
                                ))
                            }

                            {/* Cart and Auth Buttons */}
                            {
                                user && user?.accountType !== "Instructor" && (
                                    <Link to='/dashboard/cart' className='mobile-cart' onClick={() => setMenuOpen(false)}>
                                        <FaShoppingCart />
                                        {totalItems > 0 && <span>{totalItems}</span>}
                                    </Link>
                                )
                            }
                            {
                                token === null ? (
                                    <>
                                        <Link to='/login' className='mobile-link-buttons' onClick={() => setMenuOpen(false)}>Log In</Link>
                                        <Link to='/signup' className='mobile-link-buttons' onClick={() => setMenuOpen(false)}>Sign Up</Link>
                                    </>
                                ) : (
                                    <ProfileDropdown setMenuOpen={setMenuOpen} />
                                )
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default Navbar
