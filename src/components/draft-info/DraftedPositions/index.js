import React, { useEffect, useState } from "react";

import { API_URL } from "../config";

const DraftedPositions = ({ draftedPositions }) => {
  const [draftedPosList, setDraftedPosList] = useState([]);
  
  const draftedPositionsList = draftedPositions.map((position) => (
    <li key={position}>{position}</li>
  ));

  useEffect(() => {}, [draftedPositions]);

  return (
    <div className="drafted-positions">
      <h3>Drafted Positions</h3>
      <ul>{draftedPositionsList}</ul>
    </div>
  );
};

export default DraftedPositions;
