import { BsFillPersonFill, BsFillShareFill, BsTagsFill, BsThreeDotsVertical } from "react-icons/bs";
import { CgGym } from "react-icons/cg";
import { BiTime } from "react-icons/bi";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { FaCopy, FaTrashAlt } from "react-icons/fa";

export default function WorkoutLibrary() {

  const array = [1, 2, 3, 4, 5];

  return (
    <div className="overflow-x-auto mt-8 h-96">
      <table className="table table-xs table-pin-rows table-pin-cols">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox checkbox-primary w-5 h-5 rounded-md" />
              </label>
            </th>
            <th > <div className="flex items-center">
              <CgGym className="mr-1 text-lg" /> Workouts</div></th>
            <th className="flex items-center"><BsTagsFill className="mr-1 text-sm" /> Tags</th>
            <th> <div className="flex items-center" >
              <CgGym className="mr-1 text-lg" /> Exercises</div></th>
            <th> <div className="flex items-center">
              <BiTime className="mr-1 text-lg" />
              Most Recent
            </div>  </th>
            <th>
              <div className="flex items-center">
                <BsFillPersonFill className="mr-1 text-lg" />
                Owner
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="h-10 overflow-x-auto">
          {/* row 1 */}
          {
            array?.map(element =>
              <tr key={element}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox checkbox-primary w-5 h-5 rounded-md" />
                  </label>
                </th>
                <td>
                  <div className="font-bold">APEIRO INTRO - MEN</div>
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    --
                  </div>
                </td>
                <td>
                  <span>Triceps</span>
                </td>
                <td>Strength</td>
                <td>
                  <span>2W</span>
                </td>
                <td>
                  <div className="flex justify-around ">

                    <div className="flex justify-center items-center bg-indigo-100 w-6 h-6 rounded-full">
                      <BsFillShareFill className="text-indigo-600" />
                    </div>

                    <Menu align='end' menuButton={<MenuButton className='p-2'>
                      <BsThreeDotsVertical className="text-xl" />
                    </MenuButton>} menuStyle={{ background: '#1F2937' }} transition className='flex gap-10'>

                      <MenuItem className='hover:bg-gray-600 my-2'>
                        <button
                          // onClick={(e) => hadleDeleteNote(e, note?._id)}
                          className='flex text-white gap-3 items-center'>
                          <FaCopy className='text-base' />
                          <p className='font-semibold text-sm'>Duplicate</p>
                        </button>
                      </MenuItem>
                      <MenuItem className='hover:bg-gray-600'>
                        <button
                          // onClick={(e) => hadleDeleteNote(e, note?._id)}
                          className='flex text-white gap-3 items-center'>
                          <FaTrashAlt className='text-base' />
                          <p className='font-semibold text-sm'>Delete</p>
                        </button>
                      </MenuItem>
                    </Menu>

                  </div>
                </td>
              </tr>
            )
          }
        </tbody>

      </table>
    </div>
  )
}
