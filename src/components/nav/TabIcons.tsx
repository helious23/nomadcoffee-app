import { Ionicons, AntDesign } from "@expo/vector-icons";

interface ITabIconProps {
  IonIconsName?: keyof typeof Ionicons.glyphMap;
  focusedIonIconsName?: keyof typeof Ionicons.glyphMap;
  AntDesignIconsName?: keyof typeof AntDesign.glyphMap;
  focusedAntDesignIconsName?: keyof typeof AntDesign.glyphMap;
  focused: boolean;
  color: string;
  size: number;
  antDesign?: boolean;
}

const TabIcon: React.FC<ITabIconProps> = ({
  IonIconsName,
  focusedIonIconsName,
  AntDesignIconsName,
  focusedAntDesignIconsName,
  color,
  focused,
  size,
  antDesign,
}) => {
  return antDesign ? (
    <AntDesign
      name={focused ? AntDesignIconsName : focusedAntDesignIconsName}
      size={size}
      color={color}
    />
  ) : (
    <Ionicons
      name={focused ? IonIconsName : focusedIonIconsName}
      size={size}
      color={color}
    />
  );
};

export default TabIcon;
