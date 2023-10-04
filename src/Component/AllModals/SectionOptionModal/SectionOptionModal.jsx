import React, { useEffect, useState } from 'react'
import { FaAngleRight, FaBars, FaDumbbell, FaEllipsisH, FaFilter, FaPlus, FaPlusCircle, FaSearch, FaThLarge } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import Modal from 'react-responsive-modal'
import Loading from '../../../Shared/Loading/Loading'
import axios from 'axios'
import { BsShareFill } from 'react-icons/bs'
import ViewExerciseModal from '../ViewExerciseModal/ViewExerciseModal'
import { useDrag, useDrop } from 'react-dnd'
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu'
import Select from 'react-select'
import { TrackingFields, setTypes } from '../../../utils'
import TimeField from 'react-simple-timefield'
import { RenderSelect, selectItems } from '../AddNewProgramIntoLibraryModal/AddNewProgramIntoLibraryModal'
import "./styles.css"
import { useForToggleState } from '../../../Pages/Exercise Pages/FormsQuestions/SpecificQuestionPage/SpecificQuestionPage'

export const SectionOptionModal = ({ whichOptionIsClicked, closeParentModal }) => {
    const [show, setShow] = useState(true)
    const handleClose = () => {
        setShow(false);
        closeParentModal()
    }

    return (
        <Modal open={show}
            closeIcon={<ImCross />}
            onClose={handleClose}
            center
            classNames={{
                modal: 'p-5 pb-3 overflow-visible rounded-md max-w-[800px]',
                closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full z-50'
            }}>
            <ModalContents whichOptionIsClicked={whichOptionIsClicked} />
        </Modal>
    )
}

const Exercise = ({ exercise }) => {
    const [, drag] = useDrag(() => ({
        type: "EXERCISE",
        item: { exercise },
    }));
    //   console.log(exercise);
    return (
        <div ref={drag} className="border rounded-md hover:border-primary cursor-pointer">
            <img src={exercise.imageUrls[0]} alt="" className="h-24 w-full object-cover rounded-t-md" />
            <h2 className="p-2 text-sm font-medium hover:text-primary">{exercise.exerciseName}</h2>
        </div>
    );
};

