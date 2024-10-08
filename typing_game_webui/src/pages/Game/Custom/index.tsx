import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { GaurdedLayout } from "../../../layouts";
import { Chat, Message } from "../../../components";
import { userSelector } from "../../../features/userSlice";
import { useAppDispatch, useAppSelector, useGenerateText } from "../../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Browser } from "../../../constants";
import { setCurrentRoomId, setGameType, setRoomCreator } from "../../../features/roomDataSilce";

interface CustomProps {
  socket: Socket;
}

interface Imessage {
  room: string;
  author: string;
  message: string;
  profilePhoto: string;
  time: string;
}

const Custom = ({ socket }: CustomProps) => {
  let { generateText } = useGenerateText();

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<Imessage[]>([]);
  const [userList, setUserList] = useState<string[]>([]);
  const [username, setUserName] = useState("");
  const [systemMessages, setSystemMessages] = useState<string[]>([]);
  const [creator, setCreator] = useState("");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const selector = useAppSelector(userSelector);
  const isLoggedInAuthInfo = useAppSelector((state) => state.Auth);
  const roomData = useAppSelector((state) => state.room);

  const userData = selector.user;
  const provider = userData?.provider;

  const picture = userData?.profilePhoto;

  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  let { id } = useParams();

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room, username);
      setShowChat(true);
    }
  };
  const leaveRoom = () => {
    socket.emit("leave_room", room, username);
    setRoom("");
    setShowChat(false);
  };

  useEffect(() => {
    setUserName(
      provider
        ? userData?.firstName
        : userData?.firstName === undefined || userData?.firstName === ""
        ? isLoggedInAuthInfo.notLoggedInName
        : userData?.firstName + " " + userData?.lastName
    );

    // setUserName(
    //   selector.user?.firstName === undefined || selector.user?.firstName === ""
    //     ? isLoggedInAuthInfo.notLoggedInName
    //     : selector.user?.firstName + " " + selector.user?.lastName
    // );
    // setUserName(selector.user?.firstName + " " + selector.user?.lastName);
  }, [selector]);

  useEffect(() => {
    if (username != "" && id != "") {
      socket.emit("join_room", id, username);
    }
    socket.on("user_data", (rooms: []) => {
      if (id !== undefined) {
        // @ts-ignore
        setCreator(rooms[id]?.creator);
        dispatch(setRoomCreator(rooms[id]?.creator));
      }
      // setCreator(rooms[id]?.creator);
      localStorage.setItem("CurrentId", JSON.stringify(id));
      dispatch(setCurrentRoomId(id));
      localStorage.setItem("roomsArray", JSON.stringify(rooms));

      // setRoomsArray(rooms);
    });
  }, [selector, username, socket]);

  useEffect(() => {
    socket.on("user_joined", (updatedUserList: string[]) => {
      // setCreator(roomsArray[id]?.creator);
      setUserList(updatedUserList);
      const joinedMessage = `${updatedUserList[updatedUserList.length - 1]} has joined the room.`;
      setSystemMessages((prevMessages) => [...prevMessages, joinedMessage]);
    });

    socket.on("user_left", (updatedUserList: string[]) => {
      setUserList(updatedUserList);
      const leftMessage = `${updatedUserList[updatedUserList.length - 1]} has left the room.`;
      setSystemMessages((prevMessages) => [...prevMessages, leftMessage]);
    });
    socket.on("already_inside_room", (message: string) => {
      // Handle the message for users already inside the room
      console.log(message, "already_inside_room");
    });

    return () => {
      socket.off("user_joined");
      socket.off("user_left");
      socket.off("already_inside_room");
    };
  }, [socket, messageList]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room ? room : id,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        profilePhoto: picture,
      };

      socket.emit("send_message", messageData, room ? room : id);
      // @ts-ignore
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    const receiveMessageHandler = (data: Imessage) => {
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive_message", receiveMessageHandler);

    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, []);

  const startMatch = async () => {
    generateText();
    socket.emit("start_match", id);
    dispatch(setGameType("custom"));
    socket.emit("match_text", { matchText: roomData.roomTextData, id: id });
  };

  useEffect(() => {
    socket.on("redirect", () => {
      navigate(`${Browser.RANDOM}/random`);
    });

    return () => {
      socket.off("redirect");
    };
  }, [navigate, socket]);

  return (
    <>
      <GaurdedLayout>
        <div className="flex justify-center px-10 py-1  align-middle  ml-28 my-auto  text-center mx-auto w-fit h-10  bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
          <p className=" flex justify-center align-middle text-center h-full leading-relaxed dark:text-white text-gray-500 bg-inherit">
            {`${creator}'s Lobby`}
          </p>
        </div>
        <div className="flex max-lg:flex-col px-24">
          <div
            id="defaultModal"
            aria-hidden="true"
            className=" chat-section top-0 left-0 right-0 w-4/6 max-lg:w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full p-4"
          >
            <div className="relative w-full h-full bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
              <div className="relative h-full rounded-lg shadow  bg-inherit ">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 bg-inherit">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white bg-inherit">Terms of Service</h3>
                </div>
                {/* {messageList?.map((messageContent, index) => (
                <Chat author={messageContent.author} message={messageContent.message} key={index} />
              ))} */}
                <div className="p-6 h-96 space-y-1 overflow-y-scroll">
                  {/* {!showChat ? ( */}
                  <div>
                    {systemMessages.map((message, index) => (
                      <Message key={index} message={message} />
                    ))}
                    {messageList?.map((messageContent, index) => (
                      <Chat
                        key={index}
                        author={messageContent.author}
                        message={messageContent.message}
                        profilePhoto={messageContent.profilePhoto}
                      />
                    ))}
                  </div>
                  {/* ) : null} */}
                </div>
                <div className="flex items-center p-3 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 bg-inherit">
                  <input
                    className="w-full p-2  dark:text-white rounded-lg text-gray-500"
                    type="text"
                    placeholder="Enter a message"
                    name="message"
                    autoComplete="false"
                    value={currentMessage}
                    onChange={(event) => {
                      setCurrentMessage(event.target.value);
                    }}
                    onKeyUpCapture={(event) => {
                      event.key === "Enter" && sendMessage();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            id="defaultModal"
            aria-hidden="true"
            className=" top-0 left-0 right-0 w-2/6 max-lg:w-full  overflow-x-hidden overflow-y-auto md:inset-0 max-h-full p-4  "
          >
            <div className="relative w-full  max-h-full  bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
              <div className="relative rounded-lg shadow  bg-inherit ">
                {username === creator ? (
                  <div className="flex items-start justify-between py-4 border-b rounded-t dark:border-gray-600 bg-inherit">
                    <button
                      type="button"
                      className="text-white text-xl mx-auto bg-[#AA6319] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg  px-10 py-4 text-center inline-flex items-center
                     dark:hover:bg-amber-600/80 dark:focus:ring-[#FF9119]/40 "
                      onClick={startMatch}
                    >
                      Start Match
                    </button>
                  </div>
                ) : null}
                <div className="p-6 space-y-6 bg-inherit">
                  <p className="text-base leading-relaxed dark:text-white text-gray-500 bg-inherit border-gray-200">
                    Players In Lobby
                  </p>
                  {userList.map((username) => {
                    return (
                      <p className="text-base leading-relaxed dark:text-white text-gray-500 bg-inherit">{username}</p>
                    );
                  })}
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 bg-inherit ">
                  <button
                    data-modal-hide="defaultModal"
                    type="button"
                    className="text-white  w-24 lg:w-full p-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    I accept
                  </button>
                  <input
                    className="w-full p-2  dark:text-white rounded-lg text-gray-500"
                    type="text"
                    placeholder="Room ID..."
                    onChange={(event) => {
                      setRoom(event.target.value);
                    }}
                  />
                  {!showChat ? (
                    <button
                      onClick={joinRoom}
                      data-modal-hide="defaultModal"
                      type="button"
                      className="text-white w-40 lg:w-full p-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Join Room
                    </button>
                  ) : (
                    <button
                      onClick={leaveRoom}
                      data-modal-hide="defaultModal"
                      type="button"
                      className="text-white  w-40 p-2 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      Leave Room
                    </button>
                  )}
                </div>
                <div>
                  <button className="text-white" onClick={() => socket.emit("clear_rooms")}>
                    clear rooms
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-fit max-md:flex-col h-10 ml-28 mb-4  ">
          <p
            style={{ alignItems: "center" }}
            className="px-20 mr-2  flex h-full  justify-center  text-center leading-relaxed dark:text-white rounded-lg text-gray-500 dark:bg-gray-800 dark:border-gray-700"
          >
            Invite your friends by sending them the invite link!
          </p>
          <button
            className="text-white text-xl mx-auto bg-[#AA6319] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg  px-10 py-4 text-center inline-flex items-center
                     dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 "
          >
            link
          </button>
        </div>
      </GaurdedLayout>
    </>
  );
};

export default Custom;
