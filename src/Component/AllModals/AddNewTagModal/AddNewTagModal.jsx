/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ExerciseFilter from '../../Exercise/ExerciseFilter';


const AddNewTagModal = ({setInput, input, todos, setTodos}) => {

    // const [newtag, setNewTag] = useState([])
// const handlechange =(e)=>{
//     let tagArr = []
// }


// const [input, setInput] = useState('')
// const [todo, setTodo] = useState([])

const oninputchange = (e)=>{
    setInput(e.target.value);
}
const onformsubmit = (e)=>{
    e.preventDefault()
    setTodos([...todos, {id: uuidv4() , title: input, completed: false}])
    setInput('')
    // console.log(input);
}







    return (
        <div className='p-5'>
            <h2 className='text-lg font-semibold'>Create New Tag</h2>
            <form onSubmit={onformsubmit} className='mt-5'>
                <label className='text-xs font-bold'>TAG NAME</label>
                <input value={input} onChange={oninputchange} type="text" placeholder='Enter Your Tag Name' className='focus:outline-none w-full border rounded-md px-4 py-2 mt-1' />

                <div className='flex justify-end mt-5'>
                    <button  type='submit' className='px-5 py-2 rounded-md bg-primary text-white font-semibold'>Create</button>
                </div>
            </form>
        </div> 
    );
};
<ExerciseFilter  />
export default AddNewTagModal;
