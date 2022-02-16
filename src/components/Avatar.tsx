import styled, { useTheme } from "styled-components/native";

interface SAvatarProps {
  size: number;
}

const SAvatar = styled.Image<SAvatarProps>`
  margin-right: 10px;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
`;

interface IAvatarProps {
  avatar: string;
  size: number;
  focused?: boolean;
}

const Avatar: React.FC<IAvatarProps> = ({ avatar, size, focused }) => {
  const theme = useTheme();
  return (
    <SAvatar
      size={size}
      source={{ uri: avatar }}
      resizeMode="cover"
      style={{
        borderColor: focused ? theme.fontColor : theme.tabBarBrodrColor,
        borderWidth: focused ? 1 : 0.2,
      }}
    />
  );
};

export default Avatar;
