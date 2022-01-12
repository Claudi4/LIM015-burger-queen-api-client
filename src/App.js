import React from "react";
import AuthProvider from "./services/auth/AuthProvider";
import AppRouter from "./router/Router";

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
