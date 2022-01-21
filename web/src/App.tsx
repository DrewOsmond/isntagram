import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { restoreUser } from "./redux/reducers/session";

import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Profile from "./pages/profile/Profile";

function App() {
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState(false);
  const { user } = useAppSelector((state) => state.session);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setLoaded(true));
  }, [dispatch]);

  if (!user && loaded) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />;
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    );
  } else if (user) {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:profile" element={<Profile />} />
        </Routes>
      </>
    );
  } else {
    //make a loading screen at the start
    return <div>loading...</div>;
  }
}

export default App;
