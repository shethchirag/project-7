import { createContext, useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userDetails, setUserDetails] = useState({});
  const [token, setToken] = useState(null);

  const userSignIn = (data) => {
    setUserDetails(data);
  };

  return (
    <AuthContext.Provider
      value={{ userDetails, setToken, token, userSignIn, setUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
}
