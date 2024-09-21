import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";

//this will hold the title for each page
function Header(props) {
  const [authUser, setAuthUser] = useState(null);
  
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      console.log(props.email);

      listen();
    };
  });

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <header>
      <h1>Jam Donuts</h1>
      <div className = "headerDiv">
      <p>Signed In as {props.email}</p>
      <button className="sign-out" onClick={userSignOut}>Sign Out</button>
      </div>
    </header>
  );
}

export default Header;
