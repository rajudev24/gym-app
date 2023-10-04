import { useContext, useEffect, useRef, useState } from "react"
import { FaStar } from "react-icons/fa"
import { ImCross } from "react-icons/im"
import { v4 as uuidv4 } from 'uuid';
import { FaqContext } from "../../../Pages/Exercise Pages/FormsQuestions/SpecificQuestionPage/SpecificQuestionPage";
import { DragImage } from "./DragImage/DragImage";

export const WelcomeScreenContentMarkups = ({ }) => {
    const { currentContentRef } = useForScrollingIntoViewCurrentContent()

    // const {contentSettings} = useContext(FaqContext)

    const { settingsData } = useForRetrivingQuestionSettingsData()

    // console.log(contentSettings, "contest steiondkgvn")

    return (
        <div ref={currentContentRef} className="flex justify-center items-center h-[100vh] py-20">
            {/* <img className='mx-auto rounded-md h-full w-full object-cover relative' src={contentSettings?.settingsData?.image && URL.createObjectURL(contentSettings?.settingsData?.image) || "https://source.unsplash.com/random/900?gym"} alt="random gym photos from unsplash" /> */}
            <img className='mx-auto rounded-md h-full w-full object-cover relative' src={settingsData?.image && URL.createObjectURL(settingsData?.image) || "https://source.unsplash.com/random/900?gym"} alt="random gym photos from unsplash" />
            <div className="absolute top-[440px] bg-slate-500 opacity-90 p-5 rounded-md">
                <NameQuestionAndDescription placeholderText={"Title (optional)"} />
                <button
                    className="px-6 py-1.5 rounded-lg font-semibold text-primary-content hover:text-primary-focus"
                    style={{
                        // backgroundColor: `${contentSettings?.settingsData?.colorPicked}`
                        // backgroundColor: "#be1f1f"
                        backgroundColor: `${settingsData?.colorPicked}`
                    }}
                >{settingsData?.labelText || "text"}</button>
            </div>
        </div>
    )
}

export const ImageAndTextQuestionMarkups = ({ }) => {
    const { currentContentRef } = useForScrollingIntoViewCurrentContent()

    const { settingsData } = useForRetrivingQuestionSettingsData()

    const showImage = () => {
        // const imgSrc = URL.createObjectURL(contentSettings?.settingsData?.image)
        const imgSrc = URL.createObjectURL(settingsData?.image)

        return imgSrc ? <img className="h-60 w-60" src={imgSrc} alt="image and text section" /> : null
    }

    return (
        <div ref={currentContentRef} className="flex flex-col gap-y-4 w-full h-[100vh] py-20 justify-center">
            <NameQuestionAndDescription placeholderText={"Enter the title"} />
            <div className="h-64 w-full flex items-center justify-center bg-transparent mx-auto outline-dotted outline-primary">
                {
                    // contentSettings?.
                    settingsData?.image
                        ? showImage()
                        : <DragImage />
                }
            </div>
            {/* <input className="w-full" type="text" placeholder="Your Client's Full Name" /> */}
        </div>
    )
}

export const SignatureQuestionMarkups = ({ }) => {
    const { currentContentRef } = useForScrollingIntoViewCurrentContent()

    return (
        <div ref={currentContentRef} className="flex flex-col justify-center gap-y-4 w-full h-[100vh] py-20">
            <NameQuestionAndDescription placeholderText={"Enter the title"} />
            <div className="h-40 flex items-center justify-center bg-transparent mx-auto outline-1 outline-dashed outline-primary rounded-sm w-full text-slate-400">Your Client's Signature Here</div>
            <input className="w-full" type="text" placeholder="Your Client's Full Name" />
        </div>
    )
}

export const LongAnswerQuestionMarkups = ({ }) => {
    const { currentContentRef } = useForScrollingIntoViewCurrentContent()

    return (
        <div ref={currentContentRef} className="flex flex-col gap-y-4 justify-center w-full h-[100vh] py-20">
            <NameQuestionAndDescription />
            <ResuableAnswerText whichType={"Long_answer"} placeholderText={"Long answer text"} />
        </div>
    )
}

