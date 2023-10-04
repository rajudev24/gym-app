/* eslint-disable react/prop-types */
import { useContext } from "react";
import {
  FaAngleRight,
  FaCog,
  FaFilter,
  FaPlus,
  FaPlusCircle,
  FaSearch,
  FaTags,
} from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import ToggleLeftContext from "../../Context/ToggleLeftContext";
import Modal from "react-responsive-modal";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import AddNewExerciseModal from "../AllModals/AddNewExerciseModal/AddNewExerciseModal";
import { Menu, MenuItem, FocusableItem, MenuButton } from "@szhsin/react-menu";
import AddNewTagModal from "../AllModals/AddNewTagModal/AddNewTagModal";
import ManageTagModal from "../AllModals/ManageTagModal/ManageTagModal";
import { NewWorkoutTypeSelectionModal } from "../AllModals/NewWorkoutTypeSelectionModal/NewWorkoutTypeSelectionModal";
import { CreateWorkoutFromTemplateModal } from "../AllModals/CreateWorkoutFromTemplateModal/CreateWorkoutFromTemplateModal";
import { AddNewSectionModal } from "../AllModals/AddNewSectionModal/AddNewSectionModal";
import { CreateWorkoutFromScratchModal } from "../AllModals/CreateWorkoutFromScratchModal/CreateWorkoutFromScratchModal";
import { AddNewProgramIntoLibraryModal } from "../AllModals/AddNewProgramIntoLibraryModal/AddNewProgramIntoLibraryModal";
import { AddNewTaskModal } from "../AllModals/AddNewTaskModal/AddNewTaskModal";
import NavBarRightSide from "../../Shared/NavBarRightSide/NavBarRightSide";

// import TagSearch from "./TagSearch";

