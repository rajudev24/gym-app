import {  BsFillShareFill, BsThreeDotsVertical } from "react-icons/bs";

export default function TaskLibrary() {
  return (
    <div className="overflow-x-auto mt-8 h-96">
    <table className="table table-xs table-pin-rows table-pin-cols">
  
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <th>Tasks</th>
          
          <th>Most Recent</th>
        </tr>
      </thead>
      <tbody className="h-10 overflow-x-auto">
        {/* row 1 */}
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img  src="/src/assets/logo.png" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold">Hart Hagerty</div>
              </div>
            </div>
          </td>
          <td><span>2W</span></td>
          <td>
              <div className="flex justify-around w-42">
              <img className="rounded-full" width={30} src="/src/assets/logo.png" alt="" />
              <div className=" bg-indigo-100 p-1 rounded-full">
              <BsFillShareFill className="text-indigo-600" />
              </div>
          
              <BsThreeDotsVertical className="text-xl"/>
              </div>
          </td>
        </tr>
        {/* row 2 */}
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src="/src/assets/logo.png" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold">Brice Swyre</div>
              </div>
            </div>
          </td>
          <td> <span>2W</span> </td>
          <td>
              <div className="flex justify-around w-42">
              <img className="rounded-full" width={30} src="/src/assets/logo.png" alt="" />
              <div className=" bg-indigo-100 p-1 rounded-full">
              <BsFillShareFill className="text-indigo-600" />
              </div>
          
              <BsThreeDotsVertical className="text-xl"/>
              </div>
          </td>
        </tr>
        {/* row 3 */}
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src="/src/assets/logo.png" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold">Marjy Ferencz</div>
          
              </div>
            </div>
          </td>
          
          <td>
              <span>2W</span>
          </td>
          <td>
              <div className="flex justify-around w-42">
              
              <img className="rounded-full" width={30} src="/src/assets/logo.png" alt="" />
              <div className=" bg-indigo-100 p-1 rounded-full">
              <BsFillShareFill className="text-indigo-600" />
              </div>
          
              <BsThreeDotsVertical className="text-xl"/>
              </div>
          </td>
        </tr>
        {/* row 4 */}
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src="/tailwind-css-component-profile-5@56w.png" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold">Yancy Tear</div>
           
              </div>
            </div>
          </td>
          
          <td>
              <span>2W</span>
          </td>
          <td>
              <div className="flex justify-around w-42">
              <img className="rounded-full" width={30} src="/src/assets/logo.png" alt="" />
              <div className=" bg-indigo-100 p-1 rounded-full">
              <BsFillShareFill className="text-indigo-600" />
              </div>
          
              <BsThreeDotsVertical className="text-xl"/>
              </div>
          </td>
        </tr>
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src="/src/assets/logo.png" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold">Hart Hagerty</div>
              </div>
            </div>
          </td>
         
          <td>
              <span>2W</span>
          </td>
          <td>
              <div className="flex justify-around w-42">
              <img className="rounded-full" width={30} src="/src/assets/logo.png" alt="" />
              <div className=" bg-indigo-100 p-1 rounded-full">
              <BsFillShareFill className="text-indigo-600" />
              </div>
          
              <BsThreeDotsVertical className="text-xl"/>
              </div>
          </td>
        </tr>
        {/* row 2 */}
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src="/src/assets/logo.png" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold">Brice Swyre</div>
              </div>
            </div>
          </td>
          
          <td>
              <span>2W</span>
          </td>
          <td>
              <div className="flex justify-around w-42">
              <img className="rounded-full" width={30} src="/src/assets/logo.png" alt="" />
              <div className=" bg-indigo-100 p-1 rounded-full">
              <BsFillShareFill className="text-indigo-600" />
              </div>
          
              <BsThreeDotsVertical className="text-xl"/>
              </div>
          </td>
        </tr>
        {/* row 3 */}
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src="/src/assets/logo.png" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold">Marjy Ferencz</div>
          
              </div>
            </div>
          </td>
          
          <td>
              <span>2W</span>
          </td>
          <td>
              <div className="flex justify-around w-42">
              <img className="rounded-full" width={30} src="/src/assets/logo.png" alt="" />
              <div className=" bg-indigo-100 p-1 rounded-full">
              <BsFillShareFill className="text-indigo-600" />
              </div>
          
              <BsThreeDotsVertical className="text-xl"/>
              </div>
          </td>
        </tr>
        {/* row 4 */}
        <tr>
          <th>
            <label>
              <input type="checkbox" className="checkbox" />
            </label>
          </th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img src="/tailwind-css-component-profile-5@56w.png" alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold">Yancy Tear</div>
           
              </div>
            </div>
          </td>
          
          <td>
              <span>2W</span>
          </td>
          <td>
              <div className="flex justify-around w-42">
              <img className="rounded-full" width={30} src="/src/assets/logo.png" alt="" />
              <div className=" bg-indigo-100 p-1 rounded-full">
              <BsFillShareFill className="text-indigo-600" />
              </div>
          
              <BsThreeDotsVertical className="text-xl"/>
              </div>
          </td>
        </tr>
  
      </tbody>
  
    </table>
  </div>
  )
}
