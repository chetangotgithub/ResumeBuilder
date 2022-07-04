import { createContext, useEffect, useState } from "react";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
export const Context = createContext();

const UserContext = ({ children }) => {
  const [currUserId, setCurrUserId] = useState(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        setCurrUserId(userAuth.uid);
      } else {
        setCurrUserId(null);
      }

      return () => subscriber();
    });
  }, []);
  return (
    <>
      <Context.Provider value={currUserId}>{children}</Context.Provider>
    </>
  );
};

export default UserContext;
