/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FaUserPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import Modal from "react-responsive-modal";
import { ImCross } from "react-icons/im";
import AddMultipleClient from "../AddMultipleClient/AddMultipleClient";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import toast from "react-hot-toast";

export default function AddSingleClient({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedStatus, setSelectedStatus] = useState("Online");
  const [openMultiple, setOpenMultiple] = useState(false);
  const { user, reload, setReload } = useContext(AuthContext);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Create Client--------------------
  const onSubmit = (data) => {
    const client = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      creatorId: user?._id,
      role: "client",
      category: selectedStatus && selectedStatus,
      creatorName: user?.firstName,
    };

    // console.log(client);

    const url = "https://aperio-server.vercel.app/api/v1/user/create-user";
    axios
      .post(url, client, {
        headers: {
          authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          setReload(!reload);
          onCloseModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openMultipleClientModal = () => setOpenMultiple(true);
  const closeMultipleClientModal = () => setOpenMultiple(false);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold pt-1">Add New Client</h1>
        <button
          onClick={() => openMultipleClientModal()}
          className="text-gray-600  flex gap-2 items-center border-2 rounded-md p-1 px-2"
        >
          <FaUserPlus className=" " />
          <p className="">Add Multiple Client</p>
        </button>
      </div>

      <Modal
        open={openMultiple}
        closeIcon={<ImCross />}
        onClose={closeMultipleClientModal}
        center
        classNames={{
          modal: "p-0 max-w-5xl overflow-visible rounded-md",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
        }}
      >
        <AddMultipleClient></AddMultipleClient>
      </Modal>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between mt-4 w-80">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="online"
              name="status"
              value="Online"
              className="radio radio-primary w-5 h-5"
              checked={selectedStatus === "Online"}
              onChange={handleStatusChange}
            />
            <label htmlFor="online"> Online</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="In-Person"
              name="status"
              value="In-Person"
              className="radio radio-primary w-5 h-5"
              checked={selectedStatus === "In-Person"}
              onChange={handleStatusChange}
            />
            <label htmlFor="In-Person"> In-Person</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="Hybrid"
              name="status"
              value="Hybrid"
              className="radio radio-primary w-5 h-5"
              checked={selectedStatus === "Hybrid"}
              onChange={handleStatusChange}
            />
            <label htmlFor="Hybrid"> Hybrid</label>
          </div>
        </div>

        <div className="mt-4">
          <div>
            <label className="pl-2 text-zinc-600 text-xs" htmlFor="Hybrid">
              {" "}
              FIRST NAME
            </label>{" "}
            <br />
            <input
              className="w-full focus:outline-none p-2 border mt-1 rounded-md  
         hover:ring-indigo-500 hover:ring-1 focus:ring-1 focus:ring-indigo-500 "
              type="text"
              placeholder="First name"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <p className="text-red-500">First name is required.</p>
            )}
          </div>
          <div className="mt-4">
            <label className="pl-2 text-zinc-600 text-xs" htmlFor="Hybrid">
              {" "}
              LAST NAME
            </label>{" "}
            <br />
            <input
              className="w-full focus:outline-none p-2 border mt-1 rounded-md  
         hover:ring-indigo-500 hover:ring-1 focus:ring-1 focus:ring-indigo-500 "
              type="text"
              placeholder="Last name"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && (
              <p className="text-red-500">Last name is required.</p>
            )}
          </div>
          <div className="mt-4 mb-8">
            <label className="pl-2 text-zinc-600 text-xs" htmlFor="Hybrid">
              {" "}
              Email
            </label>{" "}
            <br />
            <input
              className="w-full focus:outline-none p-2 border mt-1 rounded-md  
         hover:ring-indigo-500 hover:ring-1 focus:ring-1 focus:ring-indigo-500 "
              type="text"
              placeholder="client@gmail.com"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-500">Email is required.</p>}
          </div>

          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox w-5 h-5 rounded-full checkbox-primary"
            />
            <div>
              <h2 className="text-sm font-semibold">Send Email Invitation</h2>
              <p className="text-xs">
                Client will receive an invitation to create a client account
              </p>
            </div>
          </div>
          <div className="flex justify-end w-full mt-5">
            <button
              type="submit"
              className="bg-primary text-white p-2 rounded-md px-16 hover:bg-secondary duration-400 "
            >
              Invite
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
