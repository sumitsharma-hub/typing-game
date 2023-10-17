

interface ChatProps {
  author: string;
  message: string;
  profilePhoto:string
}
const Chat: React.FC<ChatProps> = ({ author, message,profilePhoto }) => {

  const picture = profilePhoto;

  return (
    <div>
      <div className="flex flex-col items-center p-1 ">
        <div className="flex w-full pl-4 dark:bg-gray-800 dark:border-gray-700 rounded-lg">
          {/* <div className="rounded-full flex align-middle justify-center bg-inherit" style={{ alignItems: "center" }}>
            <img
              className="w-14 rounded-full align-middle flex"
              src={`https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg`}
              alt="user photo"
            />
          </div> */}
          <div className=" h-14 w-14  my-auto rounded-full flex align-middle justify-center bg-inherit ">
            {picture ? (
              <div className="h-full w-full rounded-full align-center flex dark:bg-gray-800">
                {picture && (
                  //  <div className="w-12 h-12 rounded-full" dangerouslySetInnerHTML={{ __html: picture }} />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="bg-inherit py-1"
                    width="100%"
                    height="100%"
                    dangerouslySetInnerHTML={{ __html: picture }}
                  />
                )}
              </div>
            ) : (
              <img
                className="w-14 rounded-full align-middle flex"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="user photo"
              />
            )}
          </div>
          <div className="w-full p-2 pl-4 dark:text-white text-gray-500 bg-inherit rounded-lg">
            <a href="#" className="bg-inherit text-lg font-bold underline">
              {author}
            </a>
            <p className="bg-inherit">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
