import React, { useState, useEffect } from 'react';

const TogglePopUpAssigned = () => {

    const [more, setMore] = useState(false);
    const [exactly, setExactly] = useState(false);
    const [less, setLess] = useState(true);
    const [value, setValue] = useState("less");
    

    useEffect(() => {
        if (value === "more") {
            setMore(true);
            setExactly(false);
            setLess(false);
        }
        if (value === "exactly") {
            setMore(false);
            setExactly(true);
            setLess(false);
        }
        if (value === "less") {
            setLess(true);
            setMore(false);
            setExactly(false);
        }
    }, [value]);

    return (
        <div className=''>
            <div className='w-[310px]  rounded-[4px] shadow-sm border border-solid border-[#dfe4e5]'>
                <div className='py-5 px-[15px] pb-[5px] bg-[#ffffff] '>
                    <div className='mb-[5px]'>
                        <input type="radio" name='activity' checked={more} className='text-[#5c5bbd]' onChange={() => { setValue("more") }} />
                        <span className='text-base font-normal  ml-3 text-[13px]'>More Then</span>
                        {more ? <div className='pl-[25px] mt-[5px] mb-[15px]'>
                            <input type="number" className="border border-solid rounded-[5px] text-[#000] leading-4 border-[#d4d7d9] text-[13px] focus:border-2 focus:border-[#5c5bbd] focus:outline-none w-[180px]  px-2.5 mr-2.5 py-[7px]" />
                            <span>days ago</span>
                        </div> : ""}
                    </div>
                    <div className='mb-[5px]'>
                        <input type="radio" name='activity' checked={exactly} className='' onChange={() => { setValue("exactly") }} />
                        <span className='text-base font-normal  ml-3 text-[13px]'>Exactly</span>
                        {exactly ? <div className='pl-[25px] mt-[5px] mb-[15px]'>
                            <input type="number" className="border border-solid rounded-[5px] text-[#000] leading-4 border-[#d4d7d9] text-[13px] focus:border-2 focus:border-[#5c5bbd] focus:outline-none w-[180px]  px-2.5 mr-2.5 py-[7px]" />
                            <span>days ago</span>
                        </div> : ""}
                    </div>
                    <div className='mb-[5px]'>
                        <input type="radio" name='activity' checked={less} className='' onChange={() => { setValue("less") }} />
                        <span className='text-base font-normal  ml-3 text-[13px]'>Less Then</span>
                        {less ? <div className='pl-[25px] mt-[5px] mb-[15px]'>
                            <input type="number" className="border border-solid rounded-[5px] text-[#000] leading-4 border-[#d4d7d9] text-[13px] focus:border-2 focus:border-[#5c5bbd] focus:outline-none w-[180px]  px-2.5 mr-2.5 py-[7px]" />
                            <span>days ago</span>
                        </div> : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TogglePopUpAssigned;
