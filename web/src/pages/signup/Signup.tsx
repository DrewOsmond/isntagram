import React, { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { registerUser } from "../../redux/reducers/session";
import SessionForm from "../../components/sessionForm/SessionForm";
import FormInput from "../../components/styled/SessionForm/Input.style";
import FormContainer from "../../components/styled/SessionForm/Form.style";
import SubmitButton from "../../components/styled/SessionForm/SubmitButton.style";
import FormInfo from "../../components/styled/SessionForm/FormInfo.style";

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
      <FormInfo>Sign up to see photos and videos from your friends.</FormInfo>
      <FormContainer onSubmit={handleSignup}>
        <FormInput
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormInput
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <SubmitButton type="submit">sign up</SubmitButton>
      </FormContainer>
    </SessionForm>
  );
};

export default Signup;
