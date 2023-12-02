import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

import "./sidebar.scss";
// import { API_URL } from "../../config";
import { logout } from "../../slices/auth";
import { userInfoStatus } from "../../slices/user";
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
  const [selectedLeagueID, setSelectedLeagueID] = useState(id);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const runDispatch = () => {
    dispatch(fetchActiveLeague()).then(() => {
      dispatch(fetchDraftStatus()).then(() => {
        setIsLoading(false);
      });
    });
  };

  const handleLogOut = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const handleLeagueChange = (event) => {
    const leagueId = event.target.value;
    setSelectedLeagueID(leagueId);
    axios
      .get(`${process.env.REACT_APP_MYDRAFT_API_BASE_URL}League/ChangeActiveLeague/${leagueId}`)
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
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_MYDRAFT_API_BASE_URL}League/CreateLeague/`)
      .then((res) => {
        dispatch(userInfoStatus())
          .unwrap()
          .then(() => {
            runDispatch();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteLeague = () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_MYDRAFT_API_BASE_URL}League/DeleteLeague/${selectedLeagueID}`)
      .then((res) => {
        dispatch(userInfoStatus())
          .unwrap()
          .then(() => {
            runDispatch();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setSelectedLeagueID(id);
  }, [userLeagues, id]);

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
      <div className="sidebar__menu">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", alignContent: "center" }}>
            <button className="link-button" onClick={handleDeleteLeague}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: ".5rem",
                }}
              >
                <span className="material-symbols-outlined delete-icon">
                  delete
                </span>
              </div>
            </button>
          </div>
          <FormControl sx={{ m: 1, minWidth: 200 }} size={"small"}>
            <Select
              labelId="LeagueSelect-label"
              id="LeagueSelect"
              value={selectedLeagueID}
              onChange={(event) => handleLeagueChange(event)}
            >
              {userLeagues.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              paddingRight: ".5rem",
            }}
          >
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  paddingLeft: ".5rem",
                  paddingRight: "1.6rem",
                }}
              >
                <div id="loader" className="loader_adding">
                  Loading...
                </div>
              </div>
            ) : (
              <button className="link-button" onClick={handleAddLeague}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingRight: ".5rem",
                  }}
                >
                  <span className="material-symbols-outlined">add_circle</span>
                </div>
              </button>
            )}
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
              <span className="material-symbols-outlined dashboard-icon">
                space_dashboard
              </span>
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
