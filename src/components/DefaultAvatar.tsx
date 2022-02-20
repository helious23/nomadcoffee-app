import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

const SDefaultAvatar = styled.View<{ size: number }>`
  background-color: ${(props) => props.theme.formBorderColor};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

interface IDefaultAvatarProps {
  size: number;
}

const DefaultAvatar: React.FC<IDefaultAvatarProps> = ({ size }) => {
  const theme = useTheme();
  return (
    <SDefaultAvatar size={size}>
      <Ionicons name="person" size={size - 10} color={theme.fontColor} />
    </SDefaultAvatar>
  );
};

export default DefaultAvatar;
