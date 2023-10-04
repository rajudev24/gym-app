import { BsFillShareFill, BsThreeDotsVertical } from "react-icons/bs";

export default function ProgramLibrary() {
  return (
    <div className="overflow-x-auto mt-8 h-96">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th> PROGRAMS</th>
            <th> WEEKS</th>
            <th> MOST RECENT </th>
            <th> OWNER</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="font-bold">APEIRO INTRO - MEN</div>
            </td>
            <td>
              <div className="flex items-center space-x-3">--</div>
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
                <div className=" bg-indigo-100 p-1 rounded-full">
                  <BsFillShareFill className="text-indigo-600" />
                </div>

                <BsThreeDotsVertical className="text-xl" />
              </div>
            </td>
          </tr>
          {/* row 2 */}
          <tr>
            <td>
              <div className="font-bold">APEIRO INTRO - MEN</div>
            </td>
            <td>
              <div className="flex items-center space-x-3">--</div>
            </td>
            <td>
              <span>Middle Back</span>
            </td>
            <td>Strength</td>
            <td>
              <span>2W</span>
            </td>
            <td>
              <div className="flex justify-around">
                <div className=" bg-indigo-100 p-1 rounded-full">
                  <BsFillShareFill className="text-indigo-600" />
                </div>

                <BsThreeDotsVertical className="text-xl" />
              </div>
            </td>
          </tr>
          {/* row 3 */}
          <tr>
            <td>
              <div className="font-bold">APEIRO INTRO - MEN</div>
            </td>
            <td>
              <div className="flex items-center space-x-3">--</div>
            </td>
            <td>
              <span>Chest</span>
            </td>
            <td>Strength</td>
            <td>
              <span>2W</span>
            </td>
            <td>
              <div className="flex justify-around ">
                <div className=" bg-indigo-100 p-1 rounded-full">
                  <BsFillShareFill className="text-indigo-600" />
                </div>

                <BsThreeDotsVertical className="text-xl" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
