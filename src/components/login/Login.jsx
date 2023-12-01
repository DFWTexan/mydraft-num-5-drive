import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Button, Input } from "reactstrap";

import "./login.scss";
import { login, register } from "../../slices/auth";
import { setMessage } from "../../slices/message";
import { clearMessage } from "../../slices/message";
import { userInfoStatus } from "../../slices/user";
import { fetchActiveLeague } from "../../slices/league";

const Login = () => {
  const [loginRegisterToggle, setLoginRegisterToggle] = useState(false);
  const [forgotToggle, setforgotToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { status, message } = useSelector((state) => state.message);
  const [password, setPassword] = useState("");
  const [passwordValidated, setPasswordValidated] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] =
    useState(true);
  const dispatch = useDispatch();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegistrationPasswordChange = (e) => {
    setPassword(e.target.value);
    handleRegistrationPasswordValidation(e);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleRegistrationPasswordValidation = (e) => {
    let password = e.target.value;
    let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (passwordRegex.test(password)) {
      setPasswordValidated(true);
      dispatch(clearMessage());
    } else {
      setPasswordValidated(false);
      dispatch(
        setMessage({
          status: "WARN",
          message:
            "Password must be at least 8 characters with 1 number and 1 special character",
        })
      );
    }
  };

  const handleLogin = () => {
    setIsLoading(true);
    dispatch(setMessage({ status: "INFO", message: "Logging in..." }));

    let username = document.getElementById("UserName").value;
    let password = document.getElementById("LoginPassword").value;

    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        dispatch(userInfoStatus());
        dispatch(fetchActiveLeague(1));
      })
      .catch(() => {
        setIsLoading(false);
        setPassword("");
        setConfirmPassword("");
      });
  };

  const handleRegister = () => {
    setIsLoading(true);

    let username = document.getElementById("UserName").value;
    let email = document.getElementById("Email").value;
    let password = document.getElementById("RegistrationPassword").value;

    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        dispatch(login({ username, password }))
          .unwrap()
          .then(() => {
            dispatch(userInfoStatus());
            dispatch(fetchActiveLeague(1));
          })
          .catch(() => {
            setIsLoading(false);
            setPassword("");
            setConfirmPassword("");
          });
      })
      .catch(() => {
        setIsLoading(false);
        setPassword("");
        setConfirmPassword("");
      });
  };

  useEffect(() => {
    if (password.length >= 8 && password === confirmPassword) {
      setIsRegisterButtonDisabled(false);
    } else {
      setIsRegisterButtonDisabled(true);
    }
  }, [password, confirmPassword]);

  const myStyle = {
    fontSize: ".8rem",
    padding: ".5rem",
  };

  return (
    <div className="sidebar">
      <div className="sidebar___btn">
        {isLoading ? (
          <div
            style={{
              paddingTop: "5rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="loader" />
          </div>
        ) : (
          <div>
            <div style={{ paddingTop: "2rem", fontSize: "1.3rem" }}>
              Welcome to
            </div>
            <div
              style={{
                paddingTop: "2rem",
                color: "#308efe",
                fontSize: "2rem",
                fontWeight: 600,
                marginBottom: "2rem",
              }}
            >
              {" "}
              MyFantasy Draft
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
                    <Label for="UserName">User name</Label>
                    <Input
                      style={myStyle}
                      type="input"
                      name="UserName"
                      id="UserName"
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
                      <Label for="Email">Email</Label>
                      <Input
                        style={myStyle}
                        type="email"
                        name="Email"
                        id="Email"
                        placeholder="Email"
                      />
                    </div>
                  )}

                  {loginRegisterToggle ? (
                    <>
                      <div
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 550,
                          marginBottom: "1rem",
                        }}
                      >
                        <Label for="RegistrationPassword">Password</Label>
                        <Input
                          style={myStyle}
                          type="password"
                          name="RegistrationPassword"
                          id="RegistrationPassword"
                          placeholder="Password"
                          value={password}
                          onChange={handleRegistrationPasswordChange}
                        />
                      </div>
                      <div
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 550,
                          marginBottom: "1rem",
                        }}
                      >
                        <Label for="ConfrimPassword">Confirm Password</Label>
                        <Input
                          style={myStyle}
                          type="password"
                          name="ConfrimPassword"
                          id="ConfrimPassword"
                          placeholder="Retype Password"
                          disabled={!passwordValidated}
                          value={confirmPassword}
                          onChange={handleConfirmPasswordChange}
                        />
                      </div>
                    </>
                  ) : (
                    <div
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 550,
                        marginBottom: "1rem",
                      }}
                    >
                      <Label for="LoginPassword">Password</Label>
                      <Input
                        style={myStyle}
                        type="password"
                        name="LoginPassword"
                        id="LoginPassword"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <Button
                        style={{
                          fontSize: ".8rem",
                          fontWeight: "lighter",
                          background: "transparent",
                          padding: ".5rem",
                          borderRadius: "5px",
                          border: "1px solid #fff",
                          color: "#8B008B",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setforgotToggle(!forgotToggle)
                        }
                      >
                        Forgot UserName or Password?
                      </Button>
                    </div>
                  )}
                </FormGroup>
              </Form>
            </div>
            <div>
              {loginRegisterToggle ? (
                <Button
                  id="btnRegister"
                  className="button-login"
                  onClick={handleRegister}
                  disabled={isRegisterButtonDisabled}
                >
                  Register
                </Button>
              ) : (
                <Button
                  id="btnLogin"
                  className="button-login"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )}
            </div>
            <div style={{ marginTop: "1rem" }}>
              <Button
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "lighter",
                  background: "transparent",
                  padding: ".5rem",
                  borderRadius: "5px",
                  border: "1px solid #fff",
                  color: "#8B008B",
                  cursor: "pointer",
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
        <div
          style={{
            paddingTop: "2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className={
              status === "ERROR" ||
              status === "FAILED" ||
              status === 400 ||
              status === 401 ||
              status === 403 ||
              status === 404 ||
              status === 500
                ? "alert alert-danger"
                : status === "INFO"
                ? "alert alert-info"
                : status === "WARN"
                ? "alert alert-warning"
                : status === "SUCCESS"
                ? "alert alert-success"
                : "alert alert-success"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
