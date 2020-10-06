import React, { useReducer, createContext } from "react";

import Cookies from "js-cookie";

export const AuthContext = createContext();

function reducer(prevState, action) {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
        position: action.position,
      };
    case "SIGN_OUT":
      Cookies.remove("userToken");
      Cookies.remove("position");
      Cookies.remove("admin");
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        position: null,
      };
    default:
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
    position: null,
  });

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
}
