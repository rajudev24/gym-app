import React, { useState } from 'react'
import { FaCheckCircle, FaPauseCircle, FaPlay, FaPlayCircle } from 'react-icons/fa'
import { RiTimerLine } from "react-icons/ri"
import { ImCross } from 'react-icons/im'
import Modal from 'react-responsive-modal'
import { HiDocumentSearch, HiMusicNote } from 'react-icons/hi'
import { SectionOptionModal } from '../SectionOptionModal/SectionOptionModal'

export const AddNewSectionModal = ({ isOpen, handleClose }) => {
    return (
        <Modal open={isOpen}
            closeIcon={<ImCross />}
            onClose={handleClose}
            center
            classNames={{
                modal: 'p-4 pt-0 pb-4 overflow-visible rounded-md w-[900px]',
                closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full z-50'
            }}>
            <ModalContents handleClose={handleClose} />
        </Modal>
    )
}

const ModalContents = ({handleClose}) => {
    const [whichOptionIsClicked, setWhichOptionIsClicked] = useState()

    const renderOptions = () => options.map(item => <RenderOption key={item.title} item={item} setWhichOptionIsClicked={setWhichOptionIsClicked} />)

    return (
        <>
            <div className='flex flex-col gap-y-4 py-2 pt-4'>
                <div className='flex flex-col gap-y-2'>
                    <h2 className='font-semibold text-primary-content'>Create Section</h2>
                    <p className='text-xs text-primary-content'>Please select your section format</p>
                </div>
                <div className='flex gap-x-4 gap-y-6 justify-center flex-wrap'>
                    {renderOptions()}
                </div>
            </div>

            {whichOptionIsClicked ? <SectionOptionModal whichOptionIsClicked={whichOptionIsClicked} closeParentModal={handleClose} /> : null}
        </>
    )
}

const RenderOption = ({ item, setWhichOptionIsClicked }) => {
    const { title, asset, description } = item;

    const { hovered, handleMouseEnter, handleMouseLeave } = useForHoveredText()

    const showSpecificAsset = () => {
        if (title === "Regular") {
            return <RegularSectionAsset hovered={hovered} />
        } else if (title === "Interval") {
            return <IntervalSectionAsset hovered={hovered} />
        } else if (title === "AMRAP") {
            return <AmrapSectionAsset hovered={hovered} />
        } else if (title === "Timed") {
            return <TimedSectionAsset hovered={hovered} />
        } else if (title === "Freestyle") {
            return <FreestyleSectionAsset hovered={hovered} />
        }
    }

    return (
        <div
            className={`w-48 h-40 py-2 px-4 rounded-sm outline outline-1 outline-slate-400 flex flex-col justify-between items-center transition-all duration-300 ${hovered ? "outline-primary-focus shadow-sm" : "shadow-lg"} cursor-pointer`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setWhichOptionIsClicked(title)}
        >
            {/* {asset} */}
            {showSpecificAsset()}
            <div className='flex flex-col gap-y-0 h-24 items-center justify-end'>
                <h3 className='text-primary-content mx-auto'>{title}</h3>
                <p className='text-primary-content text-[12px] text-center'>{description}</p>
            </div>
        </div>
    )
}

const RegularSectionAsset = ({ hovered }) => {
    return (
        <table className={`flex flex-col w-32 bg-slate-200 rounded-sm`}>
            <thead className='flex justify-center gap-x-4'>
                <th className={`pr-0 ${hovered ? "text-primary-content" : "text-slate-400"} text-[11px]`}>Weight</th>
                <th className={`pr-7 ${hovered ? "text-primary-content" : "text-slate-400"} text-[11px]`}>RPS</th>
            </thead>

            <tr className='flex justify-center gap-x-4 items-baseline my-0.5'>
                <BlankTd hovered={hovered} />
                <td className='flex gap-x-4 items-baseline'>
                    <BlankTd hovered={hovered} />
                    <span className={`text-[11px] transition-all duration-300 ${hovered ? "text-primary-focus" : "text-slate-400"}`}><FaCheckCircle /></span>
                </td>
            </tr>

            <tr className='flex justify-center gap-x-4 mb-2 items-baseline'>
                <BlankTd hovered={hovered} />
                <td className='flex gap-x-4 items-baseline'>
                    <BlankTd hovered={hovered} />
                    <span className={`text-[11px] transition-all duration-300 ${hovered ? "text-primary-focus" : "text-slate-400"}`}><FaCheckCircle /></span>
                </td>
            </tr>
        </table>
    )
}