export const ShortAnswerQuestionMarkups = ({ }) => {
    const { currentContentRef } = useForScrollingIntoViewCurrentContent()

    return (
        <div ref={currentContentRef} className="flex flex-col gap-y-4 justify-center w-full h-[100vh] py-20">
            <NameQuestionAndDescription />
            <ResuableAnswerText whichType={"Short_answer"} maxLength={40} placeholderText={"Short answer text"} />
        </div>
    )
}

const ResuableAnswerText = ({ maxLength, placeholderText, whichType }) => {
    const [text, setText] = useState("")

    const { quData } = useForExtractQuestionData()

    const { currentlyViewing, handleAdvancedSettings, handleContentDataUpdates } = useContext(FaqContext)

    useEffect(() => {
        // whichType === quData?.questionType.split(" ").join("_") && quData?.questionIdx === currentlyViewing?.quId && handleAdvancedSettings(currentlyViewing?.quId, { [whichType]: text })

        text && whichType === quData?.questionType.split(" ").join("_") && quData?.questionIdx === currentlyViewing?.quId && handleContentDataUpdates(currentlyViewing?.quId, { [whichType]: text })
    }, [text])

    console.log(quData, "quData", quData?.dynamicData, quData?.dynamicData && quData?.dynamicData[whichType])

    return (
        <div className="relative flex items-center">
            <input
                className="w-full outline outline-1 outline-transparent focus:outline-primary-focus hover:outline-primary-focus p-0.5 rounded-sm"
                type="text"
                // value={text}
                value={quData?.dynamicData && quData?.dynamicData[whichType]}
                // value={quData?.dynamicData?.whichType}
                // value={quData?.settingsData?.whichType}
                // defaultValue={quData?.settingsData?.whichType}
                onChange={e => setText(e.target.value)}
                placeholder={placeholderText}
                maxLength={maxLength ? maxLength : null}
            />
            {
                maxLength
                    ? <span className="absolute right-1 text-[11px] text-primary-content">{text.length} / {maxLength}</span>
                    : null
            }
        </div>
    )
}

const useForDynamicContentData = () => {
    const [dynamicData, setDynamicData] = useState();

    const { currentlyViewing, questionsAdded } = useContext(FaqContext);

    const findAndExtractData = () => {
        const quData = questionsAdded.find(item => item.questionIdx === currentlyViewing?.quId)

        const dynaData = quData?.dynamicData

        // console.log(quData, "qudata")
        setDynamicData(dynaData)
    }

    useEffect(() => {
        findAndExtractData()
    }, [questionsAdded, currentlyViewing])

    return { dynamicData }
}

export const LinearScaleQuestionMarkups = ({ }) => {

    // const {maxAndMin, setMaxAndMin} = useState({})

    // const handleMaxAndMin = (data) => setMaxAndMin(prev => ({...prev, ...data}))

    // useEffect(() => {
    //     handleMaxAndMin
    // })

    // const {dynamicData} = useForDynamicContentData()

    // console.log(dynamicData, "dynamicData")

    const { settingsData } = useForRetrivingQuestionSettingsData()

    // console.log(settingsData, "settingsData")

    // maxNum = contentSettings.settingsData?.high

    // const low = contentSettings.settingsData?.low

    // const renderScaling = () => settingsData?.max && settingsData?.min
    // ? Array.from(Array(settingsData?.max ? Number(settingsData?.max) : 5).keys()).map((keyNum, idx) => idx >= settingsData?.min && <span className="w-16 h-8 border border-dashed border-primary bg-transparent flex justify-center items-center rounded-md" key={keyNum}>{keyNum}</span>)
    // : scalingInitially()
    // // : "here scaling"

    const scalingInitially = (min, max) => Array.from(Array(max || 5).keys()).map((keyNum, idx) => idx >= (min || 0) && <ScalingMarkup key={keyNum} keyNum={keyNum} />)

    const renderAfterChange = (min, max) => Array.from(Array(settingsData?.max ? Number(max) : 5).keys()).map((keyNum, idx) => idx >= min && <ScalingMarkup key={keyNum} keyNum={keyNum} />)

    const renderScaling = () => settingsData?.max && settingsData?.min
        ? renderAfterChange(settingsData?.min, settingsData?.max)
        : scalingInitially(settingsData?.min, settingsData?.max)

    // const renderScaling = () => <ScalingMarkup keyNum={1} />

    const { currentContentRef } = useForScrollingIntoViewCurrentContent()

    return (
        <div ref={currentContentRef} className="flex flex-col gap-y-4 justify-center w-full h-[100vh] py-20">
            <NameQuestionAndDescription />
            <div className="flex justify-between w-full gap-4 mx-auto flex-wrap">
                {renderScaling()}
            </div>
        </div>
    )
}

