import styled from "styled-components";

export default styled.div`
  height: ${(props: { typeofForm: string }) =>
    props.typeofForm === "signup" ? "450px" : "400px"};
  margin-top: ${(props: { typeofForm: string }) =>
    props.typeofForm === "signup" ? "45px" : "90px"};
  background-color: white;
  width: 350px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid #dcdbdc;
`;
