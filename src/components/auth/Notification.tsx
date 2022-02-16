import React from "react";
import styled from "styled-components/native";

const SNotification = styled.Text`
  color: #2ecc71;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
`;

interface INotificationProps {
  message?: string;
}

const Notification: React.FC<INotificationProps> = ({ message }) => {
  return message === "" || !message ? null : (
    <SNotification>{message}</SNotification>
  );
};

export default Notification;
