import { ActivityIndicator, View } from "react-native";
import { useTheme } from "styled-components/native";

interface IScreenLayoutProps {
  loading: boolean;
}

const ScreenLayout: React.FC<IScreenLayoutProps> = ({ loading, children }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.mainBgColor,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? <ActivityIndicator color={theme.fontColor} /> : children}
    </View>
  );
};

export default ScreenLayout;
