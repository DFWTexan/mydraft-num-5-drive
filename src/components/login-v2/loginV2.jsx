import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Button, Input } from "reactstrap";
import axios from "axios";

import "./login-V2.scss";
import { loginV2, registerV2, emailCodeConfirmation } from "../../slices/auth";
import { setMessage } from "../../slices/message";
import { clearMessage } from "../../slices/message";
import { userInfoStatus } from "../../slices/user";
import { fetchActiveLeague } from "../../slices/league";

const LoginV2 = () => {
  const [loginRegisterToggle, setLoginRegisterToggle] = useState(true);
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
    useState(false);
  const [isResetPssWrdButtonDisabled, setIsResetPssWrdButtonDisabled] =
    useState(true);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [isCodedEntered, setIsCodeEntered] = useState(false);
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

  const handleEmailChange = (e) => {
    setRegisterEmail(e.target.value);
    handleEmailValidation(e);
  };

  // email validation
  const handleEmailValidation = (e) => {
    if (e.target.value === "") {
      setIsEmailValidated(false);
      dispatch(clearMessage());
      return;
    }
    let email = e.target.value;
    let emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+/;
    if (emailRegex.test(email)) {
      setIsEmailValidated(true);
      dispatch(clearMessage());
    } else {
      setIsEmailValidated(false);
      dispatch(
        setMessage({
          status: "WARN",
          message: "Email is not valid",
        })
      );
    }
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

    // let username = document.getElementById("UserLoginName").value;
    let password = null;
    let email = document.getElementById("Email").value;

    dispatch(loginV2({ email, password }))
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

    let username = "null";
    let email = document.getElementById("Email").value;
    let password = "null";

    dispatch(registerV2({ username, email, password }))
      .unwrap()
      .then(() => {
        dispatch(loginV2({ email }))
          .unwrap()
          .then(() => {
            setIsEmailSent(true);
            // dispatch(userInfoStatus());
            // dispatch(fetchActiveLeague(1));
            setMessage({ status: "INFO", message: "Login Ready for use..." });
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
    setCodeFromEmail(e.target.value.toUpperCase());
    // let code = e.target.value;
    // if (code === codeFromEmail) {
    //   setIsCodeValid(true);
    //   dispatch(clearMessage());
    // } else {
    //   setIsCodeValid(false);
    //   setNewPassword("");
    //   setConfirmNewPassword("");
    //   dispatch(
    //     setMessage({
    //       status: "WARN",
    //       message: "Code from email is not valid",
    //     })
    //   );
    // }
    if (e.target.value.length < 6) {
      setIsCodeEntered(false);
      dispatch(clearMessage());
      return;
    } else {
      setIsCodeEntered(true);
      dispatch(clearMessage());
    }
  };

  const handleCheckCode = () => {
    let email = document.getElementById("Email").value;
    let code = document.getElementById("CodeFromEmail").value;

    dispatch(emailCodeConfirmation({ email, code }))
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
                  {/* {loginRegisterToggle && ( */}
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
                      value={registerEmail}
                      placeholder="Enter Valid Email"
                      onChange={handleEmailChange}
                    />
                  </div>
                  {/* )} */}
                </FormGroup>
              </Form>
            </div>
            <div>
              {loginRegisterToggle && !isEmailSent ? (
                <Button
                  id="btnRegister"
                  className="button-login"
                  onClick={handleRegister}
                  disabled={!isEmailValidated}
                >
                  View Demo
                </Button>
              ) : (
                <>
                  {isEmailSent ? (
                    <>
                      <div>
                        <Form>
                          <FormGroup>
                            <div
                              style={{
                                fontSize: "1.1rem",
                                fontWeight: 550,
                                marginBottom: "1rem",
                              }}
                            >
                              <Label for="CodeFromEmail">Code from Email</Label>
                              <Input
                                style={{
                                  ...myStyle,
                                  width: "100px",
                                  textAlign: "center",
                                  fontSize: "1.5rem",
                                  fontWeight: 500,
                                }}
                                type="text"
                                name="CodeFromEmail"
                                id="CodeFromEmail"
                                value={codeFromEmail}
                                placeholder="Enter Code from Email"
                                onChange={handleCodeFromEmailChange}
                              />
                            </div>
                          </FormGroup>
                        </Form>
                        <Button
                          id="btnRegister"
                          className="button-login"
                          onClick={handleCheckCode}
                          disabled={!isCodedEntered}
                        >
                          Continue to Demo
                        </Button>
                      </div>
                    </>
                  ) : null}
                </>
              )}
            </div>
            {/* <div style={{ marginTop: "1rem" }}>
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
            </div> */}
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
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        >
          <div
            className={
              status === "Error" ||
              status === "ERROR" ||
              status === "Failed" ||
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

export default LoginV2;
