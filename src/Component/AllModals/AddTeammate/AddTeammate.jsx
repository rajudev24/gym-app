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

const AddTeammate = ({ onCloseModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedStatus, setSelectedStatus] = useState("online");
  const { user, reload, setReload } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  // Create Client--------------------
  const onSubmit = (data) => {
    console.log(data);

    // const url = 'https://aperio-server.vercel.app/api/v1/client/create-client'
    // axios.post(url, client, {
    //     headers: {
    //         authorization: `bearer ${localStorage.getItem("userToken")}`,
    //     }
    // })
    //     .then(res => {
    //         if (res?.data?.status === 'success') {
    //             toast.success(res?.data?.massage)
    //             setReload(!reload);
    //             onCloseModal()
    //         }
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
  };

  return (
    <div>
      <div className="flex justify-between p-5">
        <h1 className="text-xl font-semibold pt-1">Invite Member to Everfit</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 px-5">
          <div>
            <label className="pl-2 text-zinc-600 text-xs" htmlFor="Hybrid">
              {" "}
              FIRST NAME
            </label>{" "}
            <br />
            <input
              className="w-full focus:outline-none p-2 border mt-1 rounded-md hover:ring-indigo-500 hover:ring-1 focus:ring-1 focus:ring-indigo-500 "
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
              className="w-full focus:outline-none p-2 border mt-1 rounded-md hover:ring-indigo-500 hover:ring-1 focus:ring-1 focus:ring-indigo-500 "
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
              className="w-full focus:outline-none p-2 border mt-1 rounded-md hover:ring-indigo-500 hover:ring-1 focus:ring-1 focus:ring-indigo-500 "
              type="text"
              placeholder="client@gmail.com"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-500">Email is required.</p>}
          </div>
        </div>
        <div className="px-5">
          <h2 className="text-sm pb-1 pl-2">Role</h2>
          <div className="flex gap-4 w-80">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="admin"
                name="status"
                value="admin"
                className="radio-primary w-4 h-4 p-0"
                {...register("role", { required: true })}
                defaultChecked
                onChange={handleStatusChange}
              />
              <label htmlFor="admin" className="font-semibold text-sm">
                Admin
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="trainer"
                name="status"
                value="trainer"
                className="radio-primary w-4 h-4 p-0"
                {...register("role", { required: true })}
                onChange={handleStatusChange}
              />
              <label htmlFor="trainer" className="font-semibold text-sm">
                Trainer
              </label>
            </div>
          </div>
        </div>
        <div className="px-5 mt-3">
          <div
            onClick={() => setShow(!show)}
            className="text-sm font-light text-green-500 cursor-pointer"
          >
            See Permissions
          </div>
          {show && (
            <div className="mt-5">
              <h2 className="font-medium">App Features</h2>
              <ul className="list-disc px-5 text-xs flex flex-col gap-2 mt-2">
                <li>Can view and manage clients of all team members</li>
                <li>
                  Can view/edit own and shared library assets (exercises,
                  workouts, programs)
                </li>
                <li>
                  Can manage all settings, including team members and billing
                </li>
              </ul>
            </div>
          )}
        </div>
        <hr className="mt-10" />
        <div className="px-5 py-3 flex justify-end">
          <button
            type="submit"
            className="bg-indigo-700 text-white p-2 rounded-md px-16 hover:bg-indigo-600"
          >
            Invite
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTeammate;
