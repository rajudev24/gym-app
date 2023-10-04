import React, { useState } from 'react'
import { useEffect } from 'react';

const TogglePopUp = () => {
    const [mores, setMores] = useState(true);
    const [exactlys, setExactlys] = useState(false);
    const [lesses, setLesses] = useState(false);
    const [values, setValues] = useState("mores");
    

    useEffect(() => {
        if (values === "mores") {
            setMores(true);
            setExactlys(false);
            setLesses(false);
        }
        if (values === "exactly") {
            setMores(false);
            setExactlys(true);
            setLesses(false);
        }
        if (values === "less") {
            setLesses(true);
            setMores(false);
            setExactlys(false);
        }
    }, [values]);

  return (
    <div className=''>
    <div className='w-[310px]  rounded-[4px] shadow-sm border border-solid border-[#dfe4e5]'>
        <div className='py-5 px-[15px] pb-[5px] bg-[#ffffff] '>
            <div className='mb-[5px]'>
                <input type="radio" name='activity' checked={mores} className='text-[#5c5bbd]' onChange={() => { setValues("mores") }} />
                <span className='text-base font-normal  ml-3 text-[13px]'>More Then</span>
                {mores ? <div className='pl-[25px] mt-[5px] mb-[15px]'>
                    <input type="number" className="border border-solid rounded-[5px] text-[#000] leading-4 border-[#d4d7d9] text-[13px] focus:border-2 focus:border-[#5c5bbd] focus:outline-none w-[180px]  px-2.5 mr-2.5 py-[7px]" />
                    <span>days ago</span>
                </div> : ""}
            </div>
            <div className='mb-[5px]'>
                <input type="radio" name='activity' checked={exactlys} className='' onChange={() => { setValues("exactly") }} />
                <span className='text-base font-normal  ml-3 text-[13px]'>Exactly</span>
                {exactlys ? <div className='pl-[25px] mt-[5px] mb-[15px]'>
                    <input type="number" className="border border-solid rounded-[5px] text-[#000] leading-4 border-[#d4d7d9] text-[13px] focus:border-2 focus:border-[#5c5bbd] focus:outline-none w-[180px]  px-2.5 mr-2.5 py-[7px]" />
                    <span>days ago</span>
                </div> : ""}
            </div>
            <div className='mb-[5px]'>
                <input type="radio" name='activity' checked={lesses} className='' onChange={() => { setValues("less") }} />
                <span className='text-base font-normal  ml-3 text-[13px]'>Less Then</span>
                {lesses ? <div className='pl-[25px] mt-[5px] mb-[15px]'>
                    <input type="number" className="border border-solid rounded-[5px] text-[#000] leading-4 border-[#d4d7d9] text-[13px] focus:border-2 focus:border-[#5c5bbd] focus:outline-none w-[180px]  px-2.5 mr-2.5 py-[7px]" />
                    <span>days ago</span>
                </div> : ""}
            </div>
        </div>
    </div>
</div>
  )
}

export default TogglePopUp