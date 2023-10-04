import ExerciseFilter from "../../../Component/Exercise/ExerciseFilter";
import ProgramLibrary from "../../../Component/Exercise/ProgramLibrary";


export default function Programs() {
  return (
    <div className='px-4 pt-4  w-full'>
      <ExerciseFilter modalActionText={"New Program"} />
      <ProgramLibrary></ProgramLibrary>
    </div>
  )
}
