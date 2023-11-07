import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";

import "./login.scss";
import { loginUser } from "../../slices/user";


const Login = () => {
  const dispatch = useDispatch();
  
  const handleLogin = useCallback(() => { 
    dispatch(loginUser({}));
  }, [dispatch]);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">User Login</div>
      <div className="sidebar___btn">
        <Button color="secondary" onClick={handleLogin}>Log In</Button>
      </div>
    </div>
  );
};

export default Login;
