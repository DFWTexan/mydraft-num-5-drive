import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../../../styles/index.scss";
import { fetchFanTeamSelections } from "../../../slices/fanTeamSelections";
import FanTeamSelect from "../../Common/fanTeamSelect";
import TeamSelectionCardItem from "./teamSelectionCardItem";

const TeamSelections = (props) => {
  const activeLeague = useSelector((state) => state.activeLeague);
  const teamSelections = useSelector((state) => state.fanTeamSelections);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchFanTeamSelections(props.selectedTeam));
  }, [dispatch, props.selectedTeam]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <div className="detail-container">
      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: "10",
          background: "white",
        }}
      >
        <FanTeamSelect
          teams={activeLeague.teams}
          selectedTeam={props.selectedTeam}
          setSelectedTeam={props.setSelectedTeam}
        />
      </div>
      {teamSelections.length === 0 ? (
        <div style={{ fontSize: "1rem", paddingTop: "2rem" }}>
          <p>Select a Team to see Draft Results.</p>
        </div>
      ) : (
        <table style={{ width: "100%" }}>
          <tbody>
            {teamSelections.map((item, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>
                    {/* {item.key} */}
                    <TeamSelectionCardItem draftPick={item.value} />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default TeamSelections;
