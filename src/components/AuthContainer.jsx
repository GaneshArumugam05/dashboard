// src/components/AuthContainer.jsx
import React, { useState } from "react";
import Login from "./Login";
import Signup from "./SignUp";
import ForgotPassword from "./ForgetPassword";

export default function AuthContainer() {
  const [screen, setScreen] = useState("login"); // login | signup | forgot

  return (
    <>
      {screen === "login" && (
        <Login 
          onSwitchToSignup={() => setScreen("signup")}
          onSwitchToForgot={() => setScreen("forgot")}
        />
      )}
      {screen === "signup" && <Signup onSwitchToLogin={() => setScreen("login")} />}
      {screen === "forgot" && <ForgotPassword onSwitchToLogin={() => setScreen("login")} />}
    </>
  );
}
