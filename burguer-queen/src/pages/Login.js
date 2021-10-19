import React from "react";
import logo from "../assets/images/Logo.svg";
import useAuth from "../services/auth/useAuth";

export default function Login() {
  const auth = useAuth();
  const handleLogin = () => {
    // @parameters email, password
    const user = auth.login('mesero@gmail.com','Mesero#2021');
    user
      .then((response) => {
        if(response.err) {
          console.error(response);
        } // Mostrar errores
        else {
          // hacer algo con la data login o nada
        }
      });
  }
  return (
    <div>
      <h1>LoginPage</h1>
        <img src={logo} className="App-logo" alt="Burguer Queen" />
        <button onClick={handleLogin}>Signin</button>
    </div>
    )
}
