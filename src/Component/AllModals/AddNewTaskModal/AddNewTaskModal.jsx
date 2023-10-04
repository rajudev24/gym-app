import React, { useState } from 'react'
import { FaBookReader } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { RiFileList3Fill } from 'react-icons/ri'
import { TbActivityHeartbeat, TbCameraUp } from 'react-icons/tb'
import Modal from 'react-responsive-modal'
import GeneralTaskModal from '../TaskModal/GeneralTaskModal/GeneralTaskModal'
import ProgressTaskModal from '../TaskModal/ProgressModal/ProgressTaskModal'
import BodyMetricsModal from '../TaskModal/BodyMetricsModal/BodyMetricsModal'
import FormModal from '../TaskModal/FormModal/FormModal'

export const AddNewTaskModal = ({ isOpen, handleClose }) => {
    return (
        <Modal open={isOpen}
            closeIcon={<ImCross />}
            onClose={handleClose}
            center
            classNames={{
                modal: 'p-5 pt-0 pb-3 overflow-visible rounded-md w-[492px]',
                closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full z-50'
            }}>
            <ModalContents />
        </Modal>
    )
}

const ModalContents = () => {
    const renderTasks = () => tasks.map((task, idx) => <RenderTask key={idx} idx={idx} task={task} />)

    return (
        <div className='flex flex-col gap-y-4 py-2'>
            <h2 className='font-semibold'>Create a task</h2>
            <div className='flex justify-center flex-wrap gap-x-8 gap-y-4'>{renderTasks()}</div>
        </div>
    )
}

const RenderTask = ({ task, idx }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)

    return (
        <>
            <div
                className='flex flex-col justify-between gap-y-2 outline outline-1 outline-slate-400 items-center rounded transition-all duration-300 shadow-md hover:shadow-sm text-2xl py-4 hover:outline-primary-focus cursor-pointer w-40 h-32'
                onClick={handleOpen}
            >
                <span className={`text-5xl ${idx === 0 ? "text-yellow-600" : idx === 1 ? "text-blue-400" : idx === 2 ? "text-purple-800" : "text-green-800"}`}>{task.icon}</span>
                <span className='font-semibold text-sm'>{task.name}</span>
            </div>
            <Modal
                open={open}
                closeIcon={<ImCross />}
                onClose={handleClose}
                center
                classNames={{
                    modal: "p-0 overflow-visible rounded-md w-2/4",
                    closeButton:
                        "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
                }}
            >
                {
                    task.name === "Progress Photo"
                        ? <ProgressTaskModal
                            onCloseGeneralModal={handleClose}
                        />
                        :
                        task.name === "General"
                            ? <GeneralTaskModal
                                onCloseGeneralModal={handleClose}
                            />
                            :
                            task.name === "Body Metrics"
                                ? <BodyMetricsModal
                                    onCloseGeneralModal={handleClose}
                                />
                                :
                                task.name === "Form"
                                    ? <FormModal
                                        onCloseGeneralModal={handleClose}
                                    />
                                    : null

                }
            </Modal>
        </>
    )
}

const tasks = [
    { name: "General", icon: <FaBookReader /> },
    { name: "Progress Photo", icon: <TbCameraUp /> },
    { name: "Body Metrics", icon: <TbActivityHeartbeat /> },
    { name: "Form", icon: <RiFileList3Fill /> }
]