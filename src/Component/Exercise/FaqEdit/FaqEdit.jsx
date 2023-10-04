import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu'
import React, { useContext, useEffect, useState } from 'react'
import { BiCheck, BiPlus } from 'react-icons/bi'
import { PiCopySimpleThin, PiTrashLight, PiTrashSimpleThin } from "react-icons/pi"
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md"
import { ImageAndTextQuestionMarkups, LinearScaleQuestionMarkups, LongAnswerQuestionMarkups, MultipleChoiceQuestionMarkups, ShortAnswerQuestionMarkups, SignatureQuestionMarkups, SingleChoiceQuestionMarkups, WelcomeScreenContentMarkups } from './QuestionsContentMarkUps'
import { HiEllipsisVertical } from 'react-icons/hi2'
import { FaqContext, useForToggleState } from '../../../Pages/Exercise Pages/FormsQuestions/SpecificQuestionPage/SpecificQuestionPage'

export const FaqEdit = ({  }) => {
    // const [contents, setContents] = useState([])

    const {editableContentName, handleQuestionsAdded, questionsAdded, removeQuestionFromList, duplicateQuestionAtIndex, currentlyViewing} = useContext(FaqContext)

    const [currentQuestionMarkup, setCurrentQuestionMarkup] = useState()

    // console.log(editableContentName, "editable", currentQuestionMarkup, currentlyViewing?.name)

    // this would have been nice if there was no reactive variable to account for, it renders just fine on initial render, but not accounting for subsequent reactive state values
    // const { content } = useForShowingQuestionMarkups(editableContentName, contentSettings)

    // console.log(editableContentName, "editablecontent", currentQuestionMarkup, editableContentName == "Welcome screen")

    const refactoredContent = () => {
        // console.log(editableContentName, "editablecontent")

        return (
            // editableContentName == "Single choice"
            editableContentName === "welcome screen"
               ? <WelcomeScreenContentMarkups />
                : editableContentName === "Single choice" || currentlyViewing?.name === "Single choice"
                    ? <SingleChoiceQuestionMarkups />
                    : editableContentName === "Multiple choice"
                        ? <MultipleChoiceQuestionMarkups />
                        : editableContentName === "Linear scale"
                            ? <LinearScaleQuestionMarkups  />
                            : editableContentName === "Short answer"
                                ? <ShortAnswerQuestionMarkups />
                                : editableContentName === "Long answer"
                                    ? <LongAnswerQuestionMarkups />
                                    : editableContentName === "Signature"
                                        ? <SignatureQuestionMarkups />
                                        : editableContentName === "Image and text"
                                            ? <ImageAndTextQuestionMarkups />
                                            : null
                                            // : "h1h1h1h1h1h"
                                            // : <WelcomeScreenContentMarkups contentSettings={contentSettings} questionsAdded={questionsAdded} currentlyViewing={currentlyViewing} />
        )
    }

    // const {handleTrue, handlefalse, isTrue} = useForToggleState()

    // const [insertAt, setInsertAt] = useState()

    const renderAllQuestionMarkups = () => (
        // contents.map
        questionsAdded.map
        ((content, idx) => {
            return (
                <div
                    // id={`${content.questionType.split(" ").join("_") + idx}`}
                    id={content.questionIdx}
                    className='w-full min-h-screen flex justify-start items-center relative px-20 shadow shadow-slate-600'
                    key={idx}
                >
                    <div className='self-start absolute right-4 flex gap-x-2 my-4'>
                        {
                            // content.questionType === "Welcome screen"
                            content.questionType === "welcome screen"
                                ? null
                                : <button onClick={() => {
                                    duplicateQuestionAtIndex(content.questionIdx)
                                    // setInsertAt(idx)
                                    // handleTrue()
                                }}><PiCopySimpleThin className='hover:text-primary-focus' /></button>
                            // : <button onClick={handleTrue}><PiCopySimpleThin className='hover:text-primary-focus' /></button>
                            // : <button onClick={() => addToListAtSpecificIdx(idx, content.markup, editableContentName)}><PiCopySimpleThin className='hover:text-primary-focus' /></button>
                        }
                        <button onClick={() => removeQuestionFromList(content.questionIdx)}><PiTrashLight className='hover:text-primary-focus' /></button>
                        {/* <button onClick={() => removeFromContentMarkups(idx)}><PiTrashLight className='hover:text-primary-focus' /></button> */}
                    </div>

                    <p className={`absolute ${content.questionType === "Signature" ? "left-9 top-40" : content.questionType === "Image and text" ? "left-9 top-44" : "left-20 top-1/3"} flex gap-x-2 items-baseline text-primary`}>
                        <MdOutlineSubdirectoryArrowRight className='scale-150' />{idx}
                    </p>

                    <div
                        className='flex justify-center items-center w-full self-center'>
                        {content?.markup}
                    </div>
                </div>
            )
        })
    )

    useEffect(() => {
        // editableContentName && content && setCurrentQuestionMarkup(content)
        
        // editableContentName && content && setCurrentQuestionMarkup({ markup: content, questionType: editableContentName })

        // editableContentName && refactoredContent() && console.log(editableContentName, editableContentName && refactoredContent())

        editableContentName && refactoredContent() && setCurrentQuestionMarkup({ markup: refactoredContent(), questionType: editableContentName })

        // editableContentName && setCurrentQuestionMarkup({ markup: refactoredContent(), questionType: editableContentName })
        
    }, [editableContentName])

    useEffect(() => {
        // currentQuestionMarkup && setContents(prev => [...prev, content])
        // currentQuestionMarkup && setContents(prev => [...prev, currentQuestionMarkup])

        // keeping all questions in parent component
        currentQuestionMarkup && handleQuestionsAdded(currentQuestionMarkup)

        // currentQuestionMarkup && console.log(editableContentName, "editable", currentQuestionMarkup, currentlyViewing?.name)

        // currentQuestionMarkup && setCurrentQuestionMarkup(null)
    }, [currentQuestionMarkup])


    return (
        <div className='h-[100vh] overflow-y-scroll flex flex-col gap-y-6 items-center scroll-smooth bg-transparent'>
            {/* {contents?.length ? renderAllQuestionMarkups() : null} */}
            {questionsAdded.length ? renderAllQuestionMarkups() : null}
        </div>
    )
}

