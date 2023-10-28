import React, { useEffect } from "react";

const FanTeamRoseter = (props) => {


  useEffect(() => {
    if (props.MyTeam) {
      console.log("==> EMFTest - FanTeamRoseter props.MyTeam: TRUE", props.MyTeam);
    } else {
      console.log("==> EMFTest - FanTeamRoseter props.MyTeam: FALSE", props.MyTeam);
    }
  }, [props.MyTeam]);

  return (
    <>
      <div>FanTeamRoster {props.MyTeam}</div>
    </>
  );
};

export default FanTeamRoseter;
