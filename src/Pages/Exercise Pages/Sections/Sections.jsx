import ExerciseFilter from "../../../Component/Exercise/ExerciseFilter";
import SectionLibrary from "../../../Component/Exercise/SectionLibrary";


export default function Sections() {
  return (
    <div className='px-4 pt-4  w-full'>
      <ExerciseFilter modalActionText={"Add New Section"} />
      <SectionLibrary></SectionLibrary>
    </div>
  )
}
