/* eslint-disable no-unused-vars */
import React from "react";
import pic1 from "../../../../assets/pic1.jpg";
import pic2 from "../../../../assets/pic2.jpg";
import pic3 from "../../../../assets/pic3.jpg";
import { BiTime } from "react-icons/bi";
import { BiComment } from "react-icons/bi";
import { AiTwotoneLike } from "react-icons/ai";

const FoodJournal = () => {
  return (
    <div className="p-4 min-h-screen flex justify-center items-center">
      <div className="text-center flex flex-col justify-center items-center">
        <div className="food-chart flex justify-between">
          <div className="chart-date mr-[60px] flex justify-center ">
            <div className="round-shapae w-[14px] h-[14px] rounded-full bg-[#0000002c] mt-[5px]"></div>
            <div className="dash-border border-dashed border-[1px] border-[#0000002c] mt-[25px] ml-[-8px]"></div>
            <div className="info">
              <span className="ml-[20px] text-[black] text-[14px] font-bold">
                Aug 12
              </span>
            </div>
          </div>
          <div className="chart-list w-[450px] h-[530px] border-2 border-inherit rounded-md p-5">
            <div className="date flex text-start text-[#0000004b]">
              <BiTime className="w-3 h-3 mt-[8px] mx-[5px]" />{" "}
              <span>11:41 AM</span>
            </div>
            <h5 className="text-[14px] text-[#000000ac] font-semibold py-[14px] text-start">
              Meal prepared for the week! I had one serving for lunch.
            </h5>
            <div className="chart-img">
              <img
                src={pic1}
                alt=""
                className="h-[350px] w-[500px] object-cover rounded-[10px]"
              />
            </div>
            <div className="chart-like-btn flex justify-between py-[20px]">
              <div className="btn-1 flex justify-center align-center border border-[#00000] px-[30px] py-[8px] cursor-pointer">
                <AiTwotoneLike className="my-[5px] mx-[5px] fill-[#000000] hover:fill-[red]" />
                <button className="text-sm text-[#0000008e] hover:text-[#141441e8]">
                  Like
                </button>
              </div>
              <div className="btn-2 flex  justify-center align-center border border-[#00000] px-[30px] py-[8px] cursor-pointer">
                <BiComment className="my-[5px] mx-[5px] fill-[#000000] hover:fill-[red]" />
                <button className="text-sm text-[#0000008e] hover:text-[#141441e8] ">
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="food-chart flex justify-between mt-[30px]">
          <div className="chart-date mr-[60px] flex justify-center ">
            <div className="round-shapae w-[14px] h-[14px] rounded-full bg-[#0000002c] mt-[5px]"></div>
            <div className="dash-border border-dashed border-[1px] border-[#0000002c] mt-[25px] ml-[-8px]"></div>
            <div className="info">
              <span className="ml-[20px] text-[black] text-[14px] font-bold">
                Sep 12
              </span>
            </div>
          </div>
          <div className="chart-list w-[450px] h-[530px] border-2 border-inherit rounded-md p-5">
            <div className="date flex text-start text-[#0000004b]">
              <BiTime className="w-3 h-3 mt-[8px] mx-[5px]" />{" "}
              <span>11:41 AM</span>
            </div>
            <h5 className="text-[14px] text-[#000000ac] font-semibold py-[14px] text-start">
              Meal prepared for the week! I had one serving for lunch.
            </h5>
            <div className="chart-img">
              <img
                src={pic2}
                alt=""
                className="h-[350px] w-[500px] object-cover rounded-[10px]"
              />
            </div>
            <div className="chart-like-btn flex justify-between py-[20px]">
              <div className="btn-1 flex justify-center align-center border border-[#00000] px-[30px] py-[8px] cursor-pointer">
                <AiTwotoneLike className="my-[5px] mx-[5px] fill-[#000000] hover:fill-[red]" />
                <button className="text-sm text-[#0000008e] hover:text-[#141441e8]">
                  Like
                </button>
              </div>
              <div className="btn-2 flex  justify-center align-center border border-[#00000] px-[30px] py-[8px] cursor-pointer">
                <BiComment className="my-[5px] mx-[5px] fill-[#000000] hover:fill-[red]" />
                <button className="text-sm text-[#0000008e] hover:text-[#141441e8] ">
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="food-chart flex justify-between mt-[30px]">
          <div className="chart-date mr-[60px] flex justify-center ">
            <div className="round-shapae w-[14px] h-[14px] rounded-full bg-[#0000002c] mt-[5px]"></div>
            <div className="dash-border border-dashed border-[1px] border-[#0000002c] mt-[25px] ml-[-8px]"></div>
            <div className="info">
              <span className="ml-[20px] text-[black] text-[14px] font-bold">
                Oct 12
              </span>
            </div>
          </div>
          <div className="chart-list w-[450px] h-[530px] border-2 border-inherit rounded-md p-5">
            <div className="date flex text-start text-[#0000004b]">
              <BiTime className="w-3 h-3 mt-[8px] mx-[5px]" />{" "}
              <span>11:41 AM</span>
            </div>
            <h5 className="text-[14px] text-[#000000ac] font-semibold py-[14px] text-start">
              Meal prepared for the week! I had one serving for lunch.
            </h5>
            <div className="chart-img">
              <img
                src={pic3}
                alt=""
                className="h-[350px] w-[500px] object-cover rounded-[10px]"
              />
            </div>
            <div className="chart-like-btn flex justify-between py-[20px]">
              <div className="btn-1 flex justify-center align-center border border-[#00000] px-[30px] py-[8px] cursor-pointer">
                <AiTwotoneLike className="my-[5px] mx-[5px] fill-[#000000] hover:fill-[red]" />
                <button className="text-sm text-[#0000008e] hover:text-[#141441e8]">
                  Like
                </button>
              </div>
              <div className="btn-2 flex  justify-center align-center border border-[#00000] px-[30px] py-[8px] cursor-pointer">
                <BiComment className="my-[5px] mx-[5px] fill-[#000000] hover:fill-[red]" />
                <button className="text-sm text-[#0000008e] hover:text-[#141441e8] ">
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodJournal;
