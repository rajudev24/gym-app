import React from "react";
import phone from '../../../assets/iphone_ondemand_layout.svg'
import { useState } from "react";
import {
  AiFillCaretDown,
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";
import { BiChevronDown, BiDotsHorizontal, BiSolidGrid } from "react-icons/bi";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { BsFileEarmarkImage } from "react-icons/bs";

const Resources = () => {
  const [dotOpt, setDotOpt] = useState(false);

  const handleResourceOpt = () => {
    dotOpt ? setDotOpt(false) : setDotOpt(true);
  };
  return (
    <>
      <div className="resoures-layout flex flex-row">
      <div className="left-side basis-4/5 pe-2">
      <div className="resources flex">
        <div className="resources-img flex items-center justify-center">
          <picture>
            {/* <img src="" alt="" /> */}
            <BsFileEarmarkImage />
          </picture>
        </div>
        <div className="resources-title text-2xl font-bold ms-5">
          Resorece Single Title
        </div>
        <div className="resources-btn">
          <button className="px-8 py-2 text-sm rounded-md bg-primary hover:bg-[#4b27b1] duration-300 text-white font-medium">
            Save
          </button>
        </div>
      </div>
      <div>
        <div className="limit text-sm">Resource Limit: 0/25</div>
        <div className="border p-3 mt-1">
          <div className="p-3flex justify-between items-center">
            <div className="flex justify-between gap-4">
              <div className="rounded-sm flex item-center ">
                <button className="szh-menu-button">
                  <AiFillCaretDown />
                </button>
                <button className="text-gray-600 text-sm flex gap-1 items-center px-2">
                  <p className="text-sm">
                    Section Name <span className="font-medium">(0)</span>
                  </p>
                </button>
              </div>
              <div className="flex gap-4 relative">
                <div className="border rounded-sm flex ">
                  <button className="text-gray-600 text-sm flex gap-1 items-center p-2">
                    <BiSolidGrid />
                    <p className="text-sm">Format</p>
                    <BiChevronDown />
                  </button>
                </div>
                <div
                  aria-haspopup="true"
                  aria-expanded="true"
                  className="border rounded-sm flex"
                  onClick={() => handleResourceOpt()}>
                  <button className="text-gray-600 text-sm flex gap-1 items-center p-2">
                    <BiDotsHorizontal />
                  </button>
                </div>
                {dotOpt && (
                  <div className="szh-menu-container szh-menu-container--itemTransition absolute bottom-0 dot-options">
                    <ul
                      role="menu"
                      tabIndex="-1"
                      className="szh-menu szh-menu--state-open szh-menu--dir-bottom">
                      <li tabindex="-1" aria-hidden="true" role="menuitem"></li>
                      <li role="menuitem" tabindex="-1" class="szh-menu__item">
                        <button class="text-gray-600  flex gap-2 items-center">
                          <ImArrowUp />
                          <p class="text-sm">Move Up</p>
                        </button>
                      </li>
                      <li role="menuitem" tabindex="-1" class="szh-menu__item">
                        <button class="text-gray-600  flex gap-2 items-center">
                          <ImArrowDown />
                          <p class="text-sm">Move Down</p>
                        </button>
                      </li>
                      <li role="menuitem" tabindex="-1" class="szh-menu__item">
                        <button class="text-gray-600  flex gap-2 items-center">
                          <AiFillEdit />
                          <p class="text-sm">Edit Discription</p>
                        </button>
                      </li>
                      <li role="menuitem" tabindex="-1" class="szh-menu__item">
                        <button class="text-gray-600  flex gap-2 items-center">
                          <AiFillDelete />
                          <p class="text-sm">Remove</p>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center border py-5 mt-3 border-dashed border-2">
            <div className="flex justify-center items-center flex-col add-resource">
              <AiOutlineAppstoreAdd />
              <p className="text-mid">Add Resource</p>
            </div>
          </div>
        </div>
        <div className="border p-3 mt-5">
          <input
            type="text"
            placeholder="New section name"
            className="px-3 py-2 border bg-[#eceeef] focus:outline-none w-50 rounded-md"
          />
        </div>
        </div>
      </div>
      <div className="right-side-mobile basis-1/5 p-2">
        {/* right side mobile view */}
          <div className="mockup-phone border-gray-100 bg-white">
           <div className="camera bg-white"></div>
            <div className="display bg-white">
              <div className="artboard phone-1 bg-gray-100">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 pb-5 pt-10 px-5">
                  <h2 className="text-2xl font-bold text-white">Copy of resources Title</h2>
                </div>
                <div className="px-4 py-2 bg-slate-50">
                  <div className="">
                    <div>
                      <div className="px-5 py-5 flex justify-between items-center cursor-pointer">
                        <div className="font-semibold">Section title</div>
                        <div className="">
                          <button className="text-sm font-semibold flex gap-1 items-center text-blue-600 mt-2">
                            <AiFillEye />
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Resources;
