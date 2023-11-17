import React from "react";

import "../../../styles/index.scss";
import TeamSelectionCardItem from "./teamSelectionCardItem";

const TeamSelections = (props) => {
  return (
    <div>
      <table style={{ width: "100%" }}>
        {props.teamSelections.map((item, index) => (
          <tr>
            <td>
              {/* {item.key} */}
              <TeamSelectionCardItem draftPick={item.value} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default TeamSelections;
