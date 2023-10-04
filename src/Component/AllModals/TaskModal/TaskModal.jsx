/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Modal from "react-responsive-modal";
import { ImCross } from "react-icons/im";
import { FaBookReader, FaHeadSideVirus } from "react-icons/fa";
import { RiFileList3Line } from "react-icons/ri";
import { TbActivityHeartbeat, TbCameraUp } from "react-icons/tb";
import { useState } from "react";
import GeneralTaskModal from "./GeneralTaskModal/GeneralTaskModal";
import ProgressTaskModal from "./ProgressModal/ProgressTaskModal";
import BodyMetricsModal from "./BodyMetricsModal/BodyMetricsModal";
import FormModal from "./FormModal/FormModal";

export default function TaskModal({ onCloseWorkoutModal, selectedDate }) {
  const [openGeneral, setOpenGeneral] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);
  const [openBodyMetrics, setBodyMetrics] = useState(false);
  const [openFormModal, setFormModal] = useState(false);

  const onOpenGeneralModal = () => setOpenGeneral(true);
  const onCloseGeneralModal = () => setOpenGeneral(false);

  const onOpenProgressModal = () => setOpenProgress(true);
  const onCloseProgressModal = () => setOpenProgress(false);

  const onOpenBodyMetricsModal = () => setBodyMetrics(true);
  const onCloseBodyMetricsModal = () => setBodyMetrics(false);

  const onOpenFormModal = () => setFormModal(true);
  const onCloseFormModal = () => setFormModal(false);

  return (
    <div>
      <Modal
        open={openGeneral}
        closeIcon={<ImCross />}
        onClose={onCloseWorkoutModal}
        center
        classNames={{
          modal: "p-0 overflow-visible rounded-md w-2/4",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
        }}
      >
        {/* <TaskModal onCloseWorkoutModal={onCloseGeneralModal}></TaskModal> */}
        <GeneralTaskModal
          selectedDate={selectedDate}
          onCloseGeneralModal={onCloseGeneralModal}
          onCloseWorkoutModal={onCloseWorkoutModal}
        ></GeneralTaskModal>
      </Modal>
      {/* Progress Photo Modal */}
      <Modal
        open={openProgress}
        closeIcon={<ImCross />}
        onClose={onCloseWorkoutModal}
        center
        classNames={{
          modal: "p-0 overflow-visible rounded-md w-2/4",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
        }}
      >
        <ProgressTaskModal
          selectedDate={selectedDate}
          onCloseProgressModal={onCloseProgressModal}
          onCloseWorkoutModal={onCloseWorkoutModal}
        ></ProgressTaskModal>
      </Modal>
      {/* Body Metrics Modal */}
      <Modal
        open={openBodyMetrics}
        closeIcon={<ImCross />}
        onClose={onCloseWorkoutModal}
        center
        classNames={{
          modal: "p-0 overflow-visible rounded-md w-2/4",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
        }}
      >
        <BodyMetricsModal
          selectedDate={selectedDate}
          onCloseBodyMetricsModal={onCloseBodyMetricsModal}
          onCloseWorkoutModal={onCloseWorkoutModal}
        ></BodyMetricsModal>
      </Modal>
      {/* Form Modal */}
      <Modal
        open={openFormModal}
        closeIcon={<ImCross />}
        onClose={onCloseWorkoutModal}
        center
        classNames={{
          modal: "p-0 overflow-visible rounded-md w-2/4",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
        }}
      >
        <FormModal
          selectedDate={selectedDate}
          onCloseFormModal={onCloseFormModal}
          onCloseWorkoutModal={onCloseWorkoutModal}
        ></FormModal>
      </Modal>

      <div className="p-8">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">Create a task</h2>
          <h2>Choose from Library</h2>
        </div>
        <div className="mt-4 flex justify-around ">
          <div
            onClick={onOpenGeneralModal}
            className="border border-slate-300 rounded-md p-8 text-md font-semibold w-48 text-center hover:border-indigo-600 cursor-pointer"
          >
            <div className="text-6xl text-amber-500 pl-8">
              <FaBookReader />
            </div>
            General
          </div>

          <div
            onClick={onOpenProgressModal}
            className="border border-slate-300 rounded-md p-8 text-md font-semibold w-48 text-center hover:border-indigo-600 cursor-pointer"
          >
            <div className="text-6xl text-blue-500  pl-8">
              <TbCameraUp />
            </div>
            <h1 className="">Progress Photo</h1>
          </div>

          <div
            onClick={onOpenBodyMetricsModal}
            className="border border-slate-300 rounded-md p-8 text-md font-semibold w-48 text-center hover:border-indigo-600 cursor-pointer"
          >
            <div className="text-6xl text-red-500 pl-8">
              <TbActivityHeartbeat />
            </div>
            Body Metrics
          </div>
        </div>
        <div className="mt-4 flex justify-around m-auto w-2/3">
          <div
            onClick={onOpenFormModal}
            className="border border-slate-300 rounded-md p-8 text-md font-semibold w-48 text-center hover:border-indigo-600 cursor-pointer"
          >
            <div className="text-6xl text-green-600 pl-8">
              <RiFileList3Line />
            </div>
            Form
          </div>
          <div className="border border-slate-300 rounded-md p-8 text-md font-semibold w-48 text-center hover:border-indigo-600 cursor-pointer">
            <div className="text-6xl text-yellow-500  pl-8">
              <FaHeadSideVirus />
            </div>
            Habit
          </div>
        </div>
      </div>
    </div>
  );
}
