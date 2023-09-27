import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Form, FormGroup, Input } from "reactstrap";

import "../../styles/index.scss";
import {
  plyrValues,
  posValues,
  dftStatusValues,
} from "../../constants/player-filters";

const PlayerFilter = (props) => {
  const { handleFilterPlayer } = props;
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

  useEffect(() => {});

  return (
    <>
      <div className="search-filter">
        <Form>
          <FormGroup>
            <Input
              // className="search_input"
              id="playerSearch"
              name="search"
              placeholder="Player Search"
              type="search"
            />
          </FormGroup>
        </Form>
      </div>
      <div className="display-filter">INFOMATION...</div>
      <div className="player-filter-content">
        <div className="left-filter">
          <Select
            // className="input-xs no-padding"
            // classNamePrefix="react-select"
            name="pointValFilter_ID"
            // defaaultValue={playerValues}
            defaultValue={props.pointValue}
            options={playerValues}
            onChange={(value) =>
              handleFilterPlayer({ value: value, type: "[pointValue]" })
            }
          />
        </div>
        <div className="middle-filter">
          <Select
            // className="input-xs no-padding"
            // classNamePrefix="react-select"
            name="positionValueFilter_ID"
            defaultValue={props.position}
            options={positionValues}
            onChange={(value) =>
              handleFilterPlayer({ value: value, type: "[position]" })
            }
          />
        </div>
        <div className="right-filter">
          <Select
            // className="input-xs no-padding"
            // classNamePrefix="react-select"
            name="draftStatusValueFilter_ID"
            defaultValue={props.sraftStatus}
            options={draftStatusValues}
            onChange={(value) =>
              handleFilterPlayer({ value: value, type: "[daftfStatus]" })
            }
          />
        </div>
      </div>
    </>
  );
};

export default PlayerFilter;
