import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import SessionPage from "../../components/styled/SessionForm/SessionPage.style";
import SessionFormContainer from "../../components/styled/SessionForm/SessionFormContainer.style";
import FormLogo from "../../components/styled/SessionForm/FormLogo.style";
import SessionButton from "../../components/styled/SessionForm/SessionButton.style";
import SessionButtonContainer from "../../components/styled/SessionForm/SessionButtonContainer.style";
interface Props {
  typeofForm: string;
}

const SessionForm: FC<Props> = ({ children, typeofForm }) => {
  const navigate = useNavigate();
  const redirectButtonPrefix =
    typeofForm === "login" ? "Don't have an account?" : "Have an account?";
  const redirectButtonTitle = typeofForm === "login" ? "Sign up" : "Login";
  const redirect = typeofForm === "login" ? "/sign-up" : "/";

  return (
    <SessionPage>
      <SessionFormContainer typeofForm={typeofForm}>
        <FormLogo>Isntagram</FormLogo>
        {children}
      </SessionFormContainer>

      <SessionButtonContainer>
        {redirectButtonPrefix}{" "}
        <SessionButton onClick={() => navigate(redirect)}>
          {redirectButtonTitle}
        </SessionButton>
      </SessionButtonContainer>
    </SessionPage>
  );
};

export default SessionForm;
