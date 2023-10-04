import React, { useState } from 'react'
import { RenderSelect, selectItems } from '../AddNewProgramIntoLibraryModal/AddNewProgramIntoLibraryModal'

export const RefactoredWorkoutCollection = () => {
  return (
    <div className='flex flex-col gap-y-4 px-4 py-2 pb-4'>
      <h2 className='font-semibold'>Add New Form</h2>
      <ModalContents />
    </div>
  )
}

const ModalContents = () => {
  const [text, setText] = useState();

  const renderSelects = () => selectItems.map(item => <RenderSelect item={item} key={item.label} text={text} setText={setText} />)

  return (
    <div className='flex flex-col gap-y-4'>
      <FormName />
      {renderSelects()}
      <RenderButtons />
    </div>
  )
}

const RenderButtons = () => {
  return (
    <div className='flex gap-x-4 justify-end mt-4'>
      <button className='bg-slate-200 text-primary-content px-4 rounded-sm text-xs font-bold py-1 transition-all duration-300 hover:text-slate-900 hover:bg-slate-100 shadow-md hover:shadow-sm'>Cancel</button>
      <button className='bg-primary text-slate-200 px-4 rounded-sm text-xs font-bold py-1 transition-all duration-300 hover:text-slate-50 hover:bg-primary shadow-md hover:shadow-sm'>Add New</button>
    </div>
  )
}

const FormName = () => {
  return (
    <div className='flex flex-col gap-y-0'>
      <p className='text-slate-400 text-[10px]'>FORM NAME</p>
      <input className={`p-1.5 text-sm outline outline-1 outline-slate-400 rounded-sm w-full hover:outline-primary-focus focus:outline-primary-focus`} type="text" placeholder='Enter Form Name' />
    </div>
  )
}