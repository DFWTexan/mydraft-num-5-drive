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
  searchTerm,
  handleSearch,
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
              style={{ fontSize: ".9rem", padding: ".5rem" }}
              id="playerSearch"
              name="search"
              placeholder="Player Search"
              type="search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </FormGroup>
        </Form>
      </div>
      <div className="display-filter">
        On The Clock:{" "}
        <span
          style={{
            paddingLeft: ".5rem",
            fontSize: "larger",
            paddingRight: "1rem",
          }}
        >
          {draftStatus.fanTeamName}
        </span>{" "}
        | Rnd {draftStatus.currentRound} | Pck {draftStatus.currentPick}
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
              handleFilterPlayer({ value: value, type: "[position]" });
            }}
          />
        </div>
        <div className="right-filter">
          <PlayerFilterSelect
            data={dftStatusValues}
            selectedItem={draftStatusValue}
            setSelectedItem={(value) =>
              handleFilterPlayer({ value: value, type: "[draftStatus]" })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerFilter;
