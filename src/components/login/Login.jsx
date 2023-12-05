import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Button, Input } from "reactstrap";
import axios from "axios";

import "./login.scss";
import { login, register } from "../../slices/auth";
import { setMessage } from "../../slices/message";
import { clearMessage } from "../../slices/message";
import { userInfoStatus } from "../../slices/user";
import { fetchActiveLeague } from "../../slices/league";

const Login = () => {
  const [loginRegisterToggle, setLoginRegisterToggle] = useState(false);
  // const [userLoginName, setUserLoginName] = useState("");
  // const [loginPassword, setLoginPassword] = useState("");
  const [forgotToggle, setforgotToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { status, message } = useSelector((state) => state.message);
  const [password, setPassword] = useState("");
  const [isPasswordValidated, setIsPasswordValidated] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isNewPasswordValidated, setIsNewPasswordValidated] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [codeFromEmail, setCodeFromEmail] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] =
    useState(true);
  const [isResetPssWrdButtonDisabled, setIsResetPssWrdButtonDisabled] =
    useState(true);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const dispatch = useDispatch();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    handleNewPasswordValidation(e);
  };

  const handleRegistrationPasswordChange = (e) => {
    setPassword(e.target.value);
    handleRegistrationPasswordValidation(e);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleRegistrationPasswordValidation = (e) => {
    let password = e.target.value;
    let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (passwordRegex.test(password)) {
      setIsPasswordValidated(true);
      dispatch(clearMessage());
    } else {
      setIsPasswordValidated(false);
      dispatch(
        setMessage({
          status: "WARN",
          message:
            "Password must be at least 8 characters with 1 number and 1 special character",
        })
      );
    }
  };

  const handleNewPasswordValidation = (e) => {
    let newPassword = e.target.value;
    let newPasswordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (newPasswordRegex.test(newPassword)) {
      setIsNewPasswordValidated(true);
      dispatch(clearMessage());
    } else {
      setIsNewPasswordValidated(false);
      dispatch(
        setMessage({
          status: "WARN",
          message:
            "New Password must be at least 8 characters with 1 number and 1 special character",
        })
      );
    }
  };

  const handleLogin = () => {
    setIsLoading(true);
    dispatch(setMessage({ status: "INFO", message: "Logging in..." }));

    let username = document.getElementById("UserLoginName").value;
    let password = document.getElementById("LoginPassword").value;

    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        dispatch(userInfoStatus());
        dispatch(fetchActiveLeague());
      })
      .catch(() => {
        setIsLoading(false);
        setPassword("");
        setConfirmPassword("");
      });
  };

  const handleRegister = () => {
    // setIsLoading(true);
    dispatch(
      setMessage({ status: "INFO", message: "Registration in progress..." })
    );

    let username = document.getElementById("UserRegistrationName").value;
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
            // setIsLoading(false);
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

  const handleSendEmail = () => {
    setIsEmailSent(true);
    dispatch(clearMessage());
    let email = document.getElementById("ForgotEmail").value;
    setForgotEmail(email);
    dispatch(setMessage({ status: "INFO", message: "Sending email..." }));

    // dispatch(register({ email }))
    //   .unwrap()
    //   .then((response) => {
    //     dispatch(clearMessage());
    //     setCodeFromEmail(response.status);
    //     dispatch(
    //       setMessage({
    //         status: "SUCCESS",
    //         message: response.message,
    //       })
    //     );
    //   })
    //   .catch(() => {
    //     setIsLoading(false);
    //     setPassword("");
    //     setConfirmPassword("");
    //   });

    axios
      .post(
        `${process.env.REACT_APP_MYDRAFT_API_BASE_URL}Authenticate/ForgotPassword`,
        { email }
      )
      .then((response) => {
        dispatch(clearMessage());
        setCodeFromEmail(response.data.status);
        dispatch(
          setMessage({
            status: "SUCCESS",
            message: response.message,
          })
        );
      })
      .catch(() => {
        setIsLoading(false);
        setPassword("");
        setConfirmPassword("");
      });
  };

  const handleResetPassword = () => {
    // setIsLoading(true);
    dispatch(clearMessage());
    dispatch(setMessage({ status: "INFO", message: "Resetting password..." }));

    axios
      .post(
        `${process.env.REACT_APP_MYDRAFT_API_BASE_URL}Authenticate/Reset-Password`,
        { codeFromEmail, forgotEmail, newPassword }
      )
      .then((response) => {
        dispatch(clearMessage());
        setPassword(newPassword);
        dispatch(userInfoStatus());
        dispatch(fetchActiveLeague());
        dispatch(
          setMessage({
            status: "SUCCESS",
            message: response.message,
          })
        );
      })
      .catch(() => {
        setIsLoading(false);
        setPassword("");
        setConfirmPassword("");
      });
  };

  const handleCodeFromEmailChange = (e) => {
    let code = e.target.value;
    if (code === codeFromEmail) {
      setIsCodeValid(true);
      dispatch(clearMessage());
    } else {
      setIsCodeValid(false);
      setNewPassword("");
      setConfirmNewPassword("");
      dispatch(
        setMessage({
          status: "WARN",
          message: "Code from email is not valid",
        })
      );
    }
  };

  useEffect(() => {
    if (password.length >= 8 && password === confirmPassword) {
      setIsRegisterButtonDisabled(false);
    } else {
      setIsRegisterButtonDisabled(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (newPassword.length >= 8 && newPassword === confirmNewPassword) {
      setIsResetPssWrdButtonDisabled(false);
    } else {
      setIsResetPssWrdButtonDisabled(true);
    }
  }, [newPassword, confirmNewPassword]);

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
                    {!forgotToggle && (
                      <>
                        {loginRegisterToggle ? (
                          <>
                            <Label for="UserRegistrationName">User name</Label>
                            <Input
                              style={myStyle}
                              type="input"
                              name="UserRegistrationName"
                              id="UserRegistrationName"
                              placeholder="User Name"
                            />
                          </>
                        ) : (
                          <>
                            <Label for="UserLoginName">User name</Label>
                            <Input
                              style={myStyle}
                              type="input"
                              name="UserLoginName"
                              id="UserLoginName"
                              placeholder="User Name"
                            />
                          </>
                        )}
                      </>
                    )}
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
                  {forgotToggle && !loginRegisterToggle && (
                    <>
                      {!isEmailSent ? (
                        <div
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: 550,
                            marginBottom: "1rem",
                          }}
                        >
                          <Label for="ForgotEmail">
                            Enter Registration Email
                          </Label>
                          <Input
                            style={myStyle}
                            type="email"
                            name="ForgotEmail"
                            id="ForgotEmail"
                            placeholder="Email"
                          />
                          <div
                            style={{
                              paddingTop: "1rem",
                              fontWeight: "lighter",
                              fontSize: "1rem",
                              textAlign: "center",
                            }}
                          >
                            <p>
                              An email will be sent to registraton email for
                              Password Reset.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: 550,
                              marginBottom: "1rem",
                            }}
                          >
                            {/* <Label for="UserName">Code From Email</Label> */}
                            <Input
                              style={myStyle}
                              type="input"
                              name="CodeFromEmail"
                              id="CodeFromEmail"
                              placeholder="Enter Code From Email"
                              onChange={handleCodeFromEmailChange}
                            />
                          </div>
                          <div
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: 550,
                              marginBottom: "1rem",
                            }}
                          >
                            <Label for="NewPassword">New Password</Label>
                            <Input
                              style={myStyle}
                              type="password"
                              name="NewPassword"
                              id="NewPassword"
                              placeholder="New Password"
                              value={newPassword}
                              disabled={!isCodeValid}
                              onChange={handleNewPasswordChange}
                            />
                          </div>
                          <div
                            style={{
                              fontSize: "1.1rem",
                              fontWeight: 550,
                              marginBottom: "1rem",
                            }}
                          >
                            <Label for="ConfrimNewPassword">
                              Confirm New Password
                            </Label>
                            <Input
                              style={myStyle}
                              type="password"
                              name="ConfrimNewPassword"
                              id="ConfrimNewPassword"
                              placeholder="Retype New Password"
                              disabled={!isNewPasswordValidated}
                              value={confirmNewPassword}
                              onChange={handleConfirmNewPasswordChange}
                            />
                          </div>
                        </div>
                      )}
                    </>
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
                          disabled={!isPasswordValidated}
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
                      {!forgotToggle && (
                        <>
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
                        </>
                      )}

                      {/* <> */}
                      {forgotToggle ? (
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
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
                            onClick={() => setforgotToggle(!forgotToggle)}
                          >
                            Back
                          </Button>
                        </div>
                      ) : (
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
                          onClick={() => setforgotToggle(!forgotToggle)}
                        >
                          Forgot UserName or Password?
                        </Button>
                      )}
                      {/* </> */}
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
                <>
                  {forgotToggle ? (
                    <>
                      {!isEmailSent ? (
                        <Button
                          id="btnSendEmail"
                          className="button-login"
                          onClick={handleSendEmail}
                        >
                          Send Email
                        </Button>
                      ) : (
                        <Button
                          id="btnSendEmail"
                          className="button-login"
                          disabled={isResetPssWrdButtonDisabled}
                          onClick={handleResetPassword}
                        >
                          Reset Password
                        </Button>
                      )}
                      {/* <Button
                        id="btnSendEmail"
                        className="button-login"
                        onClick={handleSendEmail}
                      >
                        Send Email
                      </Button> */}
                    </>
                  ) : (
                    <Button
                      id="btnLogin"
                      className="button-login"
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  )}
                </>
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
                {!loginRegisterToggle ? "Sign-Up" : "Log In"}
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
            padddingright: ".5rem",
            padddingleft: ".5rem",
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
