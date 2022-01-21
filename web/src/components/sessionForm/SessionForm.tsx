import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

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
    <div className="session__page">
      <div className={"session__form " + typeofForm}>
        <h1 className="app__logo">Isntagram</h1>
        {children}
      </div>

      <div className="session__button__container">
        {redirectButtonPrefix}{" "}
        <button className="session__button" onClick={() => navigate(redirect)}>
          {redirectButtonTitle}
        </button>
      </div>
    </div>
  );
};

export default SessionForm;
