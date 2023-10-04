import { useContext, useEffect, useState } from "react"
import { questionTypes } from "./FaqEdit"
import { FaqContext, useForToggleState } from "../../../Pages/Exercise Pages/FormsQuestions/SpecificQuestionPage/SpecificQuestionPage"
import { BsFillInfoCircleFill } from "react-icons/bs"
import { ColorPicker, useForColorPicker } from "./ColorPicker"
import { ChooseBackgroundForFaq } from "../../AllModals/ChooseBackgroundForFaq/ChooseBackgroundForFaq"
import { useForExtractQuestionData } from "./QuestionsContentMarkUps"


export const EditableContentSettingsSidebarRight = ({ }) => {
    const { editableContentName, currentlyViewing } = useContext(FaqContext)

    return (
        <div className='flex flex-col gap-y-2 w-full pt-4'>
            <h2 className='font-semibold'>Settings - {currentlyViewing?.quId}</h2>
            <hr className='p-0' />
            <div className='flex flex-col gap-y-4 w-full'>

                <div className='flex flex-col gap-y-2'>
                    <h3 className='text-xs font-semibold'>Type</h3>
                    <TypeSelection />
                </div>

                <div className='flex flex-col gap-y-2 w-full'>
                    {
                        editableContentName === "Signature"
                            ? null
                            : <>
                                <h3 className='text-xs font-semibold'>Advanced Settings</h3>
                                <ShowQuestionSpecificSettings />
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

const ShowQuestionSpecificSettings = ({ }) => {
    const {quData} = useForExtractQuestionData()

    const content = (
        // editableContentName === "Welcome screen"
        quData?.questionType === "welcome screen"
            ? <SettingsForWelcomeScreen />
            : (quData?.questionType  === "Single choice")
                ? <SettingsForSingleChoice />
                : (quData?.questionType  === "Multiple choice")
                    ? <SettingsForMultipleChoice />
                    : quData?.questionType  === "Linear scale"
                        ? <SettingsForLinearScale />
                        : (quData?.questionType  === "Short answer")
                            ? <SettingsForShortAnswer />
                            : (quData?.questionType  === "Long answer")
                                ? <SettingsForLongAnswer />
                                : quData?.questionType  === "Image and text"
                                    ? <SettingsForImageAndText />
                                    : null
    )

    return content
}

const SettingsForImageAndText = ({ }) => {
    const { handleContentSettings, contentSettings, currentlyViewing } = useContext(FaqContext)

    return (
        <>
            <FormControlCheckBox labelText={"Required"} />

            {/* <AddImageSettings contentSettings={contentSettings} handleImageSelected={handleSetImage} /> */}
            <AddImageSettings contentSettings={contentSettings} />
        </>
    )
}

export const AddImageSettings = ({ }) => {
    const { handleTrue, handlefalse, isTrue } = useForToggleState()

    return (
        <div className="flex justify-between items-baseline gap-x-4 text-xs">
            <p className="flex gap-x-1 items-baseline">
                <span className="font-semibold">Image</span>
                <BsFillInfoCircleFill className="h-fit self-start text-slate-400 cursor-wait" title="png or jpg files. image width should be at least 335px for best resolution" />
            </p>

            <button className="text-primary-content no-underline underline-offset-1 hover:underline" onClick={handleTrue}>Add</button>

            {/* <input onChange={handleImageSelected} type="file" className="file-input file-input-bordered file-input-xs w-fit" /> */}

            {
                isTrue
                    // ? <ChooseBackgroundForFaq handleClose={handlefalse} isOpen={isTrue} handleImageSelected={handleImageSelected} contentSettings={contentSettings} />
                    ? <ChooseBackgroundForFaq handleClose={handlefalse} isOpen={isTrue} />
                    : null
            }
        </div>
    )
}

const SettingsForLongAnswer = ({ }) => {
    
    return (
        <>
            <FormControlCheckBox labelText={"Required"} />
        </>
    )
}

const SettingsForShortAnswer = ({ }) => {
    

    return (
        <>
            <FormControlCheckBox labelText={"Required"} />
        </>
    )
}

const FormControlCheckBox = ({ labelText }) => {
    const { handleTrue, handlefalse, isTrue } = useForToggleState()
    
    const {handleAdvancedSettings, currentlyViewing} = useContext(FaqContext)

    const truthyHandler = () => {
        // handleContentSettings({ [labelText.split(" ").join("_")]: true })

        // handleContentSettings({ [labelText.split(" ").join("_")]: true }, currentlyViewing?.quId)

        // console.log(currentlyViewing, "!!")
        handleAdvancedSettings(currentlyViewing?.quId, { [labelText.split(" ").join("_")]: true })
        handleTrue()
    }

    const falsyHandler = () => {
        // handleContentSettings({ [labelText.split(" ").join("_")]: false })
        // handleContentSettings({ [labelText.split(" ").join("_")]: false }, currentlyViewing?.quId)

        handleAdvancedSettings(currentlyViewing?.quId, { [labelText.split(" ").join("_")]: false })
        handlefalse()
    }

    const {quData} = useForExtractQuestionData()

    // console.log(quData?.settingsData?.Required, quData?.settingsData?.Other_option)

    return (
        <div className="form-control w-full">
            <label className="cursor-pointer label">
                <span className="label-text">{labelText}</span>
                <input
                    type="checkbox"
                    // value={quData?.settingsData?.Required || quData?.settingsData?.Other_option}
                    className="toggle toggle-accent toggle-sm" 
                    // checked={isTrue}
                    checked={quData?.settingsData?.Required || isTrue}
                    onChange={isTrue ? falsyHandler : truthyHandler}
                />
            </label>
        </div>
    )
}

const SettingsForLinearScale = ({ }) => {
    // const [maxAndMin, setMaxAndMin] = useState({})

    // const handleMaxAndMin = (data) => setMaxAndMin(prev => ({...prev, ...data}))

    // console.log(maxAndMin, "maxMin")

    

    return (
        <>
            <FormControlCheckBox labelText={"Required"}  />
            <div className="flex flex-col gap-y-2">
                <LableEdit options={[0, 1]} whichType="min" />
                <LableEdit options={[5, 6, 7, 8, 9]} whichType="max" />
            </div>
        </>
    )
}

const LableEdit = ({ options, whichType, handleType }) => {
    const { text, handleTextChange } = useForTextInput()

    return (
        <div className="flex gap-x-2 items-center relative">
            <SelectDropdown options={options} handleType={handleType} whichType={whichType} />
            <input className="w-full text-xs px-1 py-0.5" type="text" onChange={handleTextChange} placeholder="label (optional)" />
            <span className="text-xs absolute right-1">{text?.length || 0} / 12</span>
        </div>
    )
}

const SettingsForMultipleChoice = ({ }) => {
    
    return (
        <>
            <FormControlCheckBox labelText={"Required"}  />
            <FormControlCheckBox labelText={`Other option`}  />
        </>
    )
}

const SettingsForSingleChoice = ({ }) => {
    
    return (
        <>
            <FormControlCheckBox labelText={"Required"}  />
            <FormControlCheckBox labelText={`Other option`}  />
        </>
    )
}

const SettingsForWelcomeScreen = ({ }) => {
    const { handleTextChange: handlelabelText, text: labelText } = useForTextInput()

    const { handleTrue, handlefalse, isTrue } = useForToggleState()

    const { colorPicked, handleColorChange } = useForColorPicker();

    const { handleContentSettings } = useContext(FaqContext)

    // const { r, g, b, a } = colorPicked;

    const { handleStateObject, stateObject } = useForAdvancedSettingsReactiveVariables(handleContentSettings)

    useEffect(() => {
        handleStateObject({ colorPicked })
        handleStateObject({ labelText })
    }, [colorPicked, labelText])

    return (
        <div className="relative">
            {
                isTrue
                    ? <ColorPicker colorPicked={colorPicked} handleColorChange={handleColorChange} handleFalse={handlefalse} />
                    : null
            }
            <div className='flex flex-col gap-y-4 w-full'>
                <div className='flex flex-col gap-y-1'>
                    <p className='text-slate-600 text-xs'>Button background</p>
                    <div className='outline outline-primary-content rounded p-1 pl-2 flex gap-x-2 text-sm'>
                        <div
                            className={`w-7 h-7 bg-primary rounded-md cursor-auto outline-primary outline-none text-primary px-3`}
                            onClick={isTrue ? handlefalse : handleTrue}
                            style={{
                                // backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`
                                backgroundColor: `${colorPicked}`
                            }}
                        >
                        </div>
                        <input className="focus:outline-none" type="text" value={colorPicked} placeholder="#hexcode" disabled />
                    </div>
                </div>

                <div className='flex flex-col gap-y-1'>
                    <p className='text-slate-600 text-xs'>Button label</p>
                    <p className='outline outline-primary-content rounded p-1 pl-2 flex justify-between px-2 text-sm relative'>
                        <input className="focus:outline-none w-fit" type="text" value={labelText} onChange={handlelabelText} placeholder="Label here" />
                        <span className='text-[11px] text-primary absolute right-1'>{labelText?.length}/20</span>
                    </p>
                </div>

                <AddImageSettings />
            </div>
        </div>
    )
}

const TypeSelection = ({ }) => {

    const { handleShowEditableContent, editableContentName, currentlyViewing } = useContext(FaqContext)

    const renderOptions = () => questionTypes.map(item => {
        return (
            <option key={item.name} value={item.name}>
                {/* {item.icon} */}
                {item.name}
                {/* <p className="w-11 h-full">{item.icon}</p>
                <p>{item.name}</p> */}
            </option>
        )
    })

    const handleOnChange = (e) => {
        // console.log(e.target.value)
        handleShowEditableContent(e.target.value)
    }

    return (
        <select onChange={handleOnChange} className="select w-full max-w-xs select-sm" 
        // defaultValue={currentlyViewing?.name} 
        value={currentlyViewing?.name || editableContentName || -1}
        >
            <option value={-1} disabled>Pick Type</option>
            {renderOptions()}
        </select>
    )
}

const SelectDropdown = ({ options, whichType }) => {
    const { text: optionSelected, handleTextChange: handleOnChange } = useForTextInput()

    const { handleAdvancedSettings, currentlyViewing } = useContext(FaqContext);

    useEffect(() => {
        // handleType({[whichType]: optionSelected})
        // console.log({ [whichType]: optionSelected })
        handleAdvancedSettings(currentlyViewing?.quId, { [whichType]: optionSelected })
    }, [optionSelected])

    const renderOptions = () => options.map(opt => {
        return (
            <option key={opt} value={opt}>{opt}</option>
        )
    })

    // useEffect(() => {
    //     if (options.length === 2) {
    //         handleContentSettings({ low: optionSelected, high: 5 })
    //     } else {
    //         handleContentSettings({ low: 0, high: optionSelected })
    //     }
    // }, [optionSelected])

    return (
        <select value={optionSelected} defaultValue={options[0]} onChange={handleOnChange} className="select select-bordered select-xs w-14 max-w-xs">
            {/* <option disabled selected>Tiny</option> */}
            {renderOptions()}
        </select>
    )
}

const useForTextInput = () => {
    const [text, setText] = useState()

    const handleTextChange = (e) => setText(e.target.value)

    return {
        text, handleTextChange
    }
}

const useForAdvancedSettingsReactiveVariables = (handleContentSettings) => {
    const [stateObject, setStateObject] = useState({})

    const handleStateObject = (newItem) => setStateObject(prev => ({ ...prev, ...newItem }))

    const {handleAdvancedSettings, currentlyViewing} = useContext(FaqContext)

    useEffect(() => {
        handleContentSettings(stateObject, currentlyViewing?.quId)
        // console.log("settings hook!!", stateObject)
        handleAdvancedSettings(currentlyViewing?.quId, stateObject)
    }, [stateObject])

    return { stateObject, handleStateObject }
}

export const useForSelectImage = () => {
    const [image, setImage] = useState();

    const handleSetImage = (e) => {
        // console.log("image change!!", e.target.files)
        setImage(e.target.files[0])
    }

    return { image, handleSetImage }
}