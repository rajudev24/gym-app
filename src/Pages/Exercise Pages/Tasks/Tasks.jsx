import ExerciseFilter from "../../../Component/Exercise/ExerciseFilter";
import TaskLibrary from "../../../Component/Exercise/TaskLibrary";


export default function Tasks() {
  return (
    <div className='px-4 pt-4  w-full'>
      <ExerciseFilter modalActionText={"Add New Task"} />
      <TaskLibrary></TaskLibrary>
    </div>
  )
}
