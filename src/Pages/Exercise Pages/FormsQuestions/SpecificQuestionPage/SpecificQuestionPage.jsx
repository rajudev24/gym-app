/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { HiChevronDown, HiOutlineMenuAlt3 } from 'react-icons/hi'
import { FaArrowLeft } from 'react-icons/fa'
import ToggleLeftContext from '../../../../Context/ToggleLeftContext'
import { BiCheck, BiCheckCircle } from 'react-icons/bi'
import { AiFillEye, AiOutlineEdit } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { HiMiniMap } from 'react-icons/hi2'
import { FaqEdit, ShowFaqQuestionsDropdown, ShowFormQuestionList } from '../../../../Component/Exercise/FaqEdit/FaqEdit'
import { EditableContentSettingsSidebarRight } from '../../../../Component/Exercise/FaqEdit/RightSidebarWhileEditing'
import NavBarRightSide from '../../../../Shared/NavBarRightSide/NavBarRightSide'
import { v4 as uuidv4 } from 'uuid';
import { demoList } from '../../../../Component/Exercise/FaqLibrary'

export const FaqContext = createContext()

export const SpecificQuestionPage = () => {
    const { handleTrue: handleBeginEditQuestion, handlefalse: handleCloseEditQuestion, isTrue: editQuestion } = useForToggleState()

    const [editableContentName, setEditableContentName] = useState("");
    const handleShowEditableContent = (name) => setEditableContentName(name)
    const handleHideEditableContent = () => setEditableContentName("")

    const { handleTrue: handleShowResponsesView, handlefalse: handleHideResponsesView, isTrue: showResponsesView } = useForToggleState()

    useEffect(() => {
        !editQuestion && handleHideEditableContent()
    }, [editQuestion])

    // currently viewing question id, which will be used to show correct advanced settings for it
    const [currentlyViewing, setCurrentlyViewing] = useState()

    const updateCurrentlyViewing = data => setCurrentlyViewing(data)

    // keeping track of all questions in any specefic faq form
    const [questionsAdded, setQuestionsAdded] = useState([])

    const handleQuestionsAdded = (newItem) => {
        // console.log(newItem, "new question", questionsAdded)
        const questionIdx = uuidv4();
        // const temp = questionsAdded.concat({ questionIdx, ...newItem })
        // console.log(temp, "new question", questionsAdded)
        // setQuestionsAdded(temp)
        // console.log(editableContentName, { questionIdx, ...newItem })
        setQuestionsAdded(prev => [...prev, { questionIdx, ...newItem }])
        // setQuestionsAdded([{ questionIdx, ...newItem }])

        // removing editable content name
        // setEditableContentName("")
    }

    const removeQuestionFromList = (idx) => {
        const filtered = questionsAdded.filter(item => item.questionIdx !== idx)
        setQuestionsAdded(filtered)
    }

    const handleAdvancedSettings = (quId, settingsData) => {
        const moddedQuestions = questionsAdded.map(item => {
            if (item.questionIdx === quId) {
                item.settingsData = { ...item.settingsData, ...settingsData }
            }

            return item
        })

        // console.log(moddedQuestions, "modified!!", quId, settingsData)

        setQuestionsAdded(moddedQuestions)
    }

    const handleContentDataUpdates = (quId, newData) => {
        const moddedQuestions = questionsAdded.map(item => {
            if (item.questionIdx === quId) {
                // this needs to be an array!!
                item.dynamicData = { ...item.dynamicData, ...newData }

                // item.dynamicData = []
            }

            return item
        })

        // console.log(moddedQuestions, "modified!!", quId, settingsData)

        setQuestionsAdded(moddedQuestions)
    }

    const duplicateQuestionAtIndex = (quId) => {
        let foundItem = questionsAdded.find(item => item?.questionIdx === quId)
        if (foundItem) {
            // foundItem.questionIdx = uuidv4();
            foundItem = { ...foundItem, questionIdx: uuidv4() }

            // get index of this question in list
            const idx = questionsAdded.findIndex(item => item.questionIdx === quId)

            const until = questionsAdded.length > 1 ? questionsAdded.slice(0, idx) : [questionsAdded[0]]
            // console.log("until", until)

            const after = questionsAdded.length > 1 ? questionsAdded.slice(idx) : [foundItem]
            // const after = questionsAdded.slice(quId)
            // console.log("after", after)

            let temp = questionsAdded.length > 1 ? until.concat(foundItem, after) : until.concat(after)

            // console.log(temp, "temp", foundItem, quId)

            setQuestionsAdded(temp)
        }
    }

    // to keep track of question content settings
    const [contentSettings, setContentSettings] = useState({})

    const handleContentSettings = (settingsData, questionId) => {
        // console.log(settingsData, "settingsdata")
        // console.log(questionType, settingsData)
        handleAdvancedSettings(questionId, settingsData)

        setContentSettings(prev => ({ ...prev, settingsData }))
    }

    const [text, setText] = useState();
    const handleFaqTitleChange = (e) => setText(e.target.value)

    return (
        <FaqContext.Provider value={{
            handleContentSettings, contentSettings, duplicateQuestionAtIndex, removeQuestionFromList, handleQuestionsAdded, questionsAdded, updateCurrentlyViewing, currentlyViewing,
            handleShowEditableContent, editableContentName, handleContentDataUpdates,
            handleAdvancedSettings
        }}>
            <div className='px-4 pt-4 w-full flex flex-col gap-y-0'>
                <LayoutTop handleTextChange={handleFaqTitleChange} />
                <hr className='py-2 mt-4' />
                {/* <TaskLibrary></TaskLibrary> */}

                <HorizontalActionsBarTop
                    handleBeginEditQuestion={handleBeginEditQuestion} handleCloseEditQuestion={handleCloseEditQuestion}
                    editQuestion={editQuestion}
                    handleShowResponsesView={handleShowResponsesView}
                    handleHideResponsesView={handleHideResponsesView}
                    faqTitle={text}
                />

                <div className='grid grid-cols-6 gap-8 bg-slate-50'>
                    {
                        showResponsesView
                            ? null
                            : <ContentListSidebarLeft
                                editQuestion={editQuestion}
                            />
                    }

                    {
                        showResponsesView
                            ? <div className='col-span-6 min-h-full h-[100vh] text-center flex items-center justify-center'>Response view</div>

                            : <ContentView editQuestion={editQuestion} editableContentName={editableContentName} />
                    }

                    {
                        showResponsesView
                            ? null
                            :
                            !editQuestion
                                ? <ContentSettingsSidebarRight editQuestion={editQuestion} />
                                : <EditableContentSettingsSidebarRight />
                    }
                </div>
            </div>
        </FaqContext.Provider>
    )
}

