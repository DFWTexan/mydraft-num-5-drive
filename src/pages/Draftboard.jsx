import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import "../styles/index.scss";
import PlayerFilter from "../components/player-filter";
import DraftPlyrList from "../components/draft-list";
import DraftInfo from "../components/draft-info";
import DraftNews from "../components/draft-news";
import {
  fetchActiveLeague,
} from "../slices/league";
import {
  fetchPlayers,
} from "../slices/players";

const initFilterPlayer = {
  pointValue: 1,
  positionValue: null,
  draftStatus: null,
};

const Draftboard = () => {
  const [filterPlayer, setFilterPlayer] = useState(initFilterPlayer);
  const dispatch = useDispatch();

  const handleFilterPlayer = (filter) => {
    switch (filter.type) {
      case "[pointValue]":
        setFilterPlayer((prevState) => ({
          ...prevState,
          pointValue: filter.value.value,
        }));
        break;
      case "[position]":
        setFilterPlayer((prevState) => ({
          ...prevState,
          position: filter.value.value !== 0 ? filter.value.value : null,
        }));
        break;
      case "[draftStatus]":
        setFilterPlayer((prevState) => ({
          ...prevState,
          draftStatus: filter.value.value !== 0 ? filter.value.value : null,
        }));
        break;

      default:
        break;
    }
  };

  const initFetch = useCallback(() => {
    dispatch(fetchActiveLeague());

    console.log("==> EMFTest (initFetch) filterPlayer:", filterPlayer);

    dispatch(fetchPlayers(filterPlayer));
  }, [dispatch, filterPlayer]);

  // const draftFetch = useCallback(() => {
  //   dispatch(fetchDraftedPlayers());
  // }, [dispatch]);

  useEffect(() => {
    initFetch();
    // draftFetch()
  }, [initFetch]);

  // useEffect(() => {
  //   console.log("==> EMFTest (useEffect) filterPlayer:", filterPlayer);
  //   dispatch(fetchActiveLeague());
  // }, [filterPlayer]);

  return (
    <div className="container">
      <div className="left">
        <div>
          <PlayerFilter
            props={filterPlayer}
            handleFilterPlayer={handleFilterPlayer}
          />
        </div>
        <DraftPlyrList 
          props={filterPlayer}
        />
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
