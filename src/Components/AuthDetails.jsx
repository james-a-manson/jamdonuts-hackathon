import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";


const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [isRegister, setIsRegister] = useState(false); 
  
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleAuthMode = () => {
    setIsRegister((prev) => !prev);
  };

  return (
    <>
        <>
          {isRegister ? (
            <SignUp toggleAuthMode={toggleAuthMode} />
          ) : (
            <SignIn toggleAuthMode={toggleAuthMode} />
          )}
        </>
    </>
  );
};

export default AuthDetails;
