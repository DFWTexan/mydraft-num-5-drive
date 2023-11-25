import React, { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Sidebar from "../sidebar/Sidebar";
import Login from "../login/Login";

const AppLayout = () => {
  // const authUser = useSelector((state) => state.auth);
  const userInfoStatus = useSelector((state) => state.userInfoStatus);
  const navigate = useNavigate();

  const sideDisplay = useCallback(() => {
    if (userInfoStatus.isLoggedIn === true) {
      return <Sidebar />;
    } else {
      return <Login />;
    }
  }, [userInfoStatus.isLoggedIn]);

  const navigateToDraftboard = useCallback(() => {
    if (userInfoStatus.isLoggedIn === true) {
      navigate("/draftboard");
    } else {
      return;
    }
  }, [userInfoStatus.isLoggedIn, navigate]);

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];

    if (userInfoStatus.isLoggedIn === true) {
      sideDisplay();
      if (curPath === "") {
        navigateToDraftboard();
      }
    } else {
      return;
    }
  }, [userInfoStatus.isLoggedIn, sideDisplay, navigateToDraftboard]);

  return (
    <div
      style={{
        padding: "5px 0px 0px 325px",
      }}
    >
      {sideDisplay()}
      <Outlet />
    </div>
  );
};

export default AppLayout;
