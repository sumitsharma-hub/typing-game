import React, { useState, useEffect } from "react";

interface CountDownProps {
  seconds: number;
  onCountdownEnd: Function;
}

const Countdown: React.FC<CountDownProps> = ({ seconds, onCountdownEnd }) => {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCount((prevCount: number) => prevCount - 1);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    if (count === 0) {
      clearInterval(0);
      onCountdownEnd();
    }
  }, [count, onCountdownEnd]);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-inherit p-10 rounded-lg text-white bg-white border border-gray-200  shadow  dark:bg-gray-800 dark:border-gray-700 ">
      <span className="block text-lg bg-inherit">Match starts in:</span>
      <span className="text-5xl font-bold flex items-center justify-center text-orange-500 bg-inherit">{count}</span>
    </div>
  );
};

export default Countdown;
