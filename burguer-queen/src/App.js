import React from "react";
//import RouterPage from "./router/Router";
import Login from "./pages/Login";
import AuthProvider from "./services/auth/AuthProvider";
import AppRouter from "./router/Router";
import './assets/styles/App.css';

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </div>
  );
}

export default App;
