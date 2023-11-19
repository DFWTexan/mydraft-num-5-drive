import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";

import "../../styles/index.scss";
// import {
//   fetchActiveLeague,
// } from "../../slices/league";
// import {
//   fetchPlayers,
// } from "../../slices/players";
// import { fetchDraftedPlayers } from "../../slices/draft";
import PlayerCardItem from "./playerCardItem";
import PlayerModal from "./player-selected-modal";

const DraftPlyrList = () => {
  const players = useSelector((state) => state.players);
  // const dispatch = useDispatch();

  const [openModelPlayerSelected, setOpenModalPlayerSelected] = useState({
    isOpen: false,
    player_ID: null,
  });

  const handlePlayerSelected_OpenModal = (player) => {
    setOpenModalPlayerSelected({
      isOpen: true,
      player_ID: player.id,
    });
  };

  const handleCloseModal = () => {
    setOpenModalPlayerSelected({
      isOpen: false,
      player_ID: null,
    });
  };

  // const initFetch = useCallback(() => {
    // dispatch(fetchActiveLeague());
    // dispatch(fetchPlayers());
  // }, [dispatch]);

  // const draftFetch = useCallback(() => {
  //   dispatch(fetchDraftedPlayers());
  // }, [dispatch]);

  // useEffect(() => {
    // initFetch();
    // draftFetch()
  // }, [initFetch]);

  return (
    <div className="detail-container">
      <ListGroup>
        {players &&
          players.map((player, index) => (
            <ListGroupItem
              className="draft-list-card"
              action
              href="#"
              // className={
              //   "list-group-item " + (index === currentIndex ? "active" : "")
              // }
              onClick={() => {
                handlePlayerSelected_OpenModal(player);
              }}
              key={index}
            >
              <PlayerCardItem player={player} />
            </ListGroupItem>
          ))}
      </ListGroup>
      {openModelPlayerSelected.isOpen && (
        <PlayerModal
          props={openModelPlayerSelected}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DraftPlyrList;
