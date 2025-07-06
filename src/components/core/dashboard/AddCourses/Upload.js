import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { IoCloudUploadOutline } from "react-icons/io5";
import './css/Upload.css'


const Upload = ({ title, name, label, register, errors, setValue, getValues, viewData, editData }) => {
    const [image, setImage] = useState(null);
    const { editCourse, course } = useSelector((state) => state.course);

    useEffect(() => {
        if (editData) {
            setImage(editData);
        } else if (viewData) {
            setImage(viewData);
        }
    }, [])

    const handleOnChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue(name, file);
            const fileType = file.type;
            const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
            const validVideoTypes = ["video/mp4", "video/webm", "video/mov", "video/avi"];

            if (validImageTypes.includes(fileType) || validVideoTypes.includes(fileType)) {
                const reader = new FileReader();

                reader.onloadend = () => {
                    setImage(reader.result);
                };

                reader.readAsDataURL(file);
            } else {
                console.log("Unsupported file type. Please select an image or video.");
            }
        } else {
            console.log("No File is Selected");
        }
    };
    return (
        <div className='upload-image-entire-div'>
            {image ? (
                <div className='upload-image-first-div'>
                    <>
                        {
                            image?.startsWith("data:image") || /\.(jpg|jpeg|png|gif|webp)$/i.test(image) ? (
                                <div className='upload-image-second-div'>
                                    <img src={image} alt='Uploading-Media' className='uploading-image-file'></img>
                                </div>
                            ) :
                                image?.startsWith("data:video") || /\.(mp4|webm|ogg)$/i.test(image) ? (
                                    <div className='uploading-video-third-div'>
                                        <video controls className='video-uploading'><source src={image} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                ) : null
                        }

                        <button type='button' onClick={() => { setImage(null); setValue(name, null); }} className='upload-remove-button'>
                            Remove 
                        </button>
                    </>
                </div>
            ) : (
                <div>
                    <label htmlFor={label} className='upload-label'>
                        <div>
                            {label} <sup className='course-information-super'>*</sup>
                        </div>
                        <div className='uploading-forth-div'>
                            <div>
                                <input type='file' id={label} {...register(name, { required: true })} onChange={handleOnChange} className='uploading-input-file'></input>
                            </div>
                            <div className='upload-cloud-icon-div'>
                                <IoCloudUploadOutline className='upload-cloud-icon' />
                            </div>
                            <div className='drag-drop-dive-section'>
                                <p>Drag and drop an image, or click to {""}
                                    <span className='upload-browse-file'>browse</span> a file
                                </p>
                                <p>Max 6MB each (12MB for videos)</p>
                            </div>
                            <ul className='upload-unordered-list'>
                                <li>Aspect ratio 16:9</li>
                                <li>Recommended size 1024x576</li>
                            </ul>

                        </div>
                    </label>{errors[name] && (<span className="course-thumnail-warning">{title} is required </span>)}
                </div>
            )} 

        </div>
    )
}

export default Upload