const BlankTd = ({ hovered }) => {
    return (
        <td className={`h-2 w-6 transition-all duration-300 ${hovered ? "bg-primary-focus" : "bg-slate-300"}`}>
        </td>
    )
}

const IntervalSectionAsset = ({ hovered }) => {
    return (
        <div className='flex flex-col justify-center items-center relative bg-slate-200 w-32 py-2 rounded-sm h-16'>
            <TitleText hovered={hovered} text={hovered ? "0:14" : "0:43"} />
            <DescriptionText hovered={hovered} text={"Time left"} />
            <span className='absolute -bottom-2'>{hovered ? <FaPauseCircle /> : <FaPlayCircle />}</span>
        </div>
    )
}

const AmrapSectionAsset = ({ hovered }) => {
    return (
        <div className='flex flex-col justify-center items-center relative bg-slate-200 w-32 py-2 rounded-sm h-16'>
            <TitleText hovered={hovered} text={hovered ? "3 rounds" : "As many rounds"} />
            {/* <DescriptionText hovered={hovered} text={"time 5 min"} /> */}
            <span className={`absolute -bottom-2 bg-slate-400 rounded-s-lg rounded-r-lg px-4 text-xs ${hovered ? "text-primary-focus" : "text-slate-200"}`}>Time: 5 min</span>
        </div>
    )
}

const TimedSectionAsset = ({ hovered }) => {
    return (
        <div className='flex flex-col justify-center items-center relative w-32 py-2 pb-4 rounded-sm'>
            <span className={`text-[60px] font-thin relative z-10 transition-all duration-300 ${hovered ? "text-primary-focus" : "text-slate-400"}`}><RiTimerLine /></span>
            <p className={`absolute top-7 transition-all duration-300 ${hovered ? "text-primary-focus" : "text-slate-600"} text-[11px]`}>{hovered ? "09:10" : "08:42"}</p>
            <p className={`absolute bottom-0 transition-all duration-300 ${hovered ? "text-primary-focus" : "text-slate-200"} bg-slate-400 text-xs px-2 z-0 rounded-sm`}>Target: 4 seconds</p>
            {/* <TitleText hovered={hovered} text={hovered ? "09:10" : "08:42"} /> */}
            {/* <DescriptionText hovered={hovered} text={"target 4 seconds"} /> */}
        </div>
    )
}

const DescriptionText = ({ text, hovered }) => {
    return (
        <p className={`transition-all duration-300 ${hovered ? "text-primary-focus" : "text-slate-400"} text-xs`}>{text}</p>
    )
}

const TitleText = ({ text, hovered }) => {
    return (
        <h3 className={`transition-all duration-300 ${hovered ? "text-primary-focus" : "text-slate-400"} text-sm`}>{text}</h3>
    )
}

const FreestyleSectionAsset = ({ hovered, handleMouseEnter, handleMouseLeave }) => {
    return (
        <div
            className={`${hovered ? "text-primary-focus" : "text-slate-400"} flex flex-col justify-center items-center relative bg-slate-200 w-32`}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        >
            <div className='flex gap-x-1 items-center relative h-16'>
                <HiDocumentSearch />
                <span className='outline outline-1 outline-slate-400 p-2 bg-slate-50 pr-1 py-1'><FaPlay /></span>
                <HiMusicNote />
            </div>
            <span className='absolute z-0 -bottom-2'><FaCheckCircle /></span>
        </div>
    )
}

const useForHoveredText = () => {
    const [hovered, setHovered] = useState(false)
    const handleMouseEnter = () => setHovered(true)
    const handleMouseLeave = () => setHovered(false)

    return { hovered, handleMouseEnter, handleMouseLeave }
}

const options = [
    { title: "Regular", asset: <RegularSectionAsset />, description: "Exercise by exercise, mostly used for strength workouts" },
    { title: "Interval", asset: <IntervalSectionAsset />, description: "Runs built-in timer for exercise and rest (HIIT, Tabata, Circuit)" },
    { title: "AMRAP", asset: <AmrapSectionAsset />, description: "Track total rounds completed based on time assigned" },
    { title: "Timed", asset: <TimedSectionAsset />, description: "Track total duration based on rounds assigned" },
    { title: "Freestyle", asset: <FreestyleSectionAsset />, description: "Best for warmups, Crossfit, or any follow-along videos" }
]