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

import { API_URL } from "../config";

const initFilterSortPlayer = {
  pointValue: "POINTS",
  pntVal: 1,
  positionValue: null,
  posVal: 0,
  draftStatus: null,
  drftVal: 0,
};

const Draftboard = () => {
  // const activeLeague = useSelector((state) => state.activeLeague);
  const draftStatus = useSelector((state) => state.draftStatus);
  const [filterSortPlayer, setFilterSortPlayer] = useState(initFilterSortPlayer);
  const dispatch = useDispatch();

  const handleFilterPlayer = (filter) => {
    switch (filter.type) {
      case "[pointValue]":
        setFilterSortPlayer((prevState) => ({
          ...prevState,
          pointValue: filter.value.target.value === 1 ? "[POINTS]" : filter.value.target.value === 2 ? "[ADP]" : "[VALUE]",
          pntVal: filter.value.target.value,
        }));
        break;
      case "[position]":
        let posVal = "ALL";
        switch (filter.value.target.value) {
          case 1:
            posVal = "QB";
            break;
          case 2:
            posVal = "RB";
            break;
          case 3:
            posVal = "WR";
            break;
          case 4:
            posVal = "TE";
            break;
          case 5:
            posVal = "K";
            break;
          case 6:
            posVal = "DEF";
            break;
          default:
            posVal = "ALL";
            break;
        }
        setFilterSortPlayer((prevState) => ({
          ...prevState,
          positionValue: posVal !== "ALL" ? posVal : null,
          posVal: filter.value.target.value,
        }));
        break;
      case "[draftStatus]":
        setFilterSortPlayer((prevState) => ({
          ...prevState,
          draftStatus: filter.value.target.value === 0 ? null : filter.value.target.value === 1 ? "[DRAFTED]" : "[AVAILABLE]",
          drftVal: filter.value.target.value,
        }));
        break;

      default:
        break;
    }
  };

  const initFetch = useCallback(() => {
    dispatch(fetchPlayers(filterSortPlayer));
  }, [dispatch, filterSortPlayer]);

  useEffect(() => {
    initFetch();
  }, [initFetch, draftStatus]);

  useEffect(() => {
    axios.get(`${API_URL}League/InitLeageData`)
    .then((response) => {
      // console.log("==> EMFTest (response) response:", response);
      dispatch(fetchActiveLeague());
      dispatch(fetchDraftStatus());
    });
  }, [dispatch]);

  return (
    <div className="container">
      <div className="left">
        <div>
          <PlayerFilter
            // props={filterSortPlayer}
            pointValue={filterSortPlayer.pntVal}
            positionValue={filterSortPlayer.posVal}
            draftStatusValue={filterSortPlayer.drftVal}
            handleFilterPlayer={handleFilterPlayer}
          />
        </div>
        <DraftPlyrList filterSortPlayer={filterSortPlayer}/>
      </div>
      <div className="middle">
        <DraftInfo/>
      </div>
      <div className="right">
        <DraftNews />
      </div>
    </div>
  );
};

export default Draftboard;
