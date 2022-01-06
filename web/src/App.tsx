import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { restoreUser } from "./redux/reducers/session";

import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState(false);
  const { user } = useAppSelector((state) => state.session);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setLoaded(true));
  }, []);

  if (!user && loaded) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />;
        <Route path="/sign-up" element={<Signup />} />
      </Routes>
    );
  } else if (user) {
    return (
      <>
        <div>howdee</div>
      </>
    );
  } else {
    //make a loading screen at the start
    return <div>loading...</div>;
  }
}

export default App;
