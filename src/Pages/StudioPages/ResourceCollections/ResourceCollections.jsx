/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { Fragment, useContext, useState, useRef } from "react";
import { FaBell, FaBook, FaClipboardCheck, FaFolder, FaEllipsisV, FaPlus, FaFile, FaRocket, FaSearch, FaPen, FaPencilAlt, FaCopy, FaTrash } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import ToggleLeftContext from "../../../Context/ToggleLeftContext";
import { Link } from "react-router-dom";
import banner from "../../../assets/collection_area_cover_img.png";
import Modal from "react-responsive-modal";
import { ImCross } from "react-icons/im";
import BodyMetricsModal from "../../../Component/AllModals/BodyMetricsModal/BodyMetricsModal";
import AddCollectionModal from "../../../Component/AllModals/AddCollectionModal/AddCollectionModal";
import { useEffect } from "react";
import NavBarRightSide from "../../../Shared/NavBarRightSide/NavBarRightSide";

const ResourceCollections = () => {
  const [search, setSearch] = useState(true);
  const toggleLeft = useContext(ToggleLeftContext);
  const [openCollection, setOpenCollection] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [divList, setDivList] = useState([]);
  const [previousCollection, setPreviousCollection] = useState(divList);
  const [searchInput, setSearchInput] = useState("");
  const originalDivList = useRef(divList);

  // Add Collection Modal----------------------------
  const openCollectionModal = () => setOpenCollection(true);
  const closeCollectionModal = () => setOpenCollection(false);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setDivList(previousCollection);
    } else {
      const filtered = previousCollection.filter((item) => item.key.toLowerCase().includes(searchInput.toLowerCase()));
      setDivList(filtered);
    }
  }, [searchInput, previousCollection]);

  const handleSearchChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
  };

  const duplicate = (name) => {
    debugger;
    const key = divList.length;
    addDiv("Copy of " + name, key);
  };
  const edit = (name) => {
    const id = "123"; // Replace with the actual ID
    history.push(`/studio/${id}`);
  };
  const removeDiv = (indexToRemove) => {
    debugger;
    setDivList((prevDivList) => prevDivList.filter((x) => x.key !== indexToRemove));
  };
  const addDiv = (collectionName, key = divList.length) => {
    // Create a new div element with the unique key
    const newDiv = (
      <div key={collectionName} id={collectionName} className="   bg-base-100 shadow-xl">
        <div className="w-[18vw] bg-white border border-gray-200 rounded-md shadow-md hover:border-blue-500 transition-transform transform hover:scale-105">
          <div className="p-4 flex items-center border border-black-200   shadow-md hover:border-blue-500">
            {/* Left side (File Icon and Name) */}
            <div className="flex items-center text-gray-400 hover:text-blue-500  ">
              <FaFolder className="text-gray-400 hover:text-blue-500 cursor-pointer" height={20} width={20}></FaFolder>
              <p className="ps-2 text-md font-semibold">{collectionName}</p>
            </div>
            {/* Right side (Three Dot Icon) */}
            <div className="ml-auto">
              <div className="dropdown dropdown-end">
                <button className="btn btn-xs">
                  <FaEllipsisV />
                </button>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow   rounded-box w-52 bg-slate-700 hover:text-white">
                  <Link to={`/studio/singleStudio/1`}>
                    <li className=" hover:bg-slate-100 rounded    ">
                      <a onClick={() => edit(collectionName)}>
                        {" "}
                        <FaPencilAlt /> Edit
                      </a>
                    </li>
                  </Link>

                  <li className=" hover:bg-slate-100 rounded    ">
                    <a onClick={() => duplicate(collectionName)}>
                      {" "}
                      <FaCopy /> Duplicate
                    </a>
                  </li>

                  <li className=" hover:bg-slate-100 rounded    ">
                    <a onClick={() => removeDiv(collectionName)}>
                      {" "}
                      <FaTrash /> Remove
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Card Body */}
          <div className="p-4">
            <p className="p-2">Available for 0 client</p>
            <p className="p-2">Available for 0 client</p>
          </div>
        </div>
      </div>
    );

    // Update the state to add the new div to the list
    setDivList((prevDivList) => [...prevDivList, newDiv]);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mx-4 pt-4 w-full">
      {/* Collection modal------ */}
      <Modal open={openCollection} closeIcon={<ImCross />} onClose={closeCollectionModal} center classNames={{ modal: "p-0 overflow-visible rounded-md w-1/3", closeButton: "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full" }}>
        {/* <BodyMetricsModal closeBodyMetricsModal={closeBodyMetricsModal} ></BodyMetricsModal> */}
        <AddCollectionModal closeCollectionModal={closeCollectionModal} addDiv={addDiv}></AddCollectionModal>
      </Modal>

      <div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
            <h2 className="text-2xl font-semibold">Resource Collections</h2>
          </div>
          <NavBarRightSide></NavBarRightSide>
        </div>
      </div>

      <div>
        <div className="bg-[#F0F8FF] rounded-md w-full relative mt-10 p-10">
          <div className="flex justify-start">
            <div className="z-50 w-1/2 pr-5">
              <p className="font-medium text-sm">STUDIO COLLECTIONS</p>
              <h2 className="text-2xl font-bold pb-2">Central launchpad for any group</h2>
              <div className="text-sm">
                Choose the resources you want to share with each group of clients and customize the look and feel.
                <span className="mt-3 flex gap-5">
                  <Link className="text-primary flex gap-1 items-center font-bold text-sm hover:underline">
                    <FaBook className="text-base" />
                    <h2>Learn more</h2>
                  </Link>
                </span>
              </div>

              <div className="flex gap-4 mt-5 items-center">
                <button onClick={() => openCollectionModal()} className="flex gap-2 p-1 px-6 py-3 items-center rounded-md bg-primary text-white">
                  <FaPlus />
                  <p className="text-xs font-medium">Add Collection</p>
                </button>
                {search ? (
                  <div>
                    <div className="bg-white px-4 py-3 rounded-md items-center flex">
                      <FaSearch className="text-lg" />
                      <input type="search" value={searchInput} onChange={handleSearchChange} placeholder="Search by Keyword or Name " className="focus:outline-none px-3 bg-transparent w-56 text-sm" />
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setSearch(!search)}>
                    <div className="flex gap-2 p-3 items-center rounded-md border border-primary text-primary">
                      <FaSearch />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
          <img src={banner} alt="" className="w-1/4 absolute bottom-0 right-5" />
        </div>

        <h2 className="font-medium mt-10 p-2">Collections</h2>
        <div className="text-gray-400 text-xs flex justify-center items-center">
          <div className=" grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-4">
            {divList.map((div, index) => (
              <React.Fragment key={index}>{div}</React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCollections;
