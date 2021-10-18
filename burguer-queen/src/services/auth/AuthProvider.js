import { createContext, useState, useEffect } from "react";
import { signIn } from "../../helpers/post";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );

  useEffect(() => {
    try {
      sessionStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      sessionStorage.removeItem("user");
      console.log(error);
    }
  }, [user]);

  const contextValue = {
    user,
    login: async (email, password) => {
      const data = { email, password };
      const response = await signIn(data)
      // console.log(response)
      if(response.err) setUser(null)
      else setUser(response)
    },
    logout: () => {
      setUser(null);
    },
    isLogged() {
      return !!user;
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;