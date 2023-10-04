/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useNavigate } from "react-router-dom";
import CategoryNavbar from "../../../Shared/CategoryNavbar/CategoryNavbar";
import "react-responsive-modal/styles.css";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import axios from "axios";
import Loading from "../../../Shared/Loading/Loading";

import ClientTable from "../../../Shared/ClientTable/ClientTable";
import {
  FaThLarge,
  FaUndoAlt,
  FaUser,
  FaUserFriends,
  FaUserTie,
} from "react-icons/fa";
import { BiDumbbell } from "react-icons/bi";
import { IoIosBarcode } from "react-icons/io";

const Clients = () => {
  const { user, reload, searchClient } = useContext(AuthContext);
  const [allClient, setAllClient] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [selectedFilterCategory, setSelectedFilterCategory] = useState(null);
  const [selectedFilterStatus, setSelectedFilterStatus] = useState(null);

  const handleFilters = (status, category) => {
    setSelectedFilterStatus(status);
    setSelectedFilterCategory(category);
  };

  // console.log(user);
  // Get All Client--------------------
  useEffect(() => {
    const url = `https://aperio-server.vercel.app/api/v1/user/underCreator/${user?._id}`;
    const filter = {};
    if (selectedFilterCategory) {
      filter.category = selectedFilterCategory;
    }
    if (selectedFilterStatus) {
      filter.status = selectedFilterStatus;
    }
    axios(url, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
      params: {
        filter,
      },
    })
      .then((res) => {
        // console.log(res?.data?.data);
        setAllClient(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [user, reload, selectedFilterCategory, selectedFilterStatus]);

  // Go to Chat-------
  const handleChat = (clientId) => {
    const members = {
      senderId: user._id,
      receiverId: clientId,
    };
    const url = "https://aperio-server.vercel.app/api/v1/chat";
    axios
      .post(url, members, {
        headers: {
          authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        console.log(res?.data?.status);
        if (res?.data?.status === "success") {
          navigate(`/inbox/${clientId}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    {
      name: "Name",
      icon: <FaUser />,
      status: true,
    },
    {
      name: "Groups",
      icon: <FaUserFriends />,
      status: false,
    },
    {
      name: "Last Activity",
      icon: <FaUndoAlt />,
      status: false,
    },
    {
      name: "Last engage",
      icon: <FaUndoAlt />,
      status: true,
    },
    {
      name: "Last 7d Training",
      icon: <BiDumbbell />,
      status: false,
    },
    {
      name: "Last 30d Training",
      icon: <BiDumbbell />,
      status: false,
    },
    {
      name: "Last Assigned Workout",
      icon: <BiDumbbell />,
      status: false,
    },
    {
      name: "Last 7d Task",
      icon: <BiDumbbell />,
      status: false,
    },
    {
      name: "Last 30d Task",
      icon: <BiDumbbell />,
      status: false,
    },
    {
      name: "Category",
      icon: <FaThLarge />,
      status: false,
    },
    {
      name: "Status",
      icon: <IoIosBarcode />,
      status: false,
    },
    {
      name: "Owner",
      icon: <FaUserTie />,
      status: false,
    },
  ];

  return (
    <div className="mx-4 pt-4 h-screen w-full overflow-x-scroll relative">
      <div className="sticky left-0 z-50">
        <CategoryNavbar
          columns={columns}
          applyFilters={(status, category) => handleFilters(status, category)}
        ></CategoryNavbar>
      </div>

      {/* Table----------------------- */}
      <div className="mt-5">
        {loading ? (
          <Loading />
        ) : (
          <ClientTable columns={columns} allClient={allClient}></ClientTable>
        )}
      </div>
    </div>
  );
};

export default Clients;
