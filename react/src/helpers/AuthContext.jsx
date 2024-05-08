import axios from "axios";
import React, { createContext, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: null,
  accessToken: "",
  refreshToken: "",
  errorMessage: "",
  login: async () => {},
  logout: async () => {},
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useNavigate();

  const login = async (email, password) => {
    try {
      const LoginData = { email, password };
      await axios.post(`/Login`, LoginData).then(async (response) => {
        Cookies.set("token", response.data.jwt);
        router("/dashboard");

        setErrorMessage("");

        setAccessToken(response.data.jwt);
      });
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid Credentials");
    }
  };

  const logout = async (token) => {
    try {
      setUser(null);
      setAccessToken("");
      Cookies.remove("token");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, errorMessage, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