export const ShowFormQuestionList = ({  }) => {

    const {questionsAdded } = useContext(FaqContext)

    // const renderQuestionsList = () => questionsList.map((name, idx) => <RenderQuestionListItem key={name + idx} name={name} idx={idx} handleRemoveQuestion={handleRemoveQuestion} handleDuplicateQuestion={handleDuplicateQuestion} />)

    // const renderQuestionsList = () => questionsAdded.map((item, idx) => <RenderQuestionListItem key={item.questionType + idx} name={item.questionType} idx={idx} handleRemoveQuestion={handleRemoveQuestion} handleDuplicateQuestion={handleDuplicateQuestion} />)

    const renderQuestionsList = () => questionsAdded.map((item, idx) => <RenderQuestionListItem key={item.questionType + idx} name={item.questionType} idx={item.questionIdx} />)

    return (
        <div className='flex flex-col gap-y-4'>
            {renderQuestionsList()}
        </div>
    )
}

const RenderQuestionListItem = ({ name, idx }) => {

    const {editableContentName, removeQuestionFromList, duplicateQuestionAtIndex, updateCurrentlyViewing} = useContext(FaqContext)

    const getQuestionIcon = questionTypes.find(type => type.name === name)?.icon

    // const uniqueId = name.split(" ").join("_") + idx
    const uniqueId = idx

    const handleOnClick = () => updateCurrentlyViewing({ quId: uniqueId, name: name })

    useEffect(() => {
        handleOnClick()
        // console.log("currently viewing!!", name, editableContentName)
    }, [editableContentName, name])

    return (
        <a href={`#${uniqueId}`} className='flex gap-x-2 items-center relative justify-between'>
            <div className='flex gap-x-2 items-center' onClick={handleOnClick}>
                {getQuestionIcon}
                <span>{name}</span>
            </div>
            {/* <QuestionListItemDropdown handleRemoveQuestion={handleRemoveQuestion} handleDuplicateQuestion={handleDuplicateQuestion} idx={idx} /> */}

            <QuestionListItemDropdown handleRemoveQuestion={removeQuestionFromList} handleDuplicateQuestion={duplicateQuestionAtIndex} idx={uniqueId} />
        </a>
    )
}

