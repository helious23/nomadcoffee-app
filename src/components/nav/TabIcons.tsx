import { Ionicons } from "@expo/vector-icons";

interface ITabIconProps {
  iconName: keyof typeof Ionicons.glyphMap;
  focusedIconName: keyof typeof Ionicons.glyphMap;
  focused: boolean;
  color: string;
  size: number;
}

const TabIcon: React.FC<ITabIconProps> = ({
  iconName,
  color,
  focused,
  size,
  focusedIconName,
}) => {
  return (
    <Ionicons
      name={focused ? iconName : focusedIconName}
      size={size}
      color={color}
    />
  );
};

export default TabIcon;