const ScalingMarkup = ({ keyNum }) => <span className="w-16 h-8 border border-dashed border-primary bg-transparent flex justify-center items-center rounded-md">{keyNum}</span>

export const MultipleChoiceQuestionMarkups = ({ }) => <SingleChoiceQuestionMarkups />

export const SingleChoiceQuestionMarkups = ({ }) => {
    const { contentSettings, questionsAdded, currentlyViewing } = useContext(FaqContext);

    const { settingsData } = useForRetrivingQuestionSettingsData()

    const { handleToAddOptions, handleRemoveOption, options, handleOptionText } = useForHandlingOptions(contentSettings, settingsData)

    const handleAddNewOption = () => {
        handleToAddOptions({ id: uuidv4(), text: null })
    }

    const { currentContentRef } = useForScrollingIntoViewCurrentContent()

    // console.log("from component", settingsData)

    return (
        <div ref={currentContentRef} className="flex flex-col gap-y-4 justify-center w-full h-[100vh] py-20">
            <NameQuestionAndDescription />

            <RenderOptionsInputs options={options} handleRemoveOption={handleRemoveOption} handleOptionText={handleOptionText} />

            <button className="bg-primary rounded-md w-fit px-4" onClick={handleAddNewOption}>Add option</button>
            <button></button>
        </div>
    )
}

const useForRetrivingQuestionSettingsData = () => {
    const { currentlyViewing, questionsAdded } = useContext(FaqContext);

    const [settingsData, setSettingsData] = useState();

    const extractData = () => {
        const quId = currentlyViewing?.quId

        const getQuestionData = questionsAdded?.find(item => item.questionIdx === quId)

        // const settingsData = getQuestionData?.settingsData

        setSettingsData(getQuestionData?.settingsData)

        // console.log(quId, settingsData, getQuestionData, "from hook")
    }

    useEffect(() => {
        extractData();
    }, [currentlyViewing, questionsAdded])

    useEffect(() => {
        setSettingsData(undefined)
    }, [])

    return { settingsData }
}

const NameQuestionAndDescription = ({ placeholderText }) => {
    // const {currentlyViewing, questionsAdded} = useContext(FaqContext)
    const [data, setData] = useState({})

    const handleDataChange = (e, n) => setData(prev => ({ ...prev, [n]: e.target.value }))

    const { settingsData } = useForRetrivingQuestionSettingsData()

    const { handleContentDataUpdates, currentlyViewing } = useContext(FaqContext)

    const { quData } = useForExtractQuestionData()

    useEffect(() => {
        (data?.title || data?.description) && handleContentDataUpdates(currentlyViewing?.quId, data)
    }, [data])

    // useEffect(() => {
    //     setData({title: quData?.dynamicData?.title || "", description: quData?.dynamicData?.description || ""})
    // }, [])


    // console.log("fromComp", "!!", settingsData)

    // console.log(quData, quData?.dynamicData?.title, currentlyViewing)

    return (
        <div className="flex flex-col gap-y-2 my-4">
            <input
                className="relative bg-transparent outline outline-1 outline-transparent hover:outline-primary-focus focus:outline-primary-focus rounded-sm p-0.5"
                type="text"
                placeholder={placeholderText ? placeholderText : "Name your question"}
                onChange={e => handleDataChange(e, "title")}
                // defaultValue={quData?.dynamicData?.title}
                // value={data?.title}
                value={data?.title || quData?.dynamicData?.title || ""}
            />
            {
                // contentSettings?.settingsData?.Required ? 
                settingsData?.Required ?
                    <FaStar className="absolute text-[9px] text-secondary" />
                    : null
            }
            <input className="bg-transparent outline outline-1 outline-transparent hover:outline-primary-focus focus:outline-primary-focus rounded-sm p-0.5"
                type="text" placeholder="Description (optional)"
                onChange={e => handleDataChange(e, "description")}
                // defaultValue={quData?.dynamicData?.description}
                // value={data?.description}
                value={data?.description || quData?.dynamicData?.description || ""}
            />
        </div>
    )
}

