import React, { useState } from 'react'
import { SketchPicker } from 'react-color';
import { ImCross } from 'react-icons/im';


export const ColorPicker = ({ colorPicked, handleColorChange, handleFalse }) => {
  const { r, g, b, a } = colorPicked;

  return (
    <div className="absolute -left-48">
      <ImCross className='absolute right-0 -top-1.5 text-[15px] bg-primary-content text-slate-400 p-0.5 rounded-full transition-all duration-300 hover:bg-primary-focus hover:text-primary-content cursor-pointer' onClick={handleFalse} />
      <SketchPicker
        onChange={handleColorChange}
        color={colorPicked}
      />
      <div
        className='w-full h-2 border-2 border-white'
        style={{
          backgroundColor: `rgba(${r},${g},${b},${a})`,
        }}
      ></div>
    </div>
  );
}

export const useForColorPicker = () => {
  const [colorPicked, setColorPicked] = useState("#ca1fb7");

    const handleColorChange = (color) => {
      setColorPicked(color.hex);
    }

    return {colorPicked, handleColorChange}
}

// export const useForColorPicker = () => {
//   const [colorPicked, setColorPicked] = useState({
//       r: "241",
//       g: "112",
//       b: "19",
//       a: "1",
//     });

//     const handleColorChange = (color) => {
//       setColorPicked(color.rgb);
//     }

//     return {colorPicked, handleColorChange}
// }