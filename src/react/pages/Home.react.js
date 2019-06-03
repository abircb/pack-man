import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import firebase from "../../firebase";
import Login from "./Login.react";
import Spinner from "./Spinner.react";

function Home() {
  const [user, loading] = useAuthState(firebase.auth());

  if (loading) {
    return <Spinner />;
  } else if (!user) {
    return <Login />;
  }

  return <h1>Home</h1>;
}

export default Home;
