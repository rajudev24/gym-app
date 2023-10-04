/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import {
  FaCircle,
  FaEdit,
  FaEllipsisH,
  FaRegEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { FcCollect } from "react-icons/fc";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const AddGoals = () => {
  const [goal, setGoal] = useState(false);
  const [goalOn, setGoalOn] = useState(false);
  const [updateGoal, setUpdateGoal] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [goals, setGoals] = useState([]);
  const [goalId, setGoalId] = useState();
  const [refresh, setRefresh] = useState(true);

  const handleGoalOpen = (e) => {
    e.preventDefault();
    setGoalOn(true);
  };

  const handleCancelNote = (e) => {
    e.preventDefault(); // Prevent form submission and page reload
    setGoalOn(false);
    setUpdateGoal(false);
  };

  // Goal open for update--------------
  const handleGoalEdit = (id) => {
    setUpdateGoal(true);
    setGoalId(id);
  };

  // Update Goal------------------
  const handleUpdateGoal = (e) => {
    e.preventDefault();
    const updateMessage = e.target.goal.value;

    const updateGoal = {
      message: updateMessage,
      coachemail: user?.email,
      clientId: id,
    };

    const url = `https://aperio-server.vercel.app/api/v1/goal/${goalId}`;
    axios
      .patch(url, updateGoal, {
        headers: {
          authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        toast.success(res?.data?.massage);
        setRefresh(!refresh);
        setGoalOn(false);
        setUpdateGoal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Save Goal --------------------
  const handleSaveGoal = (e) => {
    e.preventDefault();
    // console.log(e);
    const message = e.target.goal.value;
    const goal = {
      message: message,
      coachEmail: user?.email,
      clientId: id,
    };
    const url = "https://aperio-server.vercel.app/api/v1/goal/create-goal";
    axios
      .post(url, goal, {
        headers: {
          authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        toast.success(res?.data?.massage);
        setGoalOn(false);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get All Goals ----------------
  useEffect(() => {
    axios(
      `https://aperio-server.vercel.app/api/v1/goal/get-allgoal-clientID/${id}`,
      {
        headers: {
          authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      }
    )
      .then((res) => {
        // console.log(res?.data);
        setGoals(res?.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, refresh]);

  return (
    <div
      onMouseOver={() => setGoal(true)}
      onMouseOut={() => setGoal(false)}
      className="bg-slate-50 border rounded-md "
    >
      <div className="flex justify-between mx-2 my-2 items-center">
        <div className="flex gap-1 items-center">
          <h5 className="text-base font-medium text-slate-700 flex gap-1 items-center">
            <FcCollect className="text-2xl" />
            Goals{" "}
            <span className={goal ? "text-[10px] text-gray-400" : "hidden"}>
              (shared with client)
            </span>
          </h5>
        </div>
        <button
          onClick={
            goals.length ? () => handleGoalEdit(goals[0]._id) : handleGoalOpen
          }
          className={goal ? "text-gray-400" : "hidden"}
        >
          <FaRegEdit />
        </button>
      </div>

      <hr className="border-gray-300" />
      <form
        onSubmit={updateGoal ? handleUpdateGoal : handleSaveGoal}
        className="px-3 py-5 bg-white rounded-md"
      >
        {goalOn && (
          <textarea
            name="goal"
            onClick={handleGoalOpen}
            className="px-3 py-2 border rounded-md w-full h-28 active:outline-none focus:outline-none border-primary focus:border-primary bg-slate-50"
          ></textarea>
        )}
        {updateGoal && (
          <textarea
            name="goal"
            defaultValue={goals[0]?.message}
            className="px-3 py-2 border rounded-md w-full h-28 active:outline-none focus:outline-none border-primary focus:border-primary bg-slate-50"
          ></textarea>
        )}
        {goals.length ? (
          <div className={updateGoal ? "hidden" : ""}>
            {goals?.map((goal, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex gap-2 items-baseline text-sm">
                  <p>{goal?.message}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <button
            onClick={handleGoalOpen}
            className={
              goalOn
                ? "hidden"
                : "text-gray-400 px-2 py-2 w-full border rounded-md text-left cursor-text"
            }
          >
            Set goals for Alexander...
          </button>
        )}

        <div
          className={
            goalOn || updateGoal
              ? "flex justify-end font-medium items-center"
              : "hidden"
          }
        >
          <button
            onClick={handleCancelNote}
            className="text-xs px-3 py-1 hover:bg-gray-200 rounded-md "
          >
            Cancel
          </button>
          <button className="ml-3 px-3 py-1 rounded-md bg-green-400 hover:bg-green-500 text-sm text-white border-none">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGoals;
