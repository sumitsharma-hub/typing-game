const Random = () => {
  return (
    <div>
      <div className="block w-2/3 mt-20 mx-auto p-6 px-8 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700  ">
        <h5 className="mb-2 text-2xl font-bold bg-inherit tracking-tight text-gray-900 dark:text-white">title</h5>
        <p className="font-normal  dark:text-gray-400 bg-inherit pb-6">subTitle</p>

        <input
          type="text"
          id="typewords"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   
          block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
           dark:text-white"
          placeholder="Start Typing . . ."
        />
      </div>
      <div className="flex justify-between text-center w-2/3 mt-20 mx-auto p-3 px-8 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700  ">
        <div className="bg-inherit text-white font-semibold ">Sumit Sharma</div>
        <div className="w-2/3 bg-gray-200 rounded-full h-2 my-auto  dark:bg-gray-700">
          <div className="bg-green-600 h-2 rounded-full dark:bg-green-500" style={{ width: "25%" }}></div>
        </div>
        <div className="bg-inherit text-white font-semibold ">59.88 WPM</div>
      </div>
      <div className="flex justify-between w-2/3 mt-2 mx-auto p-3 px-8 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700  ">
        <div className="bg-inherit text-white font-semibold">Gaurav Singh</div>
        <div className="w-2/3  bg-gray-200 rounded-full h-2 my-auto   dark:bg-gray-700">
          <div className="bg-green-600 h-2 rounded-full dark:bg-green-500" style={{ width: "45%" }}></div>
        </div>
        <div className="bg-inherit text-white font-semibold ">79.88 WPM</div>
      </div>
    </div>
  );
};

export default Random;
