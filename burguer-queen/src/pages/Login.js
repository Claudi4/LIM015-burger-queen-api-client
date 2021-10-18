import React from "react";
import logo from "../assets/images/Logo.svg";
import { useHistory, useLocation } from 'react-router-dom';
import useAuth from "../services/auth/useAuth";

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const previusObjectURL = location.state?.from;
  const auth = useAuth();
  const handleLogin = () => {
    // @parameters email, password
    auth.login('amelanie.trillo27@gmail.com','Melanie#27');
    history.push(previusObjectURL || "/admin")
  }
  return (
    <div>
      <h1>LoginPage</h1>
        <img src={logo} className="App-logo" alt="Burguer Queen" />
        <button onClick={handleLogin}>Signin</button>
    </div>
    )
}
