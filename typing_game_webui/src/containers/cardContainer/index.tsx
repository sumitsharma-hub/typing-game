import { Card, LeaderBoard } from "../../components";

const Cards = () => {
  return (
    <div className="px-36">
      <div className="grid grid-cols-3 gap-8 py-20">
        <div className="flex flex-col justify-between">
          <Card
            title="Random Play"
            subTitle="Join a match, anywhere, instantly, worldwide."
            button="random"
            path="game/random"
          />
        </div>
        <div className="flex flex-col justify-between">
          <Card title="Challenge Friend" subTitle="Play 1v1 with your friend." button="challenge" path="game" />
        </div>
        <div className="flex flex-col justify-between">
          <Card
            title="Custom Play"
            subTitle="Play with your friends and family."
            createButton="create"
            joinButton="join"
            path="game/custom"
          />
        </div>
      </div>

      <div className="py-20">
        <div style={{ color: "white" }}>Recent HighScores</div>
        <LeaderBoard />
      </div>
    </div>
  );
};  

export default Cards;
