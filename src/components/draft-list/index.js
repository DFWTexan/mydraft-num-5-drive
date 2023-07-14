import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlayers,
  // findTutorialsByTitle,
} from "../../slices/players";

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
    <div>
      <ul className="list-group">
          {players &&
            players.map((player, index) => (
              <li
                // className={
                //   "list-group-item " + (index === currentIndex ? "active" : "")
                // }
                // onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {player.firstName}
              </li>
            ))}
        </ul>
    </div>
  );
};

export default DraftPlyrList;