/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaRegEdit, FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcFinePrint } from "react-icons/fc";
import { FaCircle, FaEllipsisH } from "react-icons/fa";
import { format } from "date-fns";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import Loading from "../../../Shared/Loading/Loading";

const MessageProfile = () => {
  const { id } = useParams();
  const [note, setNote] = useState(false);
  const [noteOn, setNoteOn] = useState(false);
  const [editNote, setEditNote] = useState();
  const [noteId, setNoteId] = useState();
  const { user } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [client, setClient] = useState();
  const [loading, setLoading] = useState(true);

  // Get Single Client ---------------
  useEffect(() => {
    const url = `https://aperio-server.vercel.app/api/v1/user/get-a-user/${id}`;
    axios(url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        // console.log(res?.data);
        setClient(res?.data?.data);
        // setGender(res?.data?.data?.gender ? res?.data?.data?.gender : 'male');
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleOpenNote = (e) => {
    e.preventDefault();
    setNoteOn(true);
  };
  // Get Single Client ---------------
  useEffect(() => {
    const url = `https://aperio-server.vercel.app/api/v1/user/get-a-user/${id}`;
    axios(url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        // console.log(res?.data.data);
        setClient(res?.data?.data);
        setLoading(false);
        // setGender(res?.data?.data?.gender ? res?.data?.data?.gender : 'male');
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleCancelNote = (e) => {
    e.preventDefault(); // Prevent form submission and page reload
    setNoteOn(false);
    setEditNote();
    setNoteId();
  };

  // Save Note---------------------
  const handleSaveNote = (e) => {
    e.preventDefault();

    const message = e.target.note.value;
    if (!message) {
      return;
    }
    const note = {
      message: message,
      coachEmail: user?.email,
      // clientId: '64cff5d0f8653851563e834f'
      clientId: id && id,
    };

    // Note Update----------------------
    if (noteId) {
      const url = `https://aperio-server.vercel.app/api/v1/note/${noteId}`;
      axios
        .patch(url, note, {
          headers: {
            authorization: `bearer ${localStorage.getItem("userToken")}`,
          },
        })
        .then((res) => {
          toast.success(res?.data?.massage);
          setEditNote();
          setNoteId();
          setRefresh(!refresh);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // Note Create------------------------
    else {
      const url = "https://aperio-server.vercel.app/api/v1/note/create-note";

      axios
        .post(url, note, {
          headers: {
            authorization: `bearer ${localStorage.getItem("userToken")}`,
          },
        })
        .then((res) => {
          toast.success(res?.data?.massage);
          setNoteOn(false);
          setRefresh(!refresh);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Get All Notes----------------
  const url = `https://aperio-server.vercel.app/api/v1/note/get-allnote-clientID/${id}`;
  useEffect(() => {
    axios(url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        // console.log(res?.data?.data);
        setAllNotes(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [url, refresh]);

  // Delete Note--------------------
  const hadleDeleteNote = (e, id) => {
    e.preventDefault();

    const url = `https://aperio-server.vercel.app/api/v1/note/${id}`;
    axios
      .delete(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        toast.success(`${res?.data?.massage}`);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Edit note --------------------------
  const hadleEditNote = (e, id) => {
    e.preventDefault();

    const url = `https://aperio-server.vercel.app/api/v1/note/${id}`;
    axios(url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        // console.log(res?.data?.data);
        setEditNote(res?.data?.data?.message);
        setNoteId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>
        <div>
          {loading ? (
            <Loading />
          ) : (
            <div>
              <div className="flex flex-col w-full items-center px-5 pt-5">
                {client?.img ? (
                  <img
                    src="https://www.hollywoodreporter.com/wp-content/uploads/2020/06/tom_hanks_-_getty_-_h_2020_.jpg"
                    alt=""
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <p
                    className={`bg-[#172485] flex justify-center items-center text-white text-3xl font-semibold w-16 h-16 text-center rounded-full`}
                  >
                    {client?.firstName?.slice(0, 2).toUpperCase()}
                  </p>
                )}
                <h2 className="text-lg font-bold">
                  {client?.firstName + " " + client?.lastName}
                </h2>
                {/* <div className='flex gap-3 items-center w-52'>
                    <p className={`bg-[#172485] flex justify-center items-center text-white text-xs w-7 h-7 text-center rounded-full`}>{client?.firstName?.slice(0, 2).toUpperCase()}</p>
                    <p className='text-base font-semibold'>{client?.firstName + ' ' + client?.lastName}</p>
                </div> */}
              </div>
              <div className="p-5 flex gap-1 items-center text-sm text-gray-500">
                <MdOutlineWatchLater className="text-lg " />
                {client?.createdAt && (
                  <p>{format(new Date(client?.createdAt), "p, OOOO")}</p>
                )}
              </div>
            </div>
          )}

          <hr />
          <div>
            {/* Note section--------- */}
            <div className="">
              <div className="flex justify-between mx-4 my-2 items-center">
                <div className="flex gap-1 items-center">
                  <h5 className="text-lg font-semibold text-slate-700 flex gap-1 items-center">
                    Notes ({allNotes?.length})
                  </h5>
                </div>
                <button
                  onClick={() => setNoteOn(true)}
                  className="text-gray-600"
                >
                  <FaRegEdit />
                </button>
              </div>

              <form onSubmit={handleSaveNote} className="bg-white rounded-md">
                {noteOn && (
                  <div className="p-3">
                    <textarea
                      onClick={handleOpenNote}
                      name="note"
                      className="px-3 py-2 border rounded-md w-full h-28 active:outline-none focus:outline-none border-primary focus:border-primary bg-slate-50"
                    ></textarea>
                  </div>
                )}
                {editNote && (
                  <div className="p-3">
                    <textarea
                      name="note"
                      defaultValue={editNote}
                      className="px-3 py-2 border rounded-md w-full h-28 active:outline-none focus:outline-none border-primary focus:border-primary bg-slate-50"
                    ></textarea>
                  </div>
                )}
                <div
                  className={
                    noteOn || editNote
                      ? "flex justify-end font-medium items-center p-3"
                      : "hidden"
                  }
                >
                  <button
                    type="button"
                    onClick={handleCancelNote}
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
                  {allNotes?.length ? (
                    <div>
                      {allNotes?.map((note, i) => (
                        <div key={i}>
                          <div className="px-3 py-2 flex justify-between items-center">
                            <div>
                              <div className="flex gap-2 items-baseline text-sm">
                                <FaCircle className="text-[5px] text-primary" />
                                <div>
                                  <p>{note?.message}</p>
                                  <p className="text-[10px] text-gray-500">
                                    {format(
                                      new Date(note?.createdAt),
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
                                  onClick={(e) => hadleEditNote(e, note?._id)}
                                  className="text-gray-600 flex gap-2 items-center"
                                >
                                  <FaEdit className=" " />
                                  <p className="">Edit</p>
                                </button>
                              </MenuItem>
                              <MenuItem>
                                <button
                                  onClick={(e) => hadleDeleteNote(e, note?._id)}
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
                    <div className="m-3">
                      <button
                        onClick={handleOpenNote}
                        className={
                          noteOn
                            ? "hidden"
                            : "text-gray-400 w-full px-3 py-3 border rounded-md text-sm text-left cursor-text"
                        }
                      >
                        Add a note about Alexendar....
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Update Section---------- */}
            <div>
              <div className="px-3 py-2 shadow-md">
                <h2 className="font-semibold">Updates</h2>
              </div>
              <div className="px-3 h-48 overflow-y-scroll">
                {[1, 2, 3, 5, 6, 7, 8].map((i) => (
                  <div key={i}>
                    <div className="pt-3 flex gap-2 items-center">
                      <img
                        src="https://www.hollywoodreporter.com/wp-content/uploads/2020/06/tom_hanks_-_getty_-_h_2020_.jpg"
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <h2 className="font-semibold">Kristina Wilson - Demo</h2>
                    </div>
                    <hr className="mt-3" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageProfile;
