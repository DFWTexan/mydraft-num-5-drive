import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";

import "../../styles/index.scss";
import {
  fetchPlayers,
  // findTutorialsByTitle,
} from "../../slices/players";
import PlayerCardItem from "./playerCardItem";

const DraftPlyrList = () => {
  const players = useSelector((state) => state.players);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <div className="list-players">
      <ListGroup>
        {players &&
          players.map((player, index) => (
            <ListGroupItem
              className="player-card-content"
              action
              href="#"
              // className={
              //   "list-group-item " + (index === currentIndex ? "active" : "")
              // }
              // onClick={() => setActiveTutorial(tutorial, index)}
              key={index}
            >
              <PlayerCardItem player={player} />
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
};

export default DraftPlyrList;
