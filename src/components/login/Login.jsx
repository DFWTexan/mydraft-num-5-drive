import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Button, Input } from "reactstrap";
import { Navigate, useNavigate } from "react-router-dom";

import "./login.scss";
import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
// import { loginUser } from "../../slices/user";
// import { fetchActiveLeague } from "../../slices/league";

const Login = () => {
  let navigate = useNavigate();
  const [loginRegisterToggle, setLoginRegisterToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleLogin = () => {
    setIsLoading(true);

    let userName = document.getElementById("userName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // dispatch(loginUser({}));
    // dispatch(fetchActiveLeague());

    dispatch(login({ userName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/draftboard");
        window.location.reload();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/draftboard" />;
  }

  return (
    <div className="sidebar">
      <div className="sidebar__logo">User Login</div>
      <div className="sidebar___btn">
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="loader" />
          </div>
        ) : (
          <div>
            <div>Welcome to</div>
            <div
              style={{
                fontSize: "2.1rem",
                fontWeight: 500,
                marginBottom: "2rem",
              }}
            >
              {" "}
              My Fantasy Draft
            </div>
            <div style={{ textAlign: "left" }}>
              <Form>
                <FormGroup>
                  <div
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 550,
                      marginBottom: "1rem",
                    }}
                  >
                    <Label for="userName">User name</Label>
                    <Input
                      type="input"
                      name="userName"
                      id="userName"
                      placeholder="User Name"
                    />
                  </div>
                  {loginRegisterToggle && (
                    <div
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 550,
                        marginBottom: "1rem",
                      }}
                    >
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                      />
                    </div>
                  )}
                  <div
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 550,
                      marginBottom: "1rem",
                    }}
                  >
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                </FormGroup>
              </Form>
            </div>
            <div>
              {loginRegisterToggle ? (
                <Button className="button-login" onClick={handleLogin}>
                  Register
                </Button>
              ) : (
                <Button className="button-login" onClick={handleLogin}>
                  Login
                </Button>
              )}
            </div>
            <div style={{ marginTop: "1rem" }}>
              <Button
                style={{
                  background: "transparent",
                  padding: ".5rem",
                  fontSize: ".8rem",
                  borderRadius: "5px",
                  border: "1px solid #fff",
                }}
                onClick={() => setLoginRegisterToggle(!loginRegisterToggle)}
              >
                {!loginRegisterToggle ? "Sign Up" : "Log In"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
