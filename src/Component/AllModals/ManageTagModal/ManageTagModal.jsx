/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaPlusCircle, FaSearch } from 'react-icons/fa';

const ManageTagModal = ({ onOpenNewTagModal, todos, setTodos}) => {



    const handledelete =({id})=>{
        setTodos(todos.filter((todo)=>todo.id !=id))
    }

    return (
        <div >
            <div className='flex justify-between items-center p-5'>
                <h2 className='text-lg font-semibold'>Manage Exercise Tags</h2>
                <div className=" px-3 bg-slate-100 py-1 text-gray-500 rounded-md items-center flex">
                    <FaSearch />
                    <input
                        type="search"
                        placeholder="Search "
                        className="focus:outline-none w-56 px-3 bg-transparent"
                    />
                </div>
            </div>
            <div className='p-5'>
                <div className='flex justify-between items-center text-sm font-semibold px-3 py-2 text-gray-500'>
                    <h2>Tag Name</h2>
                    <h2>Action</h2>
                </div>
                <hr className='border border-1' />
                <div className=' h-72 overflow-y-scroll'>
                {
                todos.map((todo)=>(
                  <li  key={todo.id}>
                    <div className=''>
                        
                    
                    <div className='bg-white hover:bg-gray-200  flex justify-between p-2'>

                    <input className='focus:outline-none  focus:border-primary text-md' type="text"   value={todo.title} onChange={e=>e.preventDefault()} />
                    <button className='text-sm font-semibold hover:text-secondary text-primary' onClick={()=>handledelete(todo)}>Delete</button>
                    </div>
                    </div>

                  </li>
                ))
              }
                    {/* {
                        array?.map(element =>
                            <div key={element} >
                                <div className='px-5 py-2'>
                                    <div className='flex justify-between'>
                                        <h2 className='text-sm'>Test</h2>
                                        <button className='text-xs font-semibold hover:text-secondary text-primary'>Delete</button>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        )
                    } */}
                </div>
            </div>

            <hr />
            <div className='px-5 flex justify-between items-center py-3'>
                <button onClick={onOpenNewTagModal} className="flex gap-2 text-primary items-center text-sm font-semibold">
                    <FaPlusCircle />
                    <h2>Create New Tag</h2>
                </button>
                <button className='px-5 py-2  rounded-md bg-primary text-white font-semibold'>Create</button>
            </div>

        </div>
    );
};

export default ManageTagModal;