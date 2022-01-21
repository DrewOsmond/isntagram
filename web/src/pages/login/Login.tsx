import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { loginUser } from "../../redux/reducers/session";
import SessionForm from "../../components/sessionForm/SessionForm";
import FormContainer from "../../components/styled/SessionForm/Form.style";
import FormInput from "../../components/styled/SessionForm/Input.style";
import Button from "../../components/styled/SessionForm/Button.style";
import FormInfo from "../../components/styled/SessionForm/FormInfo.style";

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

  return (
    <SessionForm typeofForm="login">
      <FormInfo>Log in to see photos and videos from your friends.</FormInfo>
      <FormContainer onSubmit={handleLogin}>
        <FormInput
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormInput
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit">Log in</Button>
      </FormContainer>
    </SessionForm>
  );
};

export default Login;
