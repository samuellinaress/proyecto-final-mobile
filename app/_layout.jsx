import { Drawer } from "expo-router/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { AuthContextProvider } from "./store/AuthContext";
import CustomDrawer from "./CustomDrawer";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Drawer drawerContent={(props) => <CustomDrawer {...props} />} />
      </SafeAreaProvider>
    </AuthContextProvider>
  );
}
