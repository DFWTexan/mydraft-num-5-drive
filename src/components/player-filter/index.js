import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { useSelector } from "react-redux";

import "../../styles/index.scss";
import {
  plyrValues,
  posValues,
  dftStatusValues,
} from "../../constants/player-filters";
import PlayerFilterSelect from "../Common/playerFilterSelect";

const PlayerFilter = ({
  pointValue,
  positionValue,
  draftStatusValue,
  handleFilterPlayer,
}) => {
  const draftStatus = useSelector((state) => state.draftStatus);

  return (
    <div className="header-container">
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
      <div className="display-filter">
        On The Clock: {draftStatus.fanTeam} | Rnd 1 | Pck{" "}
        {draftStatus.currentPick}
      </div>
      <div className="player-filter-content">
        <div className="left-filter">
          <PlayerFilterSelect
            data={plyrValues}
            selectedItem={pointValue}
            setSelectedItem={(value) =>
              handleFilterPlayer({ value: value, type: "[pointValue]" })
            }
          />
        </div>
        <div className="middle-filter">
          <PlayerFilterSelect
            data={posValues}
            label={"Position"}
            selectedItem={positionValue}
            setSelectedItem={(value) => {
              console.log("==> EMFTest (PlayerFilterEvent) - value", value);
              handleFilterPlayer({ value: value, type: "[position]" });
            }}
          />
        </div>
        <div className="right-filter">
          <PlayerFilterSelect
            data={dftStatusValues}
            selectedItem={draftStatusValue}
            setSelectedItem={(value) =>
              handleFilterPlayer({ value: value, type: "[daftfStatus]" })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerFilter;
