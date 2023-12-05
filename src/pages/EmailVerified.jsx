import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const EmailVerified = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    const email = new URLSearchParams(location.search).get("email");

    // const verifyEmail = async () => {
    //   try {
    //     const response = await
    axios.post(
      `${process.env.REACT_APP_MYDRAFT_API_BASE_URL}Authenticate/ConfirmEmail`,
      { token, email }
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     // "Access-Control-Allow-Origin": "*",
      //     // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      //     // "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      //   },
      // }
    )
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      console.log("==> EMFTest (EmailVerified) - error: ", error);
    })

    // console.log("Email verified successfully!", response.data);

    // Redirect the user to a success page or perform other actions
    
    // } catch (error) {
    //   console.error("Failed to verify email:", error);

    //   // Redirect the user to an error page or perform other actions
    //   // navigate('/verification-error');
    // }
    // };

    // if (token) {
    //   verifyEmail();
    // } else {
    //   console.error("Email verification token not found!");
    //   // navigate('/verification-error');
    // }
  }, [navigate, location.search]);

  return (
    <div
      style={{ paddingTop: "5rem", display: "flex", justifyContent: "center" }}
    >
      <h1>EMAIL CONFIRMATION SUCCESS...</h1>
    </div>
  ); // or display a loading spinner
};

export default EmailVerified;
