import React, { useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "../sidebar/Sidebar";
import Login from "../login/Login";

const AppLayout = () => {
  const userInfoStatus = useSelector((state) => state.userInfoStatus);

  const sideDisplay = useCallback(() => { 
    if (userInfoStatus.isLoggedIn === true) {
      return (<Sidebar />);
    } else {
      return (<Login />);
    }
  }, [userInfoStatus.isLoggedIn]);

  useEffect(() => {

    console.log("==> EMFTest - (AppLayout) userInfo: \n", userInfoStatus);
    
    sideDisplay()
  }, [userInfoStatus, sideDisplay]);

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
