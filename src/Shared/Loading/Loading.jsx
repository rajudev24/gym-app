/* eslint-disable no-unused-vars */
import React from "react";
import { Oval } from "react-loader-spinner";

const Loading = () => {
  return (
    // <div className='flex justify-center items-center w-full'>
    //     <Oval
    //         visible={true}
    //         height="60"
    //         width="60"
    //         ariaLabel="dna-loading"
    //         wrapperStyle={{}}
    //         strokeWidth={4}
    //         wrapperClass="dna-wrapper"
    //     />
    // </div>
    <div className="shadow rounded-md p-4 w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-200 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