const QuestionListItemDropdown = ({ handleRemoveQuestion, handleDuplicateQuestion, idx }) => {
    const renderOptions = () => questionTypeDropdownOptions.map(item => {
        return (
            <MenuItem
                key={item.name}
                // className='flex gap-x-2 items-center py-0.5'
                className="hover:bg-[#2b2b2c] text-sm text-gray-400 font-medium flex gap-2 items-center rounded-xl"
                onClick={item.name === "Delete" ? () => handleRemoveQuestion(idx) : item.name === "Duplicate" ? () => handleDuplicateQuestion(idx) : null}
            >
                <span className='text-slate-200'>{item.icon}</span>
                <span>{item.name}</span>
            </MenuItem>
        )
    })

    return (
        <Menu
            align='end'
            menuButton={<MenuButton className="bg-transparent transition-all duration-300 hover:bg-primary-focus p-0.5 rounded-full text-lg flex self-baseline pt-1 bg-slate-400">
                <HiEllipsisVertical />
            </MenuButton>}
            transition
            menuStyle={{ backgroundColor: "#222222", color: "rgb(148 163 184)", padding: "0px 0px", width: "fit-content" }}
        >
            {renderOptions()}
        </Menu>
    )
}

export const ShowFaqQuestionsDropdown = ({  }) => {

    const renderQuestionTypes = () => questionTypes.map(item => <RenderDropdownMenuItem key={item.name} item={item} />)

    return (
        <div className='self-baseline'>
            <Menu
                align='end'
                menuButton={<MenuButton className="bg-transparent transition-all duration-300 hover:bg-primary-focus p-0.5 rounded-full text-lg flex self-baseline pt-1">
                    <BiPlus />
                </MenuButton>}
                transition
            >
                {renderQuestionTypes()}
            </Menu>
        </div>
    )
}

const RenderDropdownMenuItem = ({item }) => {
    const {handleShowEditableContent} = useContext(FaqContext)
    return (
        <MenuItem
            key={item.name} className={"flex gap-x-2"}
            onClick={() => {
                // think of how to add same consecutive question type
                // handleShowEditableContent("")
                handleShowEditableContent(item.name)
                // console.log(item.name, "itemname")
            }}
        >
            <span>{item.icon}</span>
            <span>{item.name}</span>
        </MenuItem>
    )
}

// const useForShowingQuestionMarkups = (editableContentName, contentSettings) => {
//     console.log(contentSettings, "contentsettings!!")
//     const content = (
//         editableContentName === "Single choice"
//             ? <SingleChoiceQuestionMarkups contentSettings={contentSettings} />
//             : editableContentName === "Multiple choice"
//                 ? <MultipleChoiceQuestionMarkups />
//                 : editableContentName === "Linear scale"
//                     ? <LinearScaleQuestionMarkups />
//                     : editableContentName === "Short answer"
//                         ? <ShortAnswerQuestionMarkups />
//                         : editableContentName === "Long answer"
//                             ? <LongAnswerQuestionMarkups />
//                             : editableContentName === "Signature"
//                                 ? <SignatureQuestionMarkups />
//                                 : editableContentName === "Image and text"
//                                     ? <ImageAndTextQuestionMarkups />
//                                     : null
//     )

//     return { content }
// }

const questionTypeDropdownOptions = [
    { name: "Duplicate", icon: <PiCopySimpleThin /> },
    { name: "Delete", icon: <PiTrashSimpleThin /> }
]

export const questionTypes = [
    { name: "welcome screen", icon: <BiCheck /> }, { name: "Single choice", icon: <BiCheck /> },
    { name: "Multiple choice", icon: <BiCheck /> }, { name: "Linear scale", icon: <BiCheck /> },
    { name: "Short answer", icon: <BiCheck /> }, { name: "Long answer", icon: <BiCheck /> },
    { name: "Signature", icon: <BiCheck /> }, { name: "Image and text", icon: <BiCheck /> },
]