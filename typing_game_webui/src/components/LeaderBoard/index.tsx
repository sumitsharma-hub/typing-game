const LeaderBoard = () => {
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Acc%
              </th>
              <th scope="col" className="px-6 py-3">
                Speed
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Sumit
              </th>
              <td className="px-6 py-4">90%</td>
              <td className="px-6 py-4">80.78 WPM</td>
              <td className="px-6 py-4">5 minutes ago</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Deepu Agrawal
              </th>
              <td className="px-6 py-4">95%</td>
              <td className="px-6 py-4">78.89 WPM</td>
              <td className="px-6 py-4">1 hour ago</td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Gaurav Singh
              </th>
              <td className="px-6 py-4">100%</td>
              <td className="px-6 py-4">77.5 WPM</td>
              <td className="px-6 py-4">2 hours ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
