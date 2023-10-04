/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const AllPorgressPhotoView = () => {
  const [images, setImages] = useState([]);
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  // Get All Progrss Photo-----------
  useEffect(() => {
    const url = `https://aperio-server.vercel.app/api/v1/progress/${id}`;
    axios(url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        // console.log(res?.data?.data);
        // setImages(res?.data?.data)
        setImages(res?.data?.data?.photos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="w-full">
      <div className="flex">
        <div className="w-3/5 p-10 ">
          <Carousel showThumbs={false} infiniteLoop={true}>
            {images?.map((image, i) => (
              <div key={i}>
                <img
                  src={image}
                  alt="progress_photo"
                  className="h-96 object-cover"
                />
                {/* <p className='text-xs mt-5'>Date: {format(new Date(image?.createdAt), 'LLL M, YYY')}</p> */}
              </div>
            ))}
          </Carousel>
        </div>
        <div className="w-2/5 border-l-2">
          <div className="bg-slate-100 px-4 py-4 border-b-2 border-gray-400">
            <div className="flex gap-2 items-center">
              <div className="bg-red-300 w-7 h-7 p-2 flex justify-center items-center rounded-full">
                <h2 className="font-semibold text-white text-xs">AC</h2>
              </div>
              <h1 className="text-xl font-semibold">Progress Photo</h1>
            </div>
          </div>

          <div className="p-5">
            <p className="text-sm font-semibold">All Pages (2)</p>
            <hr />

            <div className="grid grid-cols-3 gap-5 my-5">
              {images?.map((image, i) => (
                <div key={i}>
                  <img
                    src={image}
                    alt=""
                    className="object-cover h-16 w-full"
                  />
                  {/* <p className='text-xs mt-1'>{format(new Date(image?.createdAt), 'P')}</p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPorgressPhotoView;
