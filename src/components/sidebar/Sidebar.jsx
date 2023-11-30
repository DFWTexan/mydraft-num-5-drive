import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

import "./sidebar.scss";
import { API_URL } from "../../config";
import { logout } from "../../slices/auth";
import { fetchActiveLeague } from "../../slices/league";
import { fetchDraftStatus } from "../../slices/draftStatus";

const sidebarNavItems = [
  {
    display: "Draftboard",
    icon: <i className="bx bx-home"></i>,
    to: "/draftboard",
    section: "draftboard",
  },
  // {
  //     display: 'Fantasy Teams',
  //     icon: <i className='bx bx-star'></i>,
  //     to: '/fantasyteams',
  //     section: 'fantasyteams'
  // },
  // {
  //     display: 'Draft Setup',
  //     icon: <i className='bx bx-user'></i>,
  //     to: '/setup',
  //     section: 'setup'
  // },
];

const Sidebar = () => {
  const { userLeagues } = useSelector((state) => state.userInfoStatus);
  const { id } = useSelector((state) => state.activeLeague);
  const [selectedLeague, setSelectedLeague] = useState(id);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();

  const runDispatch = () => {
    dispatch(fetchActiveLeague());
    dispatch(fetchDraftStatus());
  };

  const handleLogOut = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const handleLeagueChange = (event) => {
    const leagueId = event.target.value;
    setSelectedLeague(leagueId);
    axios
      .get(`${API_URL}League/ChangeActiveLeague/${leagueId}`)
      .then((res) => {
        // dispatch({
        //   type: "SET_ACTIVE_LEAGUE",
        //   payload: res.data,
        // });
        runDispatch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddLeague = () => {
    console.log("==> EMFTest (Sidebar) - HandleAddLeague: GOT HERE...");
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     const sidebarItem = sidebarRef.current.querySelector(
  //       ".sidebar__menu__item"
  //     );

  //     indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
  //     setStepHeight(sidebarItem.clientHeight);
  //   }, 50);
  // }, []);
  useEffect(() => {
    setTimeout(() => {
      if (sidebarRef.current) {
        const sidebarItem = sidebarRef.current.querySelector(
          ".sidebar__menu__item"
        );
        if (sidebarItem) {
          indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
          setStepHeight(sidebarItem.clientHeight);
        }
      }
    }, 50);
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];

    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );

    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">MyDraft</div>
      <div className="sidebar__menu__item">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl sx={{ m: 1, minWidth: 200 }} size={"small"}>
            <Select
              labelId="LeagueSelect-label"
              id="LeagueSelect"
              value={selectedLeague}
              onChange={(event) => handleLeagueChange(event)}
            >
              {userLeagues.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={handleAddLeague} className="link-button">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="material-symbols-outlined">add_circle</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div ref={sidebarRef} className="sidebar__menu">
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div>
        {sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index}>
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <span className="material-symbols-outlined dashboard-icon">space_dashboard</span>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          alignContent: "center",
          paddingTop: "20px",
        }}
      >
        <div className="sidebar__footer__item">
          {/* <i className="bx bx-log-out"></i>
          <span>Logout</span> */}
          <Button className="button-logout" onClick={handleLogOut}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
