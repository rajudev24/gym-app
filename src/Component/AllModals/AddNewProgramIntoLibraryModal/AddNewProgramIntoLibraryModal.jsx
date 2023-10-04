import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import Modal from 'react-responsive-modal'

export const AddNewProgramIntoLibraryModal = ({ isOpen, handleClose }) => {
    return (
        <Modal open={isOpen}
            closeIcon={<ImCross />}
            onClose={handleClose}
            center
            classNames={{
                modal: 'p-5 pt-0 pb-3 overflow-visible rounded-md w-[510px]',
                closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full z-50'
            }}>
            <ModalContents />
        </Modal>
    )
}

const ModalContents = () => {
    const [text, setText] = useState();

    const renderItems = () => fieldItems.map((item, idx) => <RenderContent key={idx} item={item} />)

    const renderSelects = () => selectItems.map((item, idx) => <RenderSelect key={idx} item={item} text={text} setText={setText} />)

    return (
        <div className='flex flex-col gap-y-4 pt-2'>
            <h2 className='font-semibold'>Create New Program</h2>

            {renderItems()}
            {renderSelects()}

            <div className='self-end'>
                <hr className='pt-2 pb-1' />
                <button className='bg-primary px-6 rounded font-semibold text-slate-100 text-xs py-2'>Create</button>
            </div>
        </div>
    )
}

export const RenderSelect = ({ item, text, setText }) => {
    const { label, options } = item;

    const renderOptions = () => options.map((item, idx) => <option className='text-slate-600' key={idx} value={item.value}>{item.name}</option>)

    return (
        label === "Share with ORG" && text == 0
            ? null
            : <div className=''>
                <p className='text-slate-400 text-[10px]'>{label.toUpperCase()}</p>
                <select
                    onChange={(event) => setText(event.target.value)}
                    name={item}
                    id={item}
                    className='w-full p-2 outline outline-1 focus:outline-primary-focus hover:outline-primary-focus text-[13px] bg-slate-50 rounded-sm'
                >
                    {renderOptions()}
                </select>
            </div>
    )
}

const RenderContent = ({ item }) => {
    const { label, placeholder, type } = item;

    return (
        <div>
            <p className='text-slate-400 text-[10px]'>{label.toUpperCase()}</p>
            {
                type === "textarea"
                    ? <textarea className='outline outline-1 outline-slate-400 bg-slate-50 resize-none hover:outline-primary-focus focus:outline-primary-focus p-1.5 text-[13px] rounded-md w-full' cols={29} rows={4} placeholder={placeholder} />
                    : <input className={`outline outline-1 outline-slate-400 rounded-sm ${type === "number" ? "w-11" : "w-full"} hover:outline-primary-focus focus:outline-primary-focus p-1.5 text-[13px]`} type={type} placeholder={placeholder} defaultValue={type === "number" ? 1 : null} />
            }
        </div>
    )
}

const fieldItems = [
    { label: "Program Name", placeholder: "Add program title", type: "text" },
    { label: "Description", placeholder: "Add program description", type: "textarea" },
    { label: "Weeks", placeholder: "Add program title", type: "number", step: 1 },
];

export const selectItems = [
    { label: "Owner", options: [{ name: "Masud Rana", value: "Masud Rana" }, { name: "No Owner (Shared)", value: 0 }] },
    { label: "Share with ORG", options: [{ name: "Private to owner", value: "Private to owner" }, { name: "Shared with others", value: "Shared with others" }] },
]