import React from "react";
import styled from "styled-components/native";

const SFormError = styled.Text`
  color: tomato;
  font-weight: 600;
  font-size: 16px;
  margin: 10px 0px 15px 0px;
  text-align: center;
`;

interface IFormErrorProps {
  message?: string;
}

const FormError: React.FC<IFormErrorProps> = ({ message }) => {
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
};

export default FormError;
