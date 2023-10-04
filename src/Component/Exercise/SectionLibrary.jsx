
import { CgGym } from "react-icons/cg";
import { BiTime } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";

export default function SectionLibrary() {
  return (
    <div className=" mt-8 ">
      <table className="table table-xs table-pin-rows table-pin-cols">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th > <div className="flex items-center">
              <CgGym className="mr-1 text-lg" /> Sections</div></th>
            <th> <div className="flex items-center" >
              <CgGym className="mr-1 text-lg" /> Section Format</div></th>
            <th> <div className="flex items-center">
              <BiTime className="mr-1 text-lg" />
              Most Recent
            </div>  </th>

          </tr>
        </thead>
        <tbody >



        </tbody>


      </table>
      <div className="flex justify-center items-center h-96">
        <button className="btn btn-sm btn-primary text-white" > <FiPlus className="text-2xl" />Add Your First Section</button>
      </div>
    </div>
  )
}
