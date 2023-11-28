import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";

import "../../styles/index.scss";
import PlayerCardItem from "./playerCardItem";
import PlayerModal from "./player-selected-modal";

const DraftPlyrList = ({ searchTerm, filterSortPlayer }) => {
  const players = useSelector((state) => state.players);

  const [openModelPlayerSelected, setOpenModalPlayerSelected] = useState({
    isOpen: false,
    player_ID: null,
  });

  const filteredPlayers = players.filter((player) =>
    player.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="detail-container">
      <ListGroup>
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player, index) => (
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
          ))
        ) : (
          <ListGroupItem><div style={{ paddingTop: '2rem', fontSize: '2rem', color: '#CD5C5C', display: 'flex', justifyContent: 'center' }}>No Players Found</div></ListGroupItem>
        )}
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
