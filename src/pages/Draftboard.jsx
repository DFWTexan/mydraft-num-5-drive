import "../styles/index.scss";
import PlayerFilter from "../components/player-filter";
import DraftPlyrList from "../components/draft-list";
import DraftInfo from "../components/draft-info";
import DraftNews from "../components/draft-news";

const Draftboard = () => {
  return (
    <div className="container">
      <div className="left">
        <div>
          <PlayerFilter />
        </div>
        <DraftPlyrList />
      </div>
      <div className="middle">
        <DraftInfo />
      </div>
      <div className="right">
        <DraftNews />
      </div>
    </div>
  );
};

export default Draftboard;
