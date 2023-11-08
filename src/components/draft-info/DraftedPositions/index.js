import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDraftedPlayerPositions } from "../../../slices/draftedPositions";

const DraftedByPositions = () => {
  const draftedByPositions = useSelector((state) => state.draftedPositions);
  const dispatch = useDispatch();
  
  // const draftedPositionsList = draftedByPositions.map((position) => (
  //   <li key={position}>{position}</li>
  // ));

  const initFetch = useCallback(() => {
    dispatch(fetchDraftedPlayerPositions());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <div className="drafted-positions">
      <h3>Drafted Positions</h3>
      {/* <ul>{draftedPositionsList}</ul> */}
    </div>
  );
};

export default DraftedByPositions;
