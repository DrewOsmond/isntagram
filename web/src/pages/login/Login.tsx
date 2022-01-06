import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { loginUser } from "../../redux/reducers/session";
import SessionForm from "../../components/sessionForm/SessionForm";

type ReactFormEvent = React.BaseSyntheticEvent;

const Login = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: ReactFormEvent) => {
    e.preventDefault();
    const emailPattern: RegExp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!email.toLocaleLowerCase().match(emailPattern)) {
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  const form = (
    <>
      <div className="signup__info">
        Log in to see photos and videos from your friends.
      </div>
      <form className={"session__form__container"} onSubmit={handleLogin}>
        <input
          className="session__form__input"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="session__form__input"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="session__form__button" type="submit">
          login
        </button>
      </form>
    </>
  );

  return <SessionForm formInput={form} typeofForm="login" />;
};

export default Login;
