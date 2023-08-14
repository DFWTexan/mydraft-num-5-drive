import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";

import "../../styles/index.scss";
import {
  fetchPlayers,
  // findTutorialsByTitle,
} from "../../slices/players";
import PlayerCardItem from "./playerCardItem";
import PlayerModal from "./player-selected-modal";

const DraftPlyrList = () => {
  const players = useSelector((state) => state.players);
  const dispatch = useDispatch();

  // const [selectedPlayer, setSelectedPlayer] = useState();
  const [openModelPlayerSelected, setOpenModalPlayerSelected] = useState({
    isOpen: false,
    player_ID: null,
  });

  const handlePlayerSelected_OpenModal = (player) => {
    
    console.log('===> EMFTEST (handlePlayerSelected_OpenModal): ', player);

    setOpenModalPlayerSelected({
      isOpen: true,
      player_ID: player.id,
    });
  };
  
  const handleCloseModal = () => {

    console.log('==> EMFTEST (handleCloseModal): SETTING TO FALSE...')

    setOpenModalPlayerSelected({
      isOpen: false,
      player_ID: null,
    });
  };

  const initFetch = useCallback(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <div className="list-players">
      <ListGroup>
        {players &&
          players.map((player, index) => (
            <ListGroupItem
              className="player-card-content"
              action
              href="#"
              // className={
              //   "list-group-item " + (index === currentIndex ? "active" : "")
              // }
              onClick={() => {
                // setSelectedPlayer(player);
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
          // paymentModal={paymentModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DraftPlyrList;