const RenderOptionsInputs = ({ options, handleRemoveOption, handleOptionText }) => {
    const renderOptions = () => options.map((opt, idx) => <RenderInputElment key={opt + idx} handleRemoveOption={handleRemoveOption} opt={opt} idx={opt.id} handleOptionText={handleOptionText} />)

    return (
        <div className="flex flex-col gap-y-2">{renderOptions()}</div>
    )
}

const RenderInputElment = ({ opt, handleRemoveOption, idx, handleOptionText }) => {
    const [text, setText] = useState("")

    useEffect(() => {
        handleOptionText(idx, text)
    }, [text])

    return (
        <div className="relative flex items-center">
            <input className="w-full focus:outline-primary-focus rounded-sm p-0.5" type="text" placeholder="Option name" value={text} onChange={e => setText(e.target.value)} />
            <button className="absolute right-0 bg-primary hover:bg-primary-focus p-1 rounded-full text-xs"><ImCross onClick={() => handleRemoveOption(idx)} /></button>
        </div>
    )
}

const useForScrollingIntoViewCurrentContent = () => {
    const currentContentRef = useRef();

    useEffect(() => {
        currentContentRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    return { currentContentRef }
}

export const useForExtractQuestionData = () => {
    const { currentlyViewing, questionsAdded } = useContext(FaqContext);
    const findQu = questionsAdded?.find(item => item.questionIdx === currentlyViewing?.quId)

    return { quData: findQu }
}

const useForHandlingOptions = (contentSettings, settingsData) => {
    const [options, setOptions] = useState([])

    const { currentlyViewing, handleContentDataUpdates } = useContext(FaqContext);

    const { quData } = useForExtractQuestionData()

    // const findQu = questionsAdded?.find(item => item.questionIdx === currentlyViewing?.quId)

    // console.log(findQu?.settingsData, findQu?.dynamicData)

    const handleToAddOptions = (newOption) => setOptions(prev => [...prev, newOption])

    const handleOptionText = (idx, text) => {
        const moddedOptions = options.map(item => {
            if (item.id === idx) {
                item.text = text
            }
            return item
        })

        setOptions(moddedOptions)
    }

    const handleRemoveOption = (idx) => {
        const filtered = options.filter(opt => opt.id !== idx)
        setOptions(filtered)
    }

    useEffect(() => {
        // when Other_option is false removing that from list
        if (settingsData?.Other_option === false && quData?.questionIdx === currentlyViewing?.quId) {
            const filtered = options.filter(opt => opt.forOther !== true)
            // console.log(options, filtered, "check!!")
            setOptions(filtered)
        } else {
            // console.log(contentSettings, "!!")
            const filteredOtherOptionExists = options.filter(opt => opt.forOther === true)
            if (filteredOtherOptionExists.length) {
                return
            }

            // when Other_option is true then adding one more to list
            settingsData?.Other_option ? handleToAddOptions({ id: options.length, text: null, forOther: true }) : null
        }

    }, [settingsData])

    useEffect(() => {
        handleContentDataUpdates(currentlyViewing?.quId, options)
    }, [options])

    useEffect(() => {
        // quData?.questionIdx === currentlyViewing?.quId && console.log(quData?.dynamicData)
        // quData?.questionIdx === currentlyViewing?.quId && quData?.dynamicData?.length && setOptions(quData?.dynamicData)
        quData?.dynamicData?.length && setOptions(quData?.dynamicData)
        quData?.dynamicData?.length && console.log("HERE!!")
    }, [quData])

    // quData?.dynamicData?.length && console.log("HERE!!")

    return {
        options, handleToAddOptions, handleRemoveOption, handleOptionText
    }
}

