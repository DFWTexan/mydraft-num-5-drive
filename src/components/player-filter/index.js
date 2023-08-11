import React, { useEffect, useState } from "react";
import Select from "react-select";

import "../../styles/index.scss";
import {
  plyrValues,
  posValues,
  dftStatusValues,
} from "../../constants/player-filters";

const PlayerFilter = () => {
  const [playerValues, setPlayerValues] = useState([]);
  const [positionValues, setPositionValues] = useState([]);
  const [draftStatusValues, setDraftStatusValues] = useState([]);

  useEffect(() => {
    setPlayerValues(
      plyrValues.map((x) => ({
        value: x.value,
        label: x.label,
      }))
    );

    setPositionValues(
      posValues.map((x) => ({
        value: x.value,
        label: x.label,
      }))
    );

    setDraftStatusValues(
      dftStatusValues.map((x) => ({
        value: x.value,
        label: x.label,
      }))
    );
  }, []);

  return (
    <>
      <div className="search-filter">SEARCH</div>
      <div className="display-filter">INFOMATION...</div>
      <div className="player-filter-content">
        <div className="left-filter">
          <Select
            // className="input-xs no-padding"
            // classNamePrefix="react-select"
            name="playerValFilter_ID"
            // defaaultValue={playerValues}
            options={playerValues}
            // onChange={(value) => handleChange(value, index, "paymentMethod_ID")}
          />
        </div>
        <div className="middle-filter">
          <Select
            // className="input-xs no-padding"
            // classNamePrefix="react-select"
            name="positionValueFilter_ID"
            // defaaultValue={playerValues}
            options={positionValues}
            // onChange={(value) => handleChange(value, index, "paymentMethod_ID")}
          />
        </div>
        <div className="right-filter">
          <Select
            // className="input-xs no-padding"
            // classNamePrefix="react-select"
            name="draftStatusValueFilter_ID"
            // defaaultValue={playerValues}
            options={draftStatusValues}
            // onChange={(value) => handleChange(value, index, "paymentMethod_ID")}
          />
        </div>
      </div>
    </>
  );
};

export default PlayerFilter;
