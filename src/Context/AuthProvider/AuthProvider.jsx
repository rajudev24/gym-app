/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [searchClient, setSearchClient] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios("https://aperio-server.vercel.app/api/v1/user/me", {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        if (res?.data?.status === "success") {
          setUser(res?.data?.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        // console.log(error);
        // const Uerror = error
        setLoading(false);
      });
  }, [user?.email]);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    reload,
    setReload,
    searchClient,
    setSearchClient,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
