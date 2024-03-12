'use client';
import React, { useState } from 'react';
import LoginPage from './components/login';
import SignUpPage from './components/signup';

const LoginSignUp = () => {
  const [formType, setFormType] = useState("login");

  const changeToSignUp = () => {
    setFormType("signup");
  }

  const changeToLogin = () => {
    setFormType("login");
  }

  if (formType == "login") {
    return (
      <LoginPage
        changeToSignUp={changeToSignUp} />
    )
  } else if (formType == "signup") {
    return (
      <SignUpPage
        changeToLogin={changeToLogin}
      />
    )
  }
};

export default LoginSignUp;
