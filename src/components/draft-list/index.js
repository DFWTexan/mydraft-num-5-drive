import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup } from "reactstrap";

import '../../styles/index.scss';
import {
  fetchPlayers,
  // findTutorialsByTitle,
} from "../../slices/players";
import PlayerCardItem from "./playerCardItem";

const DraftPlyrList = () => {

  const players = useSelector(state => state.players);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchPlayers());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  return (
    <div className="list-players">
      <ListGroup>
          {players &&
            players.map((player, index) => (
              <li
                // className={
                //   "list-group-item " + (index === currentIndex ? "active" : "")
                // }
                // onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {/* {player.firstName} */}
                <PlayerCardItem player={player}/>
              </li>
            ))}
        </ListGroup>
    </div>
  );
};

export default DraftPlyrList;