const ModalContents = ({ whichOptionIsClicked }) => {
    // const [active, setActive] = useState(true);
    const [show, setShow] = useState(true);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exercises, setExercises] = useState([]);
    const [sets, setSets] = useState([0]);
    const [trackingField, settrackingField] = useState(["Reps"]);
    const [crossShow, setCrossShow] = useState("");
    const [type, setType] = useState({
        value: 'Regular',
        sign: 'R',
        color: '#faf74c'
    });

    // state data
    const [trainingSetsData, setTrainingSetsData] = useState({});
    const [exercisesData, setExercisesData] = useState({});
    const [workoutData, setWorkoutData] = useState({});

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "EXERCISE",
        drop: (item) => {
            // console.log(item);
            setSelectedExercises((prevExercises) => [...prevExercises, item.exercise]);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));
    const isActive = isOver;
    let backgroundColor = "#222";
    if (isActive) {
        backgroundColor = "darkgreen";
    } else if (drop) {
        backgroundColor = "darkkhaki";
    }

    // Get all Workouts---------
    useEffect(() => {
        const url = "https://aperio-server.vercel.app/api/v1/exercise/get-all-exercise";
        axios(url, {
            headers: {
                authorization: `bearer ${localStorage.getItem("userToken")}`,
            },
        })
            .then((res) => {
                // console.log(res?.data?.data);
                setExercises(res?.data?.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Set all exercises------------
    const options = exercises?.map((exercise) => ({
        value: exercise?._id,
        label: exercise?.exerciseName,
        imageUrl: exercise?.imageUrls[0],
    }));


    // Exercise Change options--------
    const [selectedOption, setSelectedOption] = useState();
    const [selectedOptonIndex, setSelectedOptionIndex] = useState(0)
    const handleChange = (selectedOption, index) => {
        // console.log(selectedOption, index);
        setSelectedOption(selectedOption);
        setSelectedOptionIndex(index)
    };

    const handleDrop = (event) => {
        event.preventDefault();
        console.log(event.dataTransfer.files);
        const droppedFiles = Array.from(event.dataTransfer.files);
        console.log("Dropped files:", droppedFiles);
        // console.log(drop);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };


    // console.log(selectedExercises);
    const hadleSet = (value) => {
        console.log(value);
    };

    const deleteSet = (value) => {

        if (value !== 0) {
            const newSets = sets.filter((item) => item !== value);
            setSets(newSets);
        }
    };

    const [showTrackingField, setShowTrackingField] = useState();
    // Handle Teacking field Show hide--------
    const showTracking = (exercise) => {
        setShowTrackingField(exercise?._id);
    };

    const hideTracking = () => {
        setShowTrackingField(false);
        settrackingField(["Reps"]);
        setSelectedTrackingFields(["Reps"]);
    };

    // handle hadleTrackingField--------
    const hadleTrackingField = (value) => {
        if (trackingField?.length < 3) {
            settrackingField([...trackingField, value]);
        }
    };
    // Delete Tracking Field -------
    const deleteTrackingField = (item) => {
        if (trackingField?.length > 1) {
            const restField = trackingField?.filter((field) => field !== item);
            settrackingField(restField);
        }
    };

    // Delelte Exercise form selected Exercise-------
    const deleteExercise = (exercise) => {
        const count = selectedExercises.filter((item) => item?._id === exercise?._id).length;

        if (count > 1) {
            const newArray = selectedExercises.filter((obj, index) => {
                if (obj?._id === exercise?._id) {
                    return index === selectedExercises.findIndex((item) => item?._id === exercise?._id);
                }
                return true;
            });
            setSelectedExercises(newArray);
            return;
        }

        const restExercise = selectedExercises?.filter((item) => item?._id !== exercise?._id);
        setSelectedExercises(restExercise);
    };

    const [openViewExercis, setOpenViewExercis] = useState(false);
    const [viewExercise, setViewExercise] = useState();

    // open Workout Modal-----------
    const onOpenViewExerciseModal = (exercise) => {
        setViewExercise(exercise);
        setOpenViewExercis(true);
    };
    const onCloseViewExerciseModal = () => setOpenViewExercis(false);


    const [selectedTrackingFields, setSelectedTrackingFields] = useState({ trackingField, i: 0 })
    // Save Selected Fields
    const saveFields = (index) => {
        console.log(index);
        setShowTrackingField(false);
        setSelectedTrackingFields({ trackingField, i: index })
    }


    // Input field format for four digit---------------
    const [formattedValue, setFormattedValue] = useState('');

    const handleInputChange = (e) => {
        const inputValue = e.target.value;

        const formattedInput = inputValue.replace(/\D/g, '');

        const truncatedValue = formattedInput.slice(0, 4);

        const formattedValueWithHyphens = truncatedValue
            .split('')
            .map((char, index) => {
                if (index === 1 || index === 2 || index === 3) {
                    return ` - ${char}`;
                }
                return char;
            })
            .join('');

        setFormattedValue(formattedValueWithHyphens);
    };




    return (
        <>
            <div className="max-h-screen relative">
                {/* Add Workout Modal------------------------------- */}
                <Modal open={openViewExercis} closeIcon={<ImCross />} onClose={onCloseViewExerciseModal} center classNames={{ modal: "p-0 overflow-visible rounded-md min-w-[850px]", closeButton: "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full" }}>
                    {/* <AddSingleClient onCloseModal={onCloseModal}></AddSingleClient> */}
                    <ViewExerciseModal onCloseViewExerciseModal={onCloseViewExerciseModal} exercise={viewExercise}></ViewExerciseModal>
                </Modal>

                <div className="flex shadow-xl">
                    {/* Left Side-------- */}
                    <div className={`w-2/5 p-5 shadow-inner border-r ${show ? "block" : "hidden"}`}>
                        <div className="mb-5 bg-gray-100 w-full px-4 py-2 border rounded-md items-center text-sm flex">
                            <FaSearch className="text-slate-400" />
                            <input type="search" placeholder="Search program" className="focus:outline-none px-3 bg-transparent w-full" />
                            <FaFilter className="text-slate-400" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-3">
                                <h2 className="text-[10px] font-medium">MOST RECENT (1523)</h2>
                                <div className="text-sm flex gap-2">
                                    <FaBars />
                                    <FaThLarge />
                                </div>
                            </div>
                            {/* exercise section------- */}

                            <div>
                                {loading && <Loading />}
                                <div className="grid grid-cols-2 gap-3 h-80 overflow-y-scroll pr-2">
                                    {exercises?.map((exercise) => (
                                        <Exercise key={exercise._id} exercise={exercise} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => setShow(!show)} className={`p-1 border rounded-full absolute top-1/2 ${show ? "left-[348px]" : "-left-3"}  bg-white z-50`}>
                        <FaAngleRight />
                    </button>

                    {/* Right Side----------- */}
                    <div className={`${show ? "w-3/5" : "w-full"} relative max-h-screen overflow-y-scroll`}>

                        <div className="bg-white z-10 w-[443px] flex justify-between items-center mt-6 px-7">
                            <input
                                className='w-3/4 p-1.5 rounded-md transition-all duration-300 outline outline-1 outline-transparent focus:outline-primary-focus hover:outline-primary-focus'
                                type="text"
                                placeholder='Name your section'
                                onChange={(e) => setWorkoutData({ ...workoutData, title: e.target.value, author: "thisCoachIdHere", tags: [], share: 0 })}
                            />

                            <Menu
                                align="end"
                                menuStyle={{ width: "290px" }}
                                menuButton={
                                    <MenuButton>
                                        <BsShareFill className='transition-all duration-300 outline outline-1 outline-transparent rounded-sm focus:outline-primary-focus hover:outline-primary-focus hover:bg-violet-200 px-1 text-xl' />
                                    </MenuButton>
                                }
                                transition>
                                <OwnershipDropDown />
                            </Menu>
                        </div>

                        <div className="p-7 mt-0 flex gap-2 flex-col">
                            <label className="font-light text-[10px] text-slate-400">INSTRUCTIONS</label>

                            <input
                                className='w-full p-2 rounded-md transition-all duration-300 outline outline-1 outline-transparent focus:outline-primary-focus hover:outline-primary-focus'
                                type="text" placeholder='Add Instructions'
                                onChange={(e) => setWorkoutData({ ...workoutData, description: e.target.value })}
                            />
                        </div>

                        {/* Format and Type section */}
                        <div className='px-7 mt-0 mb-7 flex gap-2 justify-between'>
                            <SectionFormat whichOptionIsClicked={whichOptionIsClicked} />
                            {
                                whichOptionIsClicked === "Freestyle"
                                    ? null
                                    : <>
                                        <SectionType />
                                        <TimeDuration whichOptionIsClicked={whichOptionIsClicked} />
                                    </>
                            }
                        </div>

                        {/* Drag and Drop section start---------- */}

                        <div className="px-7">
                            <div className={`p-0 border border-dashed border-primary rounded-md flex justify-center ${isOver ? "bg-gray-100" : ""}`} ref={drop}>
                                <div className="flex items-center w-1/2 gap-2">
                                    <div className="bg-sky-50 p-2 rounded-sm">
                                        <FaDumbbell className="text-2xl text-gray-400" />
                                    </div>
                                    <h2 className="text-gray-400">Drag exercises from the left to add</h2>
                                </div>
                            </div>
                        </div>

                        {/* Drag and drop file--------- */}
                        {selectedExercises?.map((exercise, index) => (
                            <div key={index} className="m-7 p-5 border rounded-md shadow-lg ">
                                <div className="flex gap-2 items-center">
                                    {
                                        selectedOptonIndex === index ?
                                            <img src={selectedOption?.imageUrl ? selectedOption?.imageUrl : exercise?.imageUrls[0]} alt="" className="w-10 rounded-sm object-cover" />
                                            :
                                            <img src={exercise?.imageUrls[0]} alt="" className="w-10 rounded-sm object-cover" />
                                    }


                                    <Select className="w-full"
                                        onChange={(selectedOption) => handleChange(selectedOption, index)}
                                        value={selectedOption}
                                        defaultValue={options[0]}
                                        imgSrc={(option) => option?.imageUrl}
                                        options={options} />

                                    <div className="hover:bg-sky-100 rounded-sm p-2 cursor-pointer">
                                        <FaUndo className="text-gray-400" />
                                    </div>
                                    <div className="hover:bg-sky-100 rounded-sm cursor-pointer text-sm">
                                        <Menu
                                            align="end"
                                            menuButton={
                                                <MenuButton className="p-1">
                                                    <FaEllipsisH className="text-gray-400 text-lg" />
                                                </MenuButton>
                                            }
                                            transition>
                                            <MenuItem onClick={() => onOpenViewExerciseModal(exercise)}>
                                                <div
                                                    // onClick={(e) => hadleEditNote(e, note?._id)}
                                                    className="text-gray-600 flex gap-2 items-center">
                                                    <FaEye className=" " />
                                                    <p className="">View Exercise</p>
                                                </div>
                                            </MenuItem>
                                            <MenuItem>
                                                <div onClick={() => showTracking(exercise)} className="text-gray-600 flex gap-2 items-center">
                                                    <FaPen className=" " />
                                                    <p className="">Customize fields</p>
                                                </div>
                                            </MenuItem>
                                            <MenuItem>
                                                <div
                                                    // onClick={(e) => hadleEditNote(e, note?._id)}
                                                    className="text-gray-600 flex gap-2 items-center">
                                                    <TbArrowFork className=" " />
                                                    <p className="">Add Alternate Exercises</p>
                                                </div>
                                            </MenuItem>
                                            <MenuItem>
                                                <div onClick={() => setSelectedExercises([...selectedExercises, exercise])} className="text-gray-600 flex gap-2 items-center">
                                                    <FaRegCopy className=" " />
                                                    <p className="">Duplicate</p>
                                                </div>
                                            </MenuItem>
                                            <MenuItem onClick={() => deleteExercise(exercise)}>
                                                <div className="text-gray-600 flex gap-2 items-center">
                                                    <FaRegTrashAlt className=" " />
                                                    <p className="">Delete</p>
                                                </div>
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </div>

                                <div className={`bg-slate-100 p-3 rounded-md my-3 ${showTrackingField === exercise?._id ? "block" : "hidden"}`}>
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-[10px] font-medium">SELECT TRACKING FIELDS</h2>
                                        <div className="flex gap-3">
                                            <button onClick={hideTracking} className="text-sm text-red-600 hover:underline">
                                                Cancel
                                            </button>
                                            <button onClick={() => saveFields(index)} className="text-sm px-3 text-primary font-medium border border-primary rounded-md hover:bg-primary hover:text-white duration-300">Save</button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between mt-5">
                                        <div className="flex gap-2 items-center">
                                            {trackingField?.map((item, i) => (
                                                // console.log(item)
                                                <div key={i} onMouseOver={() => setCrossShow(item)} onMouseOut={() => setCrossShow("")} className="px-2 flex items-center rounded-md shadow-md bg-white border border-gray-400 relative">
                                                    {trackingField?.length > 1 && (
                                                        <button onClick={() => deleteTrackingField(item)} className={`absolute -top-2 -right-2 bg-black text-[5px] p-1 text-white rounded-full ${crossShow === item ? "block" : "hidden"}`}>
                                                            <ImCross />
                                                        </button>
                                                    )}
                                                    <p><span className="font-semibold text-gray-500">{i + 1}. </span> {item}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <Menu
                                            align="end"
                                            menuButton={
                                                <MenuButton className={`${trackingField?.length === 3 && "hidden"}`}>
                                                    <div className="px-6 py-2 bg-white hover:bg-gray-100 duration-500 text-gray-500 rounded-md text-xs border">
                                                        <FaPlus />
                                                    </div>
                                                </MenuButton>
                                            }
                                            transition>
                                            {TrackingFields?.map((item, i) => (
                                                <MenuItem key={i} className="text-base" onClick={() => hadleTrackingField(item?.name)}>
                                                    <p className="text-sm font-semibold">{item?.name}</p>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                </div>

                                {/* Set Tracking fields.------ */}
                                <div className="my-3">
                                    <div className="flex justify-around text-xs text-gray-500 mb-2">
                                        <p>Set</p>
                                        {
                                            selectedTrackingFields?.trackingField?.map((field, i) =>
                                                <p key={i}>{field}</p>
                                            )
                                        }
                                        <p>Rest</p>
                                    </div>
                                    <div className="">
                                        {sets?.map((item, i) => (
                                            <div key={i} className="border hover:bg-slate-100 rounded-md py-2 flex justify-around items-center text-sm relative">
                                                <FaRegTimesCircle onClick={() => deleteSet(item)} className="absolute text-lg -left-[10px] top-[14px] text-primary" />
                                                <Menu
                                                    align="center"
                                                    menuStyle={{ minWidth: '10px', }}
                                                    menuButton={
                                                        <MenuButton className="p-1">
                                                            {/* <FaEllipsisH className="text-gray-400 text-lg" /> */}
                                                            <div className="px-2 hover:bg-white  flex items-center gap-2">
                                                                <p style={{ color: `${type?.color}` }} className="font-bold">{type?.sign}</p>
                                                                <FaAngleDown />
                                                            </div>
                                                        </MenuButton>
                                                    }
                                                    transition>
                                                    {
                                                        setTypes?.map((type, i) =>
                                                            <MenuItem key={i} onClick={() => setType(type)} className='px-5'>
                                                                <div className="flex gap-2 items-center">
                                                                    <h2 style={{ color: `${type?.color}` }} className={`text-sm font-bold `}>{type?.sign}</h2>
                                                                    <p>{type?.value}</p>
                                                                </div>
                                                            </MenuItem>
                                                        )
                                                    }

                                                </Menu>

                                                <div>
                                                    {
                                                        selectedTrackingFields?.trackingField?.map((type, i) =>
                                                            <>
                                                                {
                                                                    type === 'Time' ?
                                                                        <TimeField
                                                                            showSeconds
                                                                            value={0}
                                                                            style={{
                                                                                width: 75,
                                                                                color: "#333",
                                                                            }}
                                                                            // onChange={this.onTimeChange}
                                                                            onChange={(e) => setTrainingSetsData({ ...trainingSetsData, rest: e.target.value })}
                                                                            className="px-2 py-[2px] hover:border-primary border border-base-100 focus:border-primary  rounded-sm focus:border focus:outline-none"
                                                                        />
                                                                        :
                                                                        <input
                                                                            onChange={(e) => {
                                                                                setTrainingSetsData({ ...trainingSetsData, reps: e.target.value });
                                                                                setExercisesData({ ...exercisesData, exercise: exercise._id, author_id: "thisCoachIdHere" });
                                                                            }}
                                                                            type="text"
                                                                            id=""
                                                                            className="px-4 py-[2px] w-16 hover:border-primary border border-base-100 focus:border-primary rounded-sm focus:border focus:outline-none"
                                                                            placeholder="-"
                                                                            maxLength={3}
                                                                        />
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </div>


                                                <TimeField
                                                    value={0}
                                                    style={{
                                                        width: 60,
                                                        color: "#333",
                                                    }}
                                                    // onChange={this.onTimeChange}
                                                    onChange={(e) => setTrainingSetsData({ ...trainingSetsData, rest: e.target.value })}
                                                    className="px-2 py-[2px] hover:border-primary border border-base-100 focus:border-primary  rounded-sm focus:border focus:outline-none"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between">
                                    <div className="flex gap-4 items-center">
                                        <div className="text-xs flex gap-3 items-center">
                                            <input onChange={(e) => setExercisesData({ ...exercisesData, each_side: e.target.checked })} type="checkbox" name="" id="" />
                                            <p>Each Side</p>
                                        </div>

                                        <input
                                            type="text"
                                            value={formattedValue}
                                            onChange={handleInputChange}
                                            placeholder="X - X - X - X"
                                            className="px-2 text-center w-24 font-semibold text-sm py-1 hover:border-primary hover:border hover:bg-transparent focus:outline-none focus:bg-transparent bg-gray-100 border rounded-sm "
                                        />
                                    </div>


                                    <div className="text-xs  flex items-center">
                                        <button onClick={() => setSets([...sets, sets?.length - 1 + 1])} className="px-3 py-2 border rounded-l-md hover:border-primary hover:border-l">
                                            Add Set
                                        </button>

                                        <Menu
                                            align="end"
                                            menuButton={
                                                <MenuButton className="h-full">
                                                    <button className="px-3 py-2 border border-l-0 hover:border-primary hover:border-l bg-slate-100 h-full text-gray-400 rounded-r-md">
                                                        <FaPlus />
                                                    </button>
                                                </MenuButton>
                                            }
                                            transition>
                                            {AllSets?.map((set, i) => (
                                                <MenuItem key={i} className="text-base">
                                                    <button onClick={(e) => hadleSet(set?.value)} className="text-gray-600">
                                                        <p className="">+ {set?.item}</p>
                                                    </button>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                </div>
                                <input onChange={(e) => setExercisesData({ ...exercisesData, note: e.target.value })} type="text" className="px-3 w-full mt-2 py-2 border border-gray-100 focus:outline-none focus:border-primary bg-gray-100 rounded-md text-xs" placeholder="Add note for this exercise" />
                            </div>
                        ))}

                        {/* Drag and Dropt Section end--------- */}
                        <div className="pt-3 pb-10 flex flex-col gap-3 w-full px-7">
                            <button className="flex gap-2 px-8 py-2 bg-sky-50 items-center duration-500 justify-center hover:bg-primary text-primary hover:text-white w-full rounded-sm">
                                {" "}
                                <FaPlus className="text-xs" /> Add Exercise
                            </button>

                            {
                            whichOptionIsClicked === "Freestyle"
                                ? <ListExercises exercises={exercises} />
                                : null
                        }
                        </div>
                    </div>
                </div>

                {/* bottom section----------- */}
                <hr />
                <SaveAndCloseButtons />
            </div>
        </>
    );
}

const ListExercises = ({ exercises }) => {
    const { handleTrue, handlefalse, isTrue } = useForToggleState()

    const renderExercisesList = () => exercises.map(item => {
        return (
            <div className='flex gap-x-2 items-center transition-all duration-300 hover:bg-primary-focus rounded-sm px-2'>
                <img className='w-4 h-4' src={item.imageUrls[0]} alt={item.exerciseName} />
                <span>{item.exerciseName}</span>
            </div>
        )
    })

    return (
        <>
            <button
                className='flex gap-x-2 items-center text-slate-700 transition-all duration-300 hover:text-primary-focus'
                onClick={isTrue ? handlefalse : handleTrue}
            >
                {
                    isTrue
                        ? null
                        : <FaPlusCircle />
                }
                <span className='font-medium text-sm'>List Exercises (optional)</span>
            </button>
            {
                isTrue
                    ? <div className='relative'>
                        <h2 className='font-semibold text-sm my-2'>Most recent</h2>
                        <div className='flex flex-col gap-y-2 h-20 overflow-y-scroll scroll-smooth shadow-md'>
                            {renderExercisesList()}
                        </div>
                    </div>
                    : null
            }
        </>
    )
}

const OwnershipDropDown = () => {
    const [text, setText] = useState();

    const renderSelects = () => selectItems.map((item, idx) => <RenderSelect key={idx} item={item} text={text} setText={setText} />)

    return (
        <div className='flex flex-col gap-y-4 p-5 py-2 pt-0'>
            <h2 className='font-semibold text'>Ownerships</h2>

            {renderSelects()}
        </div>
    )
}

const SaveAndCloseButtons = () => {
    return (
        <div className='px-0 py-3 flex gap-2 justify-end'>
            <button className='px-7 py-1 bg-slate-400 hover:bg-slate-300 rounded-sm text-white hover:text-slate-600'>Save</button>
            <button className='px-2 py-1 bg-primary hover:bg-primary-focus rounded-sm text-white'>Save & Close</button>
        </div>
    )
}

const AddExercise = () => {
    return (
        <div className='flex flex-col gap-y-6'>
            <div className='h-11 outline-dotted outline-1 flex justify-center items-center text-slate-400 rounded-sm'>Drag and drop</div>
            <button className='flex gap-2 justify-center items-center w-full bg-green-200 rounded-sm py-1 text-xs font-light transition-all duration-300 hover:text-white hover:bg-primary hover:font-bold'><FaPlus className='' /> Add Exercise</button>
        </div>
    )
}

const SectionFormat = ({ whichOptionIsClicked }) => {
    const renderItems = () => formatItems.map(item => <option className='flex justify-between w-full font-normal bg-violet-100' key={item.name} title={item.info} value={item.name}><span>{item.name}</span></option>)

    return (
        <div className='w-full'>
            <p className='text-[9px] text-slate-400'>SECTION FORMAT</p>
            <select defaultValue={whichOptionIsClicked} className="select select-xs w-full max-w-xs font-normal rounded-sm transition-all duration-300 outline outline-1 focus:outline-primary-focus hover:outline-primary-focus">
                <option className='bg-violet-50' disabled selected>Pick Format</option>
                {renderItems()}
            </select>
        </div>
    )
}

const TimeDuration = ({ whichOptionIsClicked }) => {
    const [mins, setMins] = useState()

    const handleOnChangeAmrap = e => {
        const val = e.target.value;
        if (whichOptionIsClicked === "Timed" && val.length > 2) return
        if (val.length > 3) return
        setMins(val)
    }

    const { handleTrue, handlefalse, isTrue } = useForToggleState()

    return (
        whichOptionIsClicked !== "Regular"
            ?
            <div className="relative" 
            // onMouseEnter={handleTrue} onMouseLeave={handlefalse}
            onMouseEnter={whichOptionIsClicked === "Interval" ? handleTrue : null} 
            onMouseLeave={whichOptionIsClicked === "Interval" ? handlefalse : null}
            >
                {
                    isTrue
                        ? <div className='absolute w-36 text-[12px] -top-20 -right-4 bg-slate-800 opacity-90 text-primary p-1.5 rounded-md text-justify'>
                            The duration is calculated based on the workout and rest times for each of the exercises
                        </div>
                        : null
                }
                <p className='text-[9px] text-slate-400'>DURATION (MIN)</p>
                <div className='flex items-center relative'>

                    <input className='removeArrowSpinner my-0.5 outline-1 hover:outline-primary-focus focus:outline-primary-focus' type="number" id="mins"
                        name="mins" min="0" max={whichOptionIsClicked === "Timed" ? "99" : "999"} value={mins}
                        onChange={handleOnChangeAmrap}
                        disabled={whichOptionIsClicked === "Interval"}
                    />
                    
                    {
                        whichOptionIsClicked === "Timed"
                            ? <span className='absolute right-1 z-20 text-xs'>rounds</span>
                            : <span className='absolute right-1 z-20 text-xs'>min</span>
                    }
                </div>
            </div>
            : null
    )
}

const SectionType = () => {
    const renderItems = () => types.map(name => <option className='font-normal bg-violet-100' key={name} value={name}>{name}</option>)

    return (
        <div className='w-full'>
            <p className='text-[9px] text-slate-400'>SECTION TYPE</p>
            <select defaultValue={"Workout"} className="select select-xs w-full max-w-xs font-normal rounded-sm transition-all duration-300 outline outline-1 focus:outline-primary-focus hover:outline-primary-focus">
                <option className='bg-violet-50' disabled selected>Pick Type</option>
                {renderItems()}
            </select>
        </div>
    )
}

const formatItems = [
    { name: "Regular", info: "Exercise by exercise, mostly used for strength workouts" },
    { name: "AMRAP", info: "Track total rounds completed based on time assigned" },
    { name: "Timed", info: "Track total duration based on rounds assigned" },
    { name: "Interval", info: "Runs built in timer for exercise and rest (HIIT, Tabata, Circuit)" },
    { name: "Freestyle", info: "Best for warmups, crossfits or any other follow along videos" },
]

const types = ["Workout", "Warm up", "Cool down", "Recovery"]