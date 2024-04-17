import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3007/api/v1/auth/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      } catch (error) {
        console.error("Erreur lors de la récupération des informations de l'utilisateur :", error);
        dispatch({ type: "LOGIN_FAILURE" });
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
