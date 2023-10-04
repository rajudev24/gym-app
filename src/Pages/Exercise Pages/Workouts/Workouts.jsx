import ExerciseFilter from "../../../Component/Exercise/ExerciseFilter";
import WorkoutLibrary from "../../../Component/Exercise/WorkoutLibrary";


export default function Workouts() {
  return (
    <div className='px-4 pt-4 w-full'>
      <ExerciseFilter></ExerciseFilter>
      <WorkoutLibrary></WorkoutLibrary>
    </div>
  )
}
