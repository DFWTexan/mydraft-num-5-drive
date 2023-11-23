import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";

import "../../styles/index.scss";
import PlayerCardItem from "./playerCardItem";
import PlayerModal from "./player-selected-modal";

const DraftPlyrList = ({ filterSortPlayer }) => {
  const players = useSelector((state) => state.players);

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

  return (
    <div className="detail-container" >
      <ListGroup>
        {players &&
          players.map((player, index) => (
            <ListGroupItem
              className={`draft-list-card ${
                player.isDrafted ? "draft-list-card-variant" : ""
              }`}
              action
              href="#"
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
          filterSortPlayer={filterSortPlayer}
        />
      )}
    </div>
  );
};

export default DraftPlyrList;
