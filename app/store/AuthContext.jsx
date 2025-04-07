import { createContext, useState } from "react";

const AuthContext = createContext({
  user: null,
  loginUser: (userData) => {},
  logout: () => {},
});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  function loginUser(userData) {
    setUser(userData);
  }

  function logoutUser() {
    setUser(null);
  }

  const authContext = {
    user,
    loginUser,
    logoutUser,
  };
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
