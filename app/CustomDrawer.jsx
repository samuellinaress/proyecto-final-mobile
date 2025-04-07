import React, { useContext } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import AuthContext from "./store/AuthContext";

export default function CustomDrawer(props) {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Inicio" onPress={() => router.push("/")} />
      {user ? (
        <>
          <DrawerItem
            label="Reportar Situacion"
            onPress={() => router.push("/NewSituation")}
          />
          <DrawerItem
            label="Mis Situaciones"
            onPress={() => router.push("/Situations")}
          />
          <DrawerItem
            label="Mapa de Situaciones"
            onPress={() => router.push("/SituationsMap")}
          />
          <DrawerItem
            label="Cambiar Contrasenia"
            onPress={() => router.push("/CambiarPassword")}
          />
        </>
      ) : (
        <>
          <DrawerItem
            label="Inicio sesion"
            onPress={() => router.push("/Login")}
          />
        </>
      )}
    </DrawerContentScrollView>
  );
}
