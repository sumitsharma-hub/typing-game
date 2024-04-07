import React, { useState, useEffect } from "react";
import { Socket } from "socket.io-client";

interface UserProgress {
  username: string;
  wpm: string;
  completePercentage: string;
}

interface ProgressMeterProps {
  socket: Socket;
}

const ProgressMeter: React.FC<ProgressMeterProps> = ({ socket }) => {
  const [typingProgress, setTypingProgress] = useState<UserProgress[]>([]);
  useEffect(() => {
    socket.on("typing_progress_update", (progress: UserProgress[]) => {
      setTypingProgress(progress);
    });

    return () => {
      socket.off("typing_progress_update");
    };
  }, [socket]);

  return (
    <div>
      {typingProgress.map((progress, index) => (
        <div
          key={index}
          className="flex justify-between w-2/3 mt-2 mx-auto p-3 px-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <div className="bg-inherit text-white font-semibold">{progress.username}</div>
          <div className="w-2/3 bg-gray-200 rounded-full h-2 my-auto dark:bg-gray-700">
            <div
              className="bg-green-600 h-2 rounded-full dark:bg-green-500"
              style={{ width: `${progress.completePercentage}%` }}
            ></div>
          </div>
          <div className="bg-inherit text-white font-semibold">{progress.wpm} WPM</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressMeter;
