import { GaurdedLayout } from "../../../layouts";
import { useAppDispatch, useAppSelector, useGenerateText } from "../../../hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import useRecordSubmit from "../../../hooks/useRecordSubmit";
import { userSelector } from "../../../features/userSlice";
import { useAuth } from "../../../hooks/useAuth";
import { ProgressMeter } from "../../../components";
import { Socket } from "socket.io-client";
import Countdown from "../../../components/Countdown";
import { setGameType, setRoomTextData } from "../../../features/roomDataSilce";

interface RandomType {
  socket: Socket;
}

const Random = ({ socket }: RandomType) => {
  let { textData, loading, generateText, setTextData } = useGenerateText();
  const [currentWordCompleted, setCurrentWordCompleted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [wordsTyped, setWordsTyped] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState("");
  const [completePercentage, setCompletePercentage] = useState("0");
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [countdownStarted, setCountdownStarted] = useState(false); // Track if countdown has started
  const [roomId, setRoomId] = useState();

  const inputRef = useRef<HTMLInputElement>(null);
  const { submitRecord } = useRecordSubmit();
  const Auth = useAuth();

  const isLoggedInAuthInfo = useAppSelector((state) => state.Auth);
  const roomTextData = useAppSelector((state) => state.room);
  const selector = useAppSelector(userSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("checkworking", (data) => {
      console.log("this is workindication", data);
    });
    socket.emit("random_page_data");
  }, [socket]);

  useEffect(() => {
    // generateText();
    socket.emit("random_page_data");
    socket.on("typing_text_data", (matchTextData) => {
      const { matchText, id, rooms } = matchTextData;
      setRoomId(id);
      dispatch(setGameType("custom"));
      setTextData(matchText);
    });
    if (roomTextData.gameType === "random") {
      generateText();
    }
    // return () => {
    //   console.log('this is called for cleaup fnction--->')
    //   socket.off("typing_text_data");
    // };
  }, [socket]);

  useEffect(() => {
    if (elapsedTime != 0 && completed == true) {
      const payload = {
        userName: selector.user?.firstName + " " + selector.user?.lastName,
        email: selector.user?.email,
        UserId: selector.user?.id,
        text: matchData,
        typedText: typedText,
        wpm: wpm,
        accuracy: accuracy.toFixed(2),
        elapsedTime: elapsedTime,
      };
      if (isLoggedInAuthInfo.isLoggedIn) {
        submitRecord(payload);
      }
    }
  }, [completed, elapsedTime]);

  useEffect(() => {
    if (elapsedTime === 0 && completed) {
      // Timer starts only when countdown ends and test is completed
      setElapsedTime((Date.now() - startTime) / 1000);
    }
  }, [completed, elapsedTime, startTime]);

  const handleCountdownEnd = () => {
    console.log("Countdown ended!");
    // Perform any actions you want when the countdown ends, such as starting the match
    setStarted(true); // Start the match
    setCountdownStarted(true); // Update countdown started status
    setStartTime(Date.now()); // Set start time for the timer
  };

  useEffect(() => {
    if (!started && countdownStarted) {
      // If countdown has ended but match hasn't started, start the match automatically
      setStarted(true);
      setStartTime(Date.now());
    }
  }, [countdownStarted, started]);

  const calculateAccuracy = () => {
    if (!completed) {
      // If the test is completed, calculate accuracy
      const correctCharacters = typedText.split("").filter((char, index) => char === matchData[index]).length;
      const totalCharacters = matchData.length;
      const accuracyPercentage = (correctCharacters / totalCharacters) * 100;
      setAccuracy(accuracyPercentage);

      return accuracyPercentage;
    }
    return 100; // If the test is not completed, default accuracy to 100%
  };

  const calculateSpeed = () => {
    if (completed || !started) {
      return 0;
    } else {
      const wordCount = wordsTyped.length;
      const timeElapsedInSeconds = (Date.now() - startTime) / 1000;
      const wpmValue = (wordCount / timeElapsedInSeconds) * 60;
      const wpmSpeed: string = wpmValue.toFixed(2);

      setWpm(wpmSpeed);
      setElapsedTime(timeElapsedInSeconds);
      return wpmSpeed;
    }
  };

  const calculateCompletionPercentage = () => {
    if (completed) {
      return 100;
    } else {
      const charactersTyped = typedText.length;
      const totalCharacters = matchData.length;
      const percentageCompleted = (charactersTyped / totalCharacters) * 100;
      let percentageValue = "";
      setCompletePercentage(percentageValue + Math.round(percentageCompleted));
    }
  };

  let matchData = "";
  for (let i = 0; i < textData.data?.length; i++) {
    matchData += textData.data[i] + " ";
  }
  matchData = matchData.trim();

  let wordTypedSoFar = "";
  let currentWordIndex;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTypedText(value);
    wordTypedSoFar += value;

    if (!started) {
      setStarted(true);
    }

    const totalCharactersTyped = wordTypedSoFar.length;
    setCurrentCharacterIndex(totalCharactersTyped);
    const progress = {
      username: isLoggedInAuthInfo.notLoggedInName,
      wpm: wpm,
      id: roomId,
      completePercentage,
    };
    console.log(completePercentage, "progress");
    socket.emit("typing_progress", progress);
    const typedWords = wordTypedSoFar.trim().split(" ");
    setWordsTyped(typedWords);

    currentWordIndex = typedWords.length - 1;
    if (currentWordIndex < textData.data.length) {
      const currentWord = textData.data[currentWordIndex];
      // The current word is typed correctly
      if (typedWords[currentWordIndex] === currentWord) {
        // The entire text is typed correctly
        if (wordTypedSoFar === matchData) {
          setCompleted(true);
        }
        calculateSpeed();
        calculateAccuracy();
        calculateCompletionPercentage();
      } else {
        // The current word is not typed correctly
        setCompleted(false);
      }
    }
  };

  const getWordStatus = (index: number) => {
    if (index >= wordsTyped.length) {
      return "default";
    }
    if (wordsTyped[index] !== matchData.split(" ")[index]) {
      return "incorrect";
    }
    if (index === wordsTyped.length - 1 && !currentWordCompleted) {
      return "default";
    }
    if (index === wordsTyped.length - 1 && currentCharacterIndex < matchData.split(" ")[index].length) {
      console.log("this is called");
      return "active-character"; // Add this condition to check if the character index is within the current word
    }
    if (wordsTyped[index] === matchData.split(" ")[index]) {
      return "correct";
    }
    if (index < wordsTyped.length - 1) {
      return "default";
    }
    return "incorrect";
  };

  useEffect(() => {
    setCurrentWordCompleted(false);
  }, [textData]);

  const handleRestart = useCallback(() => {
    setTypedText("");
    setWordsTyped([]);
    setStarted(false);
    setCompleted(false);
    setAccuracy(100);
    setWpm("0");
    generateText();

    if (inputRef.current) {
      inputRef.current?.focus();
    }
    setCompletePercentage("0");
  }, []);

  if (loading) {
    return <h1>Loading......</h1>;
  }

  if (!started) {
    return <Countdown seconds={2} onCountdownEnd={handleCountdownEnd} />;
  }
  return (
    <GaurdedLayout>
      {!completed ? (
        <>
          <div className="block w-2/3 mt-20 mx-auto p-6 px-8 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700  ">
            {textData.data?.map((word: string, index: number) => {
              return (
                <span
                  key={index}
                  className={` wordText mb-2 text-2xl font-light bg-inherit tracking-tight text-gray-900 dark:text-white ${
                    getWordStatus(index) ? getWordStatus(index) : "bg-red-500"
                  }`}
                >
                  {word}{" "}
                </span>
              );
            })}

            <p className="font-normal  dark:text-gray-400 bg-inherit pb-6"></p>
            <input
              type="text"
              id="typewords"
              autoFocus={true}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   
               block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
             dark:text-white"
              placeholder="Start Typing . . ."
              value={typedText}
              onChange={handleInputChange}
              autoComplete="off"
              ref={inputRef}
            />
            <button
              className=" mt-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              onClick={handleRestart}
            >
              Restart
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="block w-2/3 mt-20 mx-auto p-6 px-8 text-white bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700  ">
            <div className=" bg-inherit">ElapsedTime: {elapsedTime}s</div>
            <div className=" bg-inherit">Accuracy: {accuracy.toFixed(2)}%</div>
            <div className=" bg-inherit">Words Per Minute: {wpm} WPM</div>
            <button className="bg-inherit text-white font-semibold " onClick={handleRestart}>
              Restart
            </button>
          </div>
        </>
      )}
      {/* {roomsArray.map((room:string) => {
        return <ProgressMeter wpm={wpm} userName={room} completePercentage={completePercentage} socket={socket} />;
      })} */}

      {/* <ProgressMeter wpm={wpm} completePercentage={completePercentage} socket={socket} />*/}
      <ProgressMeter socket={socket} />
    </GaurdedLayout>
  );
};

export default Random;
