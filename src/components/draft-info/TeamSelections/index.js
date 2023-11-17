import React from "react";

import "../../../styles/index.scss";
import TeamSelectionCardItem from "./teamSelectionCardItem";

const TeamSelections = (props) => {
  return (
    <div style={{ height: 775 }}>
      <table style={{ width: "100%" }}>
        <tbody>
          {props.teamSelections.map((item, index) => (
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
    </div>
  );
};
export default TeamSelections;
