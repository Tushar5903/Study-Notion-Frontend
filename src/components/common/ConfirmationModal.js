import React from 'react'
import Iconsbtn from './Iconsbtn'
import './css/ConfirmationModal.css'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='Confirmation-modal-first-div'>
        <div className='Confirmation-modal-second-div'>
            <p className='Confirmation-modal-first-para'>
                {modalData.text1}
            </p>
            <p className='Confirmation-modal-second-para'>
                {modalData.text2}
            </p>
            <div className='Confirmation-modal-third-div'>
                <Iconsbtn onClick={modalData?.btn1handler}
                text={modalData?.btn1Text}/>
                <button onClick={modalData?.btn2handler} className='cancel-button'>
                    {modalData?.btn2Text}
                </button>
            </div>
        </div>
      
    </div>
  )
}

export default ConfirmationModal
