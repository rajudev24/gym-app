/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { FaPlus, FaPrint } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddMultipleClient = ({ closeMultipleClientModal }) => {
  const [clients, setClients] = useState([0]);
  const [formData, setFormData] = useState([]);
  const { user, reload, setReload } = useContext(AuthContext);

  const handleInputChange = (e, index, field) => {
    const newFormData = [...formData];
    const clientData = {
      ...newFormData[index],
      [field]: e.target.value,
      creatorId: user?._id,
      role: "client",
      creatorName: user?.firstName,
    };
    newFormData[index] = clientData;
    setFormData(newFormData);
  };

  // let clients = [0]
  const handleClients = () => {
    setClients([...clients, clients.length - 1 + 1]);
  };

  const handleSubmit = () => {
    const url = "https://aperio-server.vercel.app/api/v1/user/create-user";
    axios
      .post(url, formData, {
        headers: {
          authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          setReload(!reload);
          closeMultipleClientModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <div>
            <h5 className="text-sm text-gray-400">Add Clients</h5>
            <h3 className="text-lg font-semibold">Add Multiple Clients</h3>
          </div>
          <div className="border rounded-md px-3 py-2 flex gap-1 text-gray-500">
            <FaPrint />
            <h2 className="text-sm ">Add Clients by .CSV file</h2>
          </div>
        </div>
      </div>
      <hr />
      <div className="px-5 py-8">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-5 gap-4 ml-8">
            <h2>First Name</h2>
            <h2>Last Name</h2>
            <h2>Email</h2>
            <h2>Category</h2>
            <h2>Send Invite</h2>
          </div>
          {clients?.map((element, i) => (
            <div key={element} className="flex gap-5 items-center">
              <samp className="text-lg font-medium">{i + 1}</samp>
              <div className="grid grid-cols-5 gap-4">
                <input
                  name="firstName"
                  type="text"
                  className="border px-3 py-2 focus:outline-none rounded-md hover:border-primary focus:border-primary"
                  onChange={(e) => handleInputChange(e, i, "firstName")}
                />

                <input
                  type="text"
                  className="border px-3 py-2 focus:outline-none rounded-md hover:border-primary focus:border-primary"
                  name="lastName"
                  onChange={(e) => handleInputChange(e, i, "lastName")}
                />

                <input
                  type="text"
                  className="border px-3 py-2 focus:outline-none rounded-md hover:border-primary focus:border-primary"
                  name="email"
                  onChange={(e) => handleInputChange(e, i, "email")}
                />

                <select
                  name="category"
                  onChange={(e) => handleInputChange(e, i, "category")}
                  className="border px-3 py-2 focus:outline-none rounded-md hover:border-primary focus:border-primary"
                >
                  <option className="font-semibold">Online</option>
                  <option className="font-semibold">In-Person</option>
                  <option className="font-semibold">Hybrid</option>
                </select>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary w-4 h-4 rounded-sm ml-8"
                />
              </div>
            </div>
          ))}

          <div className="flex gap-5 items-center">
            <div>
              <samp className="text-lg font-medium mt-7">
                {clients.length - 1 + 2}
              </samp>
            </div>
            <button
              onClick={handleClients}
              className="bg-slate-100 p-3 flex justify-center items-center rounded-full"
            >
              <FaPlus className="text-xl text-gray-500" />
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex justify-end w-full mt-5 p-4">
        <button
          onClick={handleSubmit}
          className="bg-primary text-white p-2 rounded-md px-16 hover:bg-secondary duration-400 "
        >
          Add Clients
        </button>
      </div>
    </div>
  );
};

export default AddMultipleClient;
