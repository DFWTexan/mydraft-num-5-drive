import React, { useEffect } from "react";

import ProTeamHeader from "./proTeamInfo-header";


const ProTeamInfo = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <div className="header-container">
        <ProTeamHeader/>
      </div>
      <div className="detail-container">News DETAIL...</div>
    </div>
  );
};

export default ProTeamInfo;
