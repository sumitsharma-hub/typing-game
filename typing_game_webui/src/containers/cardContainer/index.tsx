import { Card, LeaderBoard } from "../../components";

const Cards = () => {
  return (
    <>
      <div className=" px-36">
        <div className="flex justify-around py-20 px-36">
          <Card
            title="Random Play"
            subTitle="Join a match, anywhere, instantly, worldwide."
            button="random"
            path="game/random"
          />
          <Card title="Challenge Friend" subTitle="Play 1v1 with your friend." button="challenge" path="game" />
          <Card title="Custom Play" subTitle="Play with your friends and family." button="play" path="game" />
        </div>

        <div className="py-20">
            <div style={{color:"white"}}>Recent HighScores</div>
          <LeaderBoard />
        </div>
      </div>
    </>
  );
};

export default Cards;
