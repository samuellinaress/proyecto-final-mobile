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
      <DrawerItem label="News" onPress={() => router.push("/News")} />
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
            label="Historia"
            onPress={() => router.push("/Historia")}
          />
          <DrawerItem
            label="Servicios"
            onPress={() => router.push("/Services")}
          />
          <DrawerItem
            label="Inicio sesion"
            onPress={() => router.push("/Login")}
          />

          <DrawerItem
            label="Videos"
            onPress={() => router.push("/Videos")}
          />

          <DrawerItem
            label="Mapa Albergues"
            onPress={() => router.push("/map/AlberguesMap")}
          />

          <DrawerItem
            label="Listado de Albergues"
            onPress={() => router.push("/Albergues")}
          />

          <DrawerItem
            label="Detalle de Albergues"
            onPress={() => router.push("/DetalleAlbergue")}
          />

          <DrawerItem
            label="Medidas Preventivas"
            onPress={() => router.push("/MedidasPreventivas")}
          />
          
          <DrawerItem
            label="Miembros"
            onPress={() => router.push("/Miembros")}
          />

          <DrawerItem
            label="Registro de voluntario"
            onPress={() => router.push("/volunteer/register")}
          />
          <DrawerItem
            label="Acerca de"
            onPress={() => router.push("/acerca-de/AcercaDe")}
          />
        </>
      )}
    </DrawerContentScrollView>
  );
}