const ContentSettingsSidebarRight = ({ editQuestion }) => {
    return (
        <div className='flex flex-col gap-y-2 w-full pt-4'>
            <h2 className='font-semibold'>Settings</h2>
            <hr className='p-0' />
            <div className='flex flex-col gap-y-4 w-full'>

                <div className='flex flex-col gap-y-2'>
                    <h3 className='text-xs font-semibold'>Type</h3>
                    <p className={`border border-primary-content rounded-sm w-full text-xs ${editQuestion ? "cursor-auto" : "cursor-not-allowed"}`} name="" id="" disabled={!editQuestion}>
                        <span className='flex gap-x-2 justify-between items-center px-2'> <HiMiniMap className='text-xs' /> Welcome screen <HiChevronDown className='' /> </span>
                    </p>
                </div>

                <div className='flex flex-col gap-y-2 w-full'>
                    <h3 className='text-xs font-semibold'>Advanced Settings</h3>

                    <div className='flex flex-col gap-y-4 w-full'>
                        <div className='flex flex-col gap-y-1'>
                            <p className='text-slate-600 text-xs'>Button background</p>
                            <div className='outline outline-primary-content rounded p-1 pl-2 flex gap-x-2 text-sm'><p className={`w-6 h-full bg-primary rounded-md ${editQuestion ? "cursor-auto" : "cursor-not-allowed"}`}></p><span>#hexcode</span></div>
                        </div>

                        <div className='flex flex-col gap-y-1'>
                            <p className='text-slate-600 text-xs'>Button label</p>
                            <p className='outline outline-primary-content rounded p-1 pl-2 flex justify-between px-2 text-sm'><span>label here</span><span className='text-[11px] text-primary-content'>{"label here".length}/20</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ContentView = ({ editableContentName, editQuestion }) => {
    return (
        <div className='col-span-4 place-content-center place-items-center bg-slate-100 text-center h-[100vh] shadow-inner p-4'>
            <div className='h-full bg-slate-200 rounded-sm'>
                {
                    editableContentName || editQuestion
                        ? <FaqEdit />
                        : <>
                            <img className='mx-auto rounded-md' height={"100%"} width={"50%"} src="https://source.unsplash.com/random/900?gym" alt="random gym photos from unsplash" />
                            <span>Faq Content Goes Here</span>
                        </>
                }
            </div>
        </div>
    )
}

const ContentListSidebarLeft = ({ editQuestion }) => {
    const renderContents = () => faqs.map((item, idx) => {
        return (
            <Link
                to={`/exersise/forms/${item.formId}`}
                className='flex gap-x-2 items-center border border-1 border-transparent hover:border-primary focus:border-primary-focus active:border-primary w-full shadow-lg hover:shadow-sm'
                key={item.formId + idx}
            >
                <span>{idx}</span>
                <span className='text-sm'>{item.icon}</span>
                <span className='text-sm'>{item.name}</span>
            </Link>
        )
    })

    return (
        <div className='flex flex-col gap-y-2 pt-4'>
            <div className='flex justify-between items-center'>
                <h2 className='font-semibold'>Content</h2>
                {editQuestion ? <ShowFaqQuestionsDropdown /> : null}
            </div>
            <div className='flex flex-col gap-y-2'>
                {
                    editQuestion
                        ? <ShowFormQuestionList />
                        : renderContents()
                }
            </div>
        </div>
    )
}

const HorizontalActionsBarTop = ({ handleBeginEditQuestion, handleCloseEditQuestion, editQuestion, handleHideResponsesView, handleShowResponsesView, faqTitle }) => {
    return (
        <div className='grid grid-cols-3 place-items-center'>
            <Link to='/exersise/forms' className='place-self-start flex gap-x-1 items-center text-xs hover:text-primary'>
                <FaArrowLeft />
                <span className='hover:underline hover:decoration-primary font-semibold'>Back</span>
            </Link>

            <TabsList handleHideResponsesView={handleHideResponsesView} handleShowResponsesView={handleShowResponsesView} />

            {
                editQuestion
                    ? <ActionButtonsWhileEditing handleCloseEditQuestion={handleCloseEditQuestion} faqTitle={faqTitle} />
                    : <ActionButtons handleBeginEditQuestion={handleBeginEditQuestion} handleCloseEditQuestion={handleCloseEditQuestion} />
            }
        </div>
    )
}

const ActionButtons = ({ handleBeginEditQuestion, handleCloseEditQuestion }) => {
    const renderBtns = () => btns.map(btn => {
        return (
            <button
                key={btn.name}
                className='flex gap-x-2 items-center outline outline-1 px-2 rounded text-slate-400 p-1'
                onClick={btn.name === "Edit" ? handleBeginEditQuestion : handleCloseEditQuestion}
            >
                {btn.icon} <span>{btn.name}</span>
            </button>
        )
    })

    return (
        <div className='place-self-center justify-self-end flex gap-x-2 text-xs'>
            {renderBtns()}
        </div>
    )
}

const ActionButtonsWhileEditing = ({ handleCloseEditQuestion, faqTitle }) => {
    const {questionsAdded} = useContext(FaqContext)

    const naviagte = useNavigate()
    
    const handleClickedPublish = () => {
        const getDay = new Date().getDay()
        const getMonth = new  Date().getMonth();

        const faqItem = { name: faqTitle, questions: questionsAdded?.length, responses: 0, lastUpdated: `${getMonth} ${getDay}`, author: "Masud Rana" }

        demoList.push(faqItem);
        naviagte("/exersise/forms")
    }
    
    const renderBtns = () => buttons.map(btn => {
        return (
            <button
                key={btn.name}
                className='flex gap-x-2 items-center outline outline-1 px-2 rounded text-slate-400 p-1'
                onClick={btn.name === "Publish Changes" ? handleClickedPublish : handleCloseEditQuestion}
            >
                {btn.icon} <span>{btn.name}</span>
            </button>
        )
    })

    return (
        <div className='place-self-center justify-self-end flex gap-x-2 text-xs'>
            {renderBtns()}
        </div>
    )
}

const TabsList = ({ handleShowResponsesView, handleHideResponsesView }) => {
    const renderTabs = () => tabs.map(tab => {
        return (
            <a
                href='#'
                className='tab transition-all duration-300 focus:tab-active focus:after:bg-primary-focus after:h-0.5 after:w-full focus:text-primary-focus px-0 flex gap-x-4'
                key={tab}
                onClick={tab === "Questions" ? handleHideResponsesView : handleShowResponsesView}
            >{tab}</a>
        )
    })

    return (
        <div className="tabs">
            {renderTabs()}
        </div>
    )
}

const LayoutTop = ({handleTextChange}) => {
    const toggleLeft = useContext(ToggleLeftContext);
    const {handleTrue, handlefalse, isTrue} = useForToggleState()
    

    return (
        <div className="px-5 flex justify-between items-center">
            <div className="flex gap-x-2 items-center">
                <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
                {
                    isTrue
                    ? <div className='relative flex items-center'>
                        <input type="text" defaultValue={"Question title"} onChange={handleTextChange} placeholder="Type here" className="input input-ghost w-full max-w-xs" />
                        <BiCheck size={40} className='p-1 absolute right-1 rounded-full hover:bg-primary-focus' onClick={handlefalse} />
                    </div>
                    : <h2 className="text-xl font-semibold" onClick={handleTrue}>Question Title</h2>
                }
            </div>
            <NavBarRightSide />
        </div>
    )
}

export const useForToggleState = () => {
    const [isTrue, setIsTrue] = useState(false)
    const handleTrue = () => setIsTrue(true)
    const handlefalse = () => setIsTrue(false)

    return { isTrue, handleTrue, handlefalse }
}

const faqs = [
    { name: "Test", icon: <HiMiniMap />, formId: 1234 },
    { name: "What is", icon: <BiCheckCircle />, formId: 1235 }
]

const btns = [
    { name: "Preview", icon: <AiFillEye /> },
    { name: "Edit", icon: <AiOutlineEdit /> }
]

const buttons = [
    { name: "Preview", icon: <AiFillEye /> },
    { name: "Cancel Edit", icon: <AiOutlineEdit /> },
    { name: "Publish Changes", icon: <AiOutlineEdit /> }
]

const tabs = ["Questions", "Responses"]