import { useDispatch } from "react-redux";
import { Button } from "reactstrap";

import "./login.scss";
import { loginUser } from "../../slices/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogin = () => { 
    dispatch(loginUser({}));
    navigate('/draftboard');
  }

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
