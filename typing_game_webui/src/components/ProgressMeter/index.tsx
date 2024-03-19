import React from "react";
import { Socket } from "socket.io-client";


interface TypeProgress{
    wpm:string;
    completePercentage:string;
    socket:Socket;
}

const ProgressMeter:React.FC<TypeProgress> = ({wpm,completePercentage, socket}) => {

    socket.on("typing_progress_update",(progress)=>{
        console.log(progress.username, progress.wpm ,'this is a progress update')
    })
  return (
    <div>
      {/* <div className="flex justify-between text-center w-2/3 mt-20 mx-auto p-3 px-8 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700  ">
        <div className="bg-inherit text-white font-semibold ">Sumit Sharma</div>
        <div className="w-2/3 bg-gray-200 rounded-full h-2 my-auto  dark:bg-gray-700">
          <div className="bg-green-600 h-2 rounded-full dark:bg-green-500" style={{ width: "25%" }}></div>
        </div>
        <div className="bg-inherit text-white font-semibold ">59.88 WPM</div>
      </div> */}
      <div className="flex justify-between w-2/3 mt-2 mx-auto p-3 px-8 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700  ">
        <div className="bg-inherit text-white font-semibold">Gaurav Singh</div>
        <div className="w-2/3  bg-gray-200 rounded-full h-2 my-auto   dark:bg-gray-700">
          <div
            className="bg-green-600 h-2 rounded-full dark:bg-green-500"
            style={{ width: `${completePercentage}%` }}
          ></div>
        </div>
        <div className="bg-inherit text-white font-semibold ">{wpm} WPM</div>
      </div>
    </div>
  );
};

export default ProgressMeter;
