import React, { useContext, useRef } from 'react'
import { BiImage } from 'react-icons/bi'
import { ImCross } from 'react-icons/im'
import Modal from 'react-responsive-modal'
import { useForSelectImage } from '../../Exercise/FaqEdit/RightSidebarWhileEditing'
import { BsFillInfoCircleFill, BsInfo } from 'react-icons/bs'
import { FaInfoCircle } from 'react-icons/fa'
import { FaqContext } from '../../../Pages/Exercise Pages/FormsQuestions/SpecificQuestionPage/SpecificQuestionPage'

export const ChooseBackgroundForFaq = ({ isOpen, handleClose }) => {

    const imgRef = useRef()

    const {contentSettings, handleAdvancedSettings, currentlyViewing} = useContext(FaqContext)

    const { handleSetImage, image } = useForSelectImage()

    const handleImageSelection = () => {
        imgRef.current.click()
    }

    const handleSave = () => {
        handleAdvancedSettings(currentlyViewing?.quId, { image })
        handleClose()
        console.log("saving!!")
    }

    // console.log(contentSettings, "cotest settings")

    return (
        <Modal
            open={isOpen}
            closeIcon={<ImCross />}
            onClose={handleClose}
            center
            classNames={{
                modal: 'p-5 pt-1 overflow-visible rounded-md w-[490px]',
                closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full z-50'
            }}
        >
            <div className='my-2 mt-1'>
                <h2 className='text-primary-content font-bold'>Choose background</h2>
                <hr className='my-2.5' />
                <h2 className='text-primary-content text-sm font-semibold py-2 w-fit border-2 border-transparent border-b-primary'>Upload</h2>
                <hr className='' />
            </div>

            <div className='flex gap-x-4 my-4'>
                <img className='mx-auto rounded-md h-48 w-36 object-contain relative' src={image && URL.createObjectURL(image) || contentSettings?.settingsData?.image && URL.createObjectURL(contentSettings?.settingsData?.image) || "https://source.unsplash.com/random/900?gym"} alt="random gym photos from unsplash" />
                <div
                    className='flex flex-col justify-center items-center w-full outline-1 outline-dashed rounded-md text-slate-400'
                    onClick={handleImageSelection}
                >
                    <BiImage />

                    <div className='w-20 text-xs'>
                        Drag and drop an image here or <button className='cursor-pointer hover:underline hover:underline-offset-1'>Choose file</button>
                    </div>

                    <input
                        ref={imgRef}
                        onChange={handleSetImage}
                        type="file"
                        // className="file-input file-input-bordered file-input-xs w-fit" 
                        className='invisible absolute'
                    />
                </div>
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex gap-x-1 items-start'>
                    <BsFillInfoCircleFill className='text-slate-400 text-sm' />
                    <p className='text-[10.5px] w-4/5 flex gap-x-1'>Png or jpg file. Width-to-height ratio should be 3:5 and width should be at least 750px for best resolution.</p>
                </div>
                <button className='bg-primary text-primary-content px-6 rounded-md' onClick={handleSave}>Save</button>
            </div>

        </Modal>
    )
}
