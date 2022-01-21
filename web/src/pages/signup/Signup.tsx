import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { registerUser } from "../../redux/reducers/session";
import SessionForm from "../../components/sessionForm/SessionForm";

type ReactFormEvent = React.BaseSyntheticEvent;

const Signup = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  console.log(errors);

  const handleSignup = (e: ReactFormEvent) => {
    e.preventDefault();
    const emailPattern: RegExp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const potentialErrors: string[] = [];

    if (!email.toLocaleLowerCase().match(emailPattern)) {
      potentialErrors.push("email must be valid");
    }
    if (confirmPassword !== password) {
      potentialErrors.push("passwords do not match");
    }

    if (potentialErrors.length) {
      return setErrors(potentialErrors);
    } else {
      //@ts-ignore
      dispatch(registerUser({ username, email, password }));
      setErrors([]);
    }
  };

  return (
    <SessionForm typeofForm="signup">
      <div className="signup__info">
        <div>Sign up to see photos and videos from your friends.</div>
      </div>
      <form className="session__form__container" onSubmit={handleSignup}>
        <input
          className="session__form__input"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <input
          className="session__form__input"
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="session__form__button" type="submit">
          sign up
        </button>
      </form>
    </SessionForm>
  );
};

export default Signup;