export default function ExerciseFilter({ modalActionText }) {
  const [open, setOpen] = useState(false);
  const [addNewTag, setAddNewTag] = useState(false);
  const [manageTag, setManageTag] = useState(false);
  const [filter, setFilter] = useState("");
  const [workoutType, setWorkoutType] = useState("");

  // Add New Exercise Modal----------
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const handleWorkoutType = (name) => setWorkoutType(name);

  // Add New Tag modal----------------
const onOpenNewTagModal = () =>
{
 setAddNewTag(true);
}
  
  
  const onCloseNewTagModal = () => setAddNewTag(false);

  // Manage Tag Modal---------------------

  const onOpenManageTagModal = () => setManageTag(true);
  const onCloseManageTagModal = () => setManageTag(false);

  const toggleLeft = useContext(ToggleLeftContext);

  const tags = ['-','Abdominals', "Agility", "Adductors", "Arms", "BIceps", 'Calves', 'Chest', 'Conditioning', 'Forearms', 'Glutes', 'Hamstrings', 'Hip', 'Lats', 'Lower Back', 'Lower Pull', 'Lower Pull', 'Middle Back', 'Movement Prep', 'Neck', 'Quadriceps', 'Shoulders', 'Speed', 'Strength', 'Speed', 'Strength', 'Traps', 'Triceps', 'Upper Push', 'Upper Pull', 'Legs', 'Power', 'Stability', 'Power', 'Full Body'];


  //Search Bar
  

  // making sure which route is on for showing relevant modal on user interaction
  const inSectionsRoute = () =>
    window.location.href.includes("exersise/sections");

  const inWorkoutsRoute = () =>
    window.location.href.includes("exersise/workouts");

  const isExerciseRoute = () => window.location.href.includes("exersise");

  const urlTokens = window.location.href.split("/");
  const tosTokens = urlTokens[urlTokens.length - 1];

  const isProgramsRoute = () => tosTokens === "programs";

  const isTasksRoute = () => tosTokens === "tasks";

  // console.log(isProgramsRoute(), tosTokens)


  // const [openresult, setOpenresult] = useState('false')
  // const searchOpen = () =>{
  //   console.log('asi');
    // if(openresult == 'false'){

    // }
  // }


  // const [filtertag, setFiltertag] = useState([])
  // const handleSearch = (e)=>{
  //   tags.filter((item)=>{
  //     console.log(item);
  //       let searchArr = []
  //       if (e.target.value.length == 0){
  //         setFiltertag([])
  //       }
  //       userlists.filter((item)=>{
  //           console.log(item);
  //           if (item.username.toLowerCase().includes(e.target.value.toLowerCase())){
  //             searchArr.push(item)
  //             setFiltertag(searchArr)

  //           }
  //       })
  //   })
  // }
  
const [input, setInput] = useState('')
const [todos, setTodos] = useState([])
console.log(todos, 'todoname');
console.log(input, 'inputname');




  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
          <h2 className="text-2xl font-semibold">Exercise Library</h2>
        </div>
        <NavBarRightSide></NavBarRightSide>
      </div>
      <div className="mt-8 flex justify-between items-center">
        <div className="flex ">
          <div className=" px-3 bg-slate-100 w-72 py-1 text-gray-500 rounded-md items-center flex">
            <FaSearch />
            <input
              type="search"
              placeholder="Search "
              className="focus:outline-none px-3 bg-transparent"
            />
          </div>

          {/* Add Filter------------- */}
          <Menu
            menuButton={
              <MenuButton>
                <div className="flex gap-2 ml-2 border text-sm px-6 py-1 items-center rounded-md">
                  <FaFilter />
                  <p>Filter</p>
                </div>
              </MenuButton>
            }
            arrow={true}
            align="center"
          >
            <div className="w-[400px] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200 overflow-scroll">
              <div className="h-96">
                <div className="flex justify-between  items-center px-5">
                  <h2 className=" font-semibold my-2">Exercise Filter</h2>
                  <button className="text-sm font-semibold text-primary hover:underline">
                    Clear All
                  </button>
                </div>
                <div className="collapse">
                  <input type="checkbox" />
                  <div className="collapse-title flex justify-between items-center px-5 p-0 min-h-0 bg-none font-medium">
                    Exercie Form
                    <FaAngleRight className="text-xl" />
                  </div>
                  <div className="collapse-content flex gap-4 mt-2">
                    <div className="flex gap-2">
                      <input type="checkbox" name="" id="" />
                      <p>Everfit</p>
                    </div>
                    <div className="flex gap-2">
                      <input type="checkbox" name="" id="" />
                      <p>Custom Exercises</p>
                    </div>
                  </div>
                </div>
                <hr />
                  <div className="px-5 py-3 border-b-2 rounded-none form-control w-full">
                    <label className="cursor-pointer label flex justify-between items-center">
                      <span className="font-semibold">
                        Exercises With Video
                      </span>
                      <input
                        type="checkbox"
                        className="toggle toggle-sm toggle-primary"
                      />
                    </label>
                  </div>
                <div className="collapse  border-b-2 rounded-none">
                  <input type="checkbox" />
                  <div className="collapse-title flex justify-between items-center px-5  min-h-0 bg-none font-medium">
                    Tags
                    <FaAngleRight className="text-xl" />
                  </div>
                  
                  
                  <div className="collapse-content  mt-2">
                  <input
                  // onChange={handleSearch}
              type="search"
              placeholder="Search or choose a tag"
              className="focus:outline-primary w-full rounded-sm border py-3 px-3 bg-white"
            />
          </div>
                <div className="w-full" >

                  </div>
                </div>
                <div className="collapse border-b-2 rounded-none">
                  <input type="checkbox" />
                  <div className="collapse-title flex justify-between items-center px-5 p-0 min-h-0 bg-none font-medium">
                    Category
                    <FaAngleRight className="text-xl" />
                  </div>
                  <div className="collapse-content flex flex-wrap px-5  gap-5 mt-2">
                    <div className="flex gap-2">
                      <input type="checkbox" name="" id="" />
                      <p>Strength</p>
                    </div>
                    <div className="flex gap-2">
                      <input type="checkbox" name="" id="" />
                      <p>BodyBuild</p>
                    </div>
                    <div className="flex gap-2">
                      <input type="checkbox" name="" id="" />
                      <p>Timed</p>
                    </div>
                    <div className="flex gap-2">
                      <input type="checkbox" name="" id="" />
                      <p>Distance (Long)</p>
                    </div>
                    <div className="flex gap-2">
                      <input type="checkbox" name="" id="" />
                      <p>Distance (Short)</p>
                    </div>
                  </div>
                </div>
                <div className="collapse  rounded-none">
                  <input type="checkbox" />
                  <div className="collapse-title flex justify-between items-center px-5 p-0 min-h-0 bg-none font-medium">
                    Primary Focus
                    <FaAngleRight className="text-xl" />
                  </div>
                  <div className="collapse-content flex flex-wrap px-2  gap-3 mt-2">
                  {
                        tags?.map(element =>
                            <div key={element} >
                                  <div className='bg-secondary border-none  text-primary font-semibold rounded-full px-4 py-2'>
                                        <h2 className='text-sm'>{element}</h2>
                                    </div>

                                    
                                <hr />
                            </div>
                        )
                    }
                  </div>
                </div>
              </div>
            </div>
            {/* <MenuItem className='px-3 flex gap-2 text-sm text-gray-800' > </MenuItem> */}

            <hr className="mt-4" />
            <div className="flex justify-end items-center px-4 py-2">
              <button className="text-center bg-primary text-white text-sm font-semibold px-4 py-1 rounded-md ">
                Update
              </button>
            </div>
          </Menu>
        </div>
        <div className="flex">
          {/* Add Tags-------- */}
          <Menu
            menuButton={
              <MenuButton>
                <div className="flex gap-2 border p-1 px-6 items-center rounded-md text-sm">
                  <FaTags />
                  <p> Tags</p>
                </div>
              </MenuButton>
            }
            onMenuChange={(e) => e.open && setFilter("")}
            align="end"
          >
            <FocusableItem className="px-5 w-full">
              {({ ref }) => (
                <input
                  ref={ref}
                  type="text"
                  placeholder="Type to filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border w-64 px-4 py-1 rounded-md focus:outline-none"
                />
              )}
            </FocusableItem>
            <div className="px-5">
              <h2 className="text-sm font-semibold my-2">Most Recent</h2>
              {
                todos.map((todo)=>(
                  <li key={todo.id}>
                    <input type="checkbox" name="" id="" disabled className="mr-2" />
                    <input type="text" value={todo.title} onChange={e=>e.preventDefault()} />
                  </li>
                ))
              }

            </div>

            <hr className="mt-4" />
            <div className="flex justify-between items-center px-4 py-2">
              <div className="text-sm text-secondary justify-center flex gap-4 items-center">
                <button
                  onClick={onOpenNewTagModal}
                  className="flex gap-1 items-center"
                >
                  <FaPlusCircle />
                  <h2 >Create</h2>

                </button>
                {/* Add New Tag Modal---------------- */}
                <Modal
                  open={addNewTag}
                  closeIcon={<ImCross />}
                  onClose={onCloseNewTagModal}
                  center
                  classNames={{
                    modal: "p-0 overflow-visible rounded-md w-1/3",
                    closeButton:
                      "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
                  }}
                >
                  
                  <AddNewTagModal  setInput={setInput} input={input} todos={todos} setTodos={setTodos}
                    onCloseModal={onCloseNewTagModal}
                  ></AddNewTagModal>
                </Modal>

                <button
                  onClick={onOpenManageTagModal}
                  className="flex gap-1 items-center"
                >
                  <FaCog />
                  <h2>Manage</h2>
                </button>
                {/* Manage Tag Modal----------- */}
                <Modal
                  open={manageTag}
                  closeIcon={<ImCross />}
                  onClose={onCloseManageTagModal}
                  center
                  classNames={{
                    modal: "p-0 overflow-visible rounded-md w-2/5",
                    closeButton:
                      "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
                  }}
                >
                  <ManageTagModal 
                  setInput={setInput} input={input} todos={todos} setTodos={setTodos}
                    onOpenNewTagModal={onOpenNewTagModal}
                    onCloseModal={onCloseManageTagModal}
                  ></ManageTagModal>
                </Modal>
              </div>
              <button className="bg-gray-300 text-center text-white text-sm font-semibold px-4 py-1 rounded-md ">
                Apply
              </button>
            </div>
          </Menu>

          <button
            onClick={onOpenModal}
          // onClick={handleOpenWorkoutTypeSelectionModal}
          >
            <div className="flex gap-2 ml-2 p-1 px-6 items-center rounded-md bg-primary text-white">
              <FaPlus />
              <p className="text-sm">
                {modalActionText ? modalActionText : "Add New Exercie"}
              </p>
            </div>
          </button>

          {/* add new Workout modal */}
          {isTasksRoute() ? (
            <AddNewTaskModal isOpen={open} handleClose={onCloseModal} />
          ) : isProgramsRoute() ? (
            <AddNewProgramIntoLibraryModal
              isOpen={open}
              handleClose={onCloseModal}
            />
          ) : inSectionsRoute() ? (
            <AddNewSectionModal isOpen={open} handleClose={onCloseModal} />
          ) : isExerciseRoute() && !inWorkoutsRoute() ? (
            <Modal
              open={open}
              closeIcon={<ImCross />}
              onClose={onCloseModal}
              center
              classNames={{
                modal: "p-0 overflow-visible rounded-md w-4/5",
                closeButton:
                  "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
              }}
            >
              <AddNewExerciseModal
                onCloseModal={onCloseModal}
              ></AddNewExerciseModal>
            </Modal>
          ) : inWorkoutsRoute() ? (
            <NewWorkoutTypeSelectionModal
              isOpen={open}
              handleClose={onCloseModal}
              handleSelectedType={handleWorkoutType}
            />
          ) : null}

          {/* show selected workout creating type (template / new) modal */}
          {workoutType === "fromTemplate" ? (
            <CreateWorkoutFromTemplateModal handleClose={handleWorkoutType} />
          ) : workoutType === "newWorkout" ? (
            <CreateWorkoutFromScratchModal handleClose={handleWorkoutType} />
          ) : null}

          {/* Add new Exercise Modal-------- */}
          {/* <Modal
            open={open}
            closeIcon={<ImCross />}
            onClose={onCloseModal}
            center
            classNames={{
              modal: "p-0 overflow-visible rounded-md w-4/5",
              closeButton:
                "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
            }}
          >
            <AddNewExerciseModal
              onCloseModal={onCloseModal}
            ></AddNewExerciseModal>
          </Modal> */}
        </div>
      </div>
    </div>
  );
}
