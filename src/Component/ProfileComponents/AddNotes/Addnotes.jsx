/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { FaRegEdit, FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcFinePrint } from "react-icons/fc";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { FaCircle, FaEllipsisH } from "react-icons/fa";
import { format } from "date-fns";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";

const Addnotes = () => {
  const [note, setNote] = useState(false);
  const [noteOn, setNoteOn] = useState(false);
  const [editNote, setEditNote] = useState();
  const [noteId, setNoteId] = useState();
  const { user } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const { id } = useParams();

  const handleOpenNote = (e) => {
    e.preventDefault();
    setNoteOn(true);
  };

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
    <div
      onMouseOver={() => setNote(true)}
      onMouseOut={() => setNote(false)}
      className="bg-slate-50 border rounded-md "
    >
      <div className="flex justify-between mx-4 my-2 items-center">
        <div className="flex gap-1 items-center">
          <h5 className="text-base font-medium text-slate-700 flex gap-1 items-center">
            <FcFinePrint className="text-2xl" />
            Notes
          </h5>
          <p className={note ? "text-xs text-gray-400" : "hidden"}>(private)</p>
        </div>
        <button
          onClick={() => setNoteOn(true)}
          className={note ? "text-gray-400" : "hidden"}
        >
          <FaRegEdit />
        </button>
      </div>

      <hr className="border-gray-300" />
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
                            {format(new Date(note?.createdAt), "LLL dd, p")}
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
            <div className="w-full p-4">
              <button
                onClick={handleOpenNote}
                className={
                  noteOn
                    ? "hidden"
                    : "text-gray-400 w-full px-3 py-2 border rounded-md h-14 text-sm text-left cursor-text"
                }
              >
                Add a note about Alexendar....
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Addnotes;
