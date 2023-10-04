/* eslint-disable no-unused-vars */
import React from 'react';
import ExerciseFilter from '../../../Component/Exercise/ExerciseFilter';
import ExerciseLibrary from '../../../Component/Exercise/ExerciseLibrary';

const Exercises = () => {
    return (
        <div className='px-4 pt-4  w-full'>
            <ExerciseFilter></ExerciseFilter>
            <ExerciseLibrary></ExerciseLibrary>
        </div>

    );
};

export default Exercises;