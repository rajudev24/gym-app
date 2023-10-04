/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu'
import React, { useState } from 'react'
import { BiDotsVerticalRounded, BiShareAlt, BiSolidEditAlt } from 'react-icons/bi'
import { ImCross } from 'react-icons/im'
import { PiArchiveTrayThin, PiCopySimpleThin } from "react-icons/pi"
import Modal from 'react-responsive-modal'
import { RefactoredWorkoutCollection } from '../AllModals/WorkoutCollection/RefactoredWorkoutCollection'
import { BsShareFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

export const FaqLibrary = () => {
    return (
        <div className='px-6 flex flex-col gap-y-4'>
            <TabsList />
            <FaqLibraryTable />
        </div>
    )
}

const TabsList = () => {
    const renderTabs = () => tabs.map(tab => <a href='#' className='tab transition-all duration-300 focus:tab-active focus:after:bg-blue-600 after:h-0.5 after:w-full focus:text-blue-600 px-0 flex gap-x-4' key={tab}>{tab}</a>)

    return (
        <div className="tabs">
            {renderTabs()}
        </div>
    )
}

const FaqLibraryTable = () => {
    const renderContents = () => demoList.map((item, idx) => <RenderTableBodyContent key={item.name + idx} item={item} />)

    return (
        <table className="table table-xs table-pin-rows table-pin-cols">
            {/* head */}
            <thead>
                <tr>
                    <th colSpan={2}> <div className="flex items-center">
                        Forms (2)</div></th>
                    <th> <div className="flex items-center justify-center" >
                        Questions</div></th>
                    <th> <div className="flex items-center justify-center" >
                        Responses</div></th>
                    <th> <div className="flex items-center justify-center">
                        Last Updated
                    </div>  </th>
                    <th>
                        {/* just filler */}
                    </th>
                </tr>
            </thead>
            <tbody className="h-10 overflow-x-auto">
                {renderContents()}
            </tbody>

        </table>
    )
}

const RenderTableBodyContent = ({ item }) => {
    const { name, questions, responses, lastUpdated, author } = item;

    const getInitials = () => {
        const abbrStr = author.split(" ").map(word => word[0]).join("")
        return abbrStr
    }

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/exersise/forms/1234")
    }

    return (
        <tr
            className='cursor-pointer'
        >
            <td onClick={handleClick}>{name}</td>
            <td onClick={handleClick}></td>
            <td onClick={handleClick} className='text-center'>{questions}</td>
            <td onClick={handleClick} className='text-center'>{responses ? responses : "--"}</td>
            <td onClick={handleClick} className='text-center'>{lastUpdated}</td>
            <td className='flex items-center gap-x-2 cursor-pointer justify-end pr-2'>
                <span
                    className='bg-pink-600 rounded-full p-1 font-bold text-[11px] text-white'
                    title={`Role: Owner, ${author}`}
                    onClick={handleClick}
                >
                    {getInitials()}
                </span>

                <EditForm />

                <DropdownMenu />
            </td>
        </tr>
    )
}

const EditForm = () => {
    const [show, setShow] = useState(false)


    // Add Collection Modal----------------------------
    const openCollectionModal = () => setShow(true);
    const closeCollectionModal = () => setShow(false);

    return (
        <>
            <BiShareAlt
                className='bg-transparent transition-all duration-300 hover:bg-slate-200 p-0.5 rounded-full text-sm relative'
                onClick={openCollectionModal}
                title={`Visibility: Private`}
            />

            {
                show && <Modal open={show} closeIcon={<ImCross />} onClose={closeCollectionModal} center classNames={{ modal: 'p-0 pt-5 pb-1 px-1 overflow-visible rounded-md w-1/3', closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full' }}>
                    <RefactoredWorkoutCollection />
                </Modal>
            }

        </>
    )
}

const DropdownMenu = () => {
    const renderOptions = () => dropdownOptions.map(item => <RenderDropDownOpton key={item.name} item={item} />)

    return (
        <Menu align='end' menuButton={<MenuButton className="bg-transparent transition-all duration-300 hover:bg-slate-200 p-0.5 rounded-full text-lg">
            <BiDotsVerticalRounded />
        </MenuButton>} transition>
            <div className='bg-slate-800 text-slate-50 rounded-md mt-4'>
                {renderOptions()}
            </div>
        </Menu>
    )
}

const RenderDropDownOpton = ({ item }) => {
    const { name, icon } = item;
    return (
        <MenuItem className={`hover:bg-slate-600 rounded-md flex gap-x-2`}>
            <span className='text-white font-bold text-sm'>{icon}</span>
            <span className='text-xs'>{name}</span>
        </MenuItem>
    )
}

const dropdownOptions = [
    { name: "Edit", icon: <BiSolidEditAlt /> },
    { name: "Duplicate", icon: <PiCopySimpleThin /> },
    { name: "Sharing Options", icon: <BsShareFill /> },
    { name: "Archive", icon: <PiArchiveTrayThin /> }
]

export const demoList = [
    { name: "help", questions: 1, responses: 0, lastUpdated: "Sep 4", author: "Masud Rana" },
    { name: "test", questions: 1, responses: 0, lastUpdated: "Aug 21", author: "Masud Rana" }
]

const tabs = ["Your Forms", "All Forms", "Achived"]