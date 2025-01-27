import { createContext, useEffect } from "react";
import ProductAPI from "./api/ProductAPI";
import { useState } from "react";
import axios from "axios";
import UserAPI from "./api/userAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const refreshToken = async () => {
    const res = await axios.get("http://localhost:4000/user/refresh_token", {
      withCredentials: true,
    });
    setToken(res.data.accesstoken);
  };
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) refreshToken();
  }, []);
  const state = {
    token: [token, setToken],
    productAPI: ProductAPI(),
    userAPI: UserAPI(token),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
