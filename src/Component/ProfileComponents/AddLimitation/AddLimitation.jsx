/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import {
  FaRegEdit,
  FaCircle,
  FaEllipsisH,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { FcBriefcase } from "react-icons/fc";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const AddLimitation = () => {
  const [injury, setInjury] = useState(false);
  const [injuryOn, setInjuryOn] = useState(false);
  const [editInjury, setEditInjury] = useState();
  const [injuryId, setInjuryId] = useState();
  const { user } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [allLimitation, setAllLimitation] = useState([]);
  const { id } = useParams();
  // console.log(id);

  const handleOpenLimitation = (e) => {
    e.preventDefault();
    setInjuryOn(true);
  };

  const handleCancelLimitation = (e) => {
    e.preventDefault();
    setInjuryOn(false);
    setEditInjury();
    setInjuryId();
  };

  const saveLimitation = (e) => {
    e.preventDefault();

    const message = e.target.limitation.value;
    const limitation = {
      message: message,
      coachEmail: user?.email,
      clientId: id && id,
    };

    if (injuryId) {
      const url = `https://aperio-server.vercel.app/api/v1/limitation/${injuryId}`;
      axios
        .patch(url, limitation, {
          headers: {
            authorization: `bearer ${localStorage.getItem("userToken")}`,
          },
        })
        .then((res) => {
          toast.success(res?.data?.massage);
          setEditInjury();
          setInjuryId();
          setRefresh(!refresh);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Create Limitation---------------------
      const url =
        "https://aperio-server.vercel.app/api/v1/limitation/create-limitation";
      axios
        .post(url, limitation, {
          headers: {
            authorization: `bearer ${localStorage.getItem("userToken")}`,
          },
        })
        .then((res) => {
          toast.success(res?.data?.massage);
          setInjuryOn(false);
          setRefresh(!refresh);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Get All Limitation-------------------------
  const url = `https://aperio-server.vercel.app/api/v1/limitation/get-alllimitation-clientID/${id}`;
  useEffect(() => {
    axios(url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        // console.log(res?.data?.data);
        setAllLimitation(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url, refresh]);

  // handle Delete-----------------------
  const handleDelete = (e, id) => {
    e.preventDefault();

    axios
      .delete(`https://aperio-server.vercel.app/api/v1/limitation/${id}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        if (res?.data?.data?.acknowledged) {
          toast.success(res?.data?.massage);
          setRefresh(!refresh);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Edit Injury --------------------------
  const hadleEditNote = (e, id) => {
    e.preventDefault();

    const url = `https://aperio-server.vercel.app/api/v1/limitation/${id}`;
    axios(url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        setEditInjury(res?.data?.data?.message);
        setInjuryId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      onMouseOver={() => setInjury(true)}
      onMouseOut={() => setInjury(false)}
      className="bg-slate-50 border rounded-md "
    >
      <div className="flex justify-between mx-2 my-2 items-center">
        <div className="flex gap-1 items-center">
          <h5 className="text-base font-medium text-slate-700 flex gap-1 items-center">
            <FcBriefcase className="text-2xl" />
            Limitation/Injury
          </h5>
          <p className={injury ? "text-xs text-gray-400" : "hidden"}>
            (private)
          </p>
        </div>
        <button
          onClick={handleOpenLimitation}
          className={injury ? "text-gray-400" : "hidden"}
        >
          <FaRegEdit />
        </button>
      </div>

      <hr className="border-gray-300" />
      <form onSubmit={saveLimitation} className="bg-white rounded-md">
        {/* <button onClick={handleOpenLimitation} className={injuryOn ? 'hidden' : 'text-gray-400 px-3 py-2 border rounded-md h-14 text-sm text-left cursor-text'}>Add any medical note or injury about Alexander</button> */}

        {injuryOn && (
          <div className="p-3">
            <textarea
              name="limitation"
              className="px-3 py-2 border rounded-md w-full h-28 active:outline-none focus:outline-none border-primary focus:border-primary bg-slate-50"
            ></textarea>
          </div>
        )}

        {editInjury && (
          <div className="p-3">
            <textarea
              name="limitation"
              defaultValue={editInjury}
              className="px-3 py-2 border rounded-md w-full h-28 active:outline-none focus:outline-none border-primary focus:border-primary bg-slate-50"
            ></textarea>
          </div>
        )}
        <div
          className={
            injuryOn || editInjury
              ? "flex justify-end font-medium items-center p-3"
              : "hidden"
          }
        >
          <button
            onClick={handleCancelLimitation}
            className="text-xs px-3 py-1 hover:bg-gray-200 rounded-md "
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 px-3 py-1 rounded-md bg-green-400 hover:bg-green-500 text-sm text-white border-none"
          >
            Save
          </button>
        </div>

        <div>
          {allLimitation?.length ? (
            <div>
              {allLimitation?.map((limitation, i) => (
                <div key={i}>
                  <div className="px-3 py-2 flex justify-between items-center">
                    <div>
                      <div className="flex gap-2 items-baseline text-sm">
                        <FaCircle className="text-[5px] text-primary" />
                        <div>
                          <p>{limitation?.message}</p>
                          <p className="text-[10px] text-gray-500">
                            {format(
                              new Date(limitation?.createdAt),
                              "LLL dd, p"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Menu
                      align="end"
                      menuButton={
                        <MenuButton className="p-2">
                          <FaEllipsisH className="text-xs cursor-pointer text-gray-500" />
                        </MenuButton>
                      }
                      transition
                    >
                      <MenuItem>
                        <button
                          onClick={(e) => hadleEditNote(e, limitation?._id)}
                          className="text-gray-600 flex gap-2 items-center"
                        >
                          <FaEdit className=" " />
                          <p className="">Edit</p>
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={(e) => handleDelete(e, limitation?._id)}
                          className="text-gray-600  flex gap-2 items-center"
                        >
                          <FaTrashAlt className=" " />
                          <p className="">Delete</p>
                        </button>
                      </MenuItem>
                    </Menu>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full p-4">
              <button
                onClick={handleOpenLimitation}
                className={
                  injuryOn
                    ? "hidden"
                    : "text-gray-400  px-3 py-2 w-full border rounded-md h-14 text-sm text-left cursor-text"
                }
              >
                Add any medical note or injury about Alexander
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddLimitation;
