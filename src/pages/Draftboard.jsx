import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "../styles/index.scss";
import PlayerFilter from "../components/player-filter";
import DraftPlyrList from "../components/draft-list";
import DraftInfo from "../components/draft-info";
import DraftNews from "../components/draft-news";
import { fetchDraftStatus } from "../slices/draftStatus";
import { fetchActiveLeague } from "../slices/league";
import { fetchPlayers } from "../slices/players";

const baseURL = "https://localhost:7242/api/";

const initFilterSortPlayer = {
  pointValue: "POINTS",
  positionValue: null,
  draftStatus: null,
};

const Draftboard = () => {
  const activeLeague = useSelector((state) => state.activeLeague);
  const [filterSortPlayer, setFilterPlayer] = useState(initFilterSortPlayer);
  const dispatch = useDispatch();

  const handleFilterPlayer = (filter) => {
    switch (filter.type) {
      case "[pointValue]":
        setFilterPlayer((prevState) => ({
          ...prevState,
          pointValue: filter.value.label,
        }));
        break;
      case "[position]":
        setFilterPlayer((prevState) => ({
          ...prevState,
          positionValue: filter.value.value !== 0 ? filter.value.label : null,
        }));
        break;
      case "[draftStatus]":
        setFilterPlayer((prevState) => ({
          ...prevState,
          draftStatus: filter.value.value !== 0 ? filter.value.label : null,
        }));
        break;

      default:
        break;
    }
  };

  const initFetch = useCallback(() => {
    dispatch(fetchActiveLeague());
    dispatch(fetchPlayers(filterSortPlayer));
  }, [dispatch, filterSortPlayer]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  useEffect(() => {
    axios
      .post(`${baseURL}League/InitLeageData`, activeLeague)
      .then((response) => {
        // console.log("==> EMFTest (response) response:", response);
      });
    dispatch(fetchDraftStatus());
  }, [dispatch, activeLeague]);

  return (
    <div className="container">
      <div className="left">
        <div>
          <PlayerFilter
            props={filterSortPlayer}
            handleFilterPlayer={handleFilterPlayer}
          />
        </div>
        <DraftPlyrList props={filterSortPlayer} />
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
