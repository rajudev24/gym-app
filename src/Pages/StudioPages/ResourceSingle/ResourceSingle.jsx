/* eslint-disable no-unused-vars */
import React, { Fragment, useContext, useState } from "react";
import "./resourceSingle.css";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import NavBarRightSide from "../../../Shared/NavBarRightSide/NavBarRightSide";
import { Link, useLocation, useParams } from "react-router-dom";
import Resources from "./Resources";

const ResourceSingle = () => {
  const location = useLocation();
  const paths = location?.pathname.split("/");
  const path = paths[paths?.length - 1];
  const { id } = useParams();
  return (
    <div className="mx-4 pt-4 w-full">
      {/* Single Colletion  */}
      <div className="single-collection">
        <div className="single-collection-header border-b pb-3">
          <div className="className='flex w-full gap-3 items-center z-50'">
            <div className="flex items-baseline">
              <HiOutlineMenuAlt3 className="text-2xl" />
              <div className="w-full">
                <div className="flex justify-between items-center w-full">
                  <h2 className="ps-1 text-2xl font-semibold">Resource One</h2>
                  <NavBarRightSide></NavBarRightSide>
                </div>
                <div className="flex text-gray-400 gap-8 text-sm mt-2">
                  <Link
                    className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${
                      path === id &&
                      "text-secondary font-medium underline underline-offset-8"
                    }`}>
                    Resources
                  </Link>
                  <Link
                    // to={`/profile/${id}/Clients`}
                    className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${
                      path === "traning" &&
                      "text-secondary font-medium underline underline-offset-8"
                    }`}>
                    Clients
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="single-collection-body">
          <Resources />
        </div>
      </div>
    </div>
  );
};

export default ResourceSingle;
