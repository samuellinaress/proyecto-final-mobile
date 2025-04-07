import { useContext, useEffect, useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "../store/AuthContext";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

export default function NewSituation() {
  const [response, setResponse] = useState({ type: null, message: "" });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [situation, setSituation] = useState({
    token: user?.token ?? "",
    titulo: "",
    descripcion: "",
    foto: "",
    latitud: "",
    longitud: "",
  });

  useEffect(() => {
    async function obtenerUbicacion() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Debes permitir acceso a la ubicación."
        );
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setSituation((prev) => ({
        ...prev,
        latitud: location.coords.latitude.toString(),
        longitud: location.coords.longitude.toString(),
      }));
    }

    obtenerUbicacion();
  }, []);

  async function seleccionarImagen() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
    });

    if (!resultado.canceled) {
      setSituation({
        ...situation,
        foto: `data:image/jpeg;base64,${resultado.assets[0].base64}`,
      });
    }
  }

  async function handleSubmit() {
    if (
      !situation.titulo.trim() ||
      !situation.descripcion.trim() ||
      !situation.foto.trim()
    ) {
      setResponse({
        type: "error",
        message: "Todos los campos son requeridos",
      });
      console.log(situation);
      return;
    }
    setLoading(true);

    const response = await fetch(
      "https://adamix.net/defensa_civil/def/nueva_situacion.php",
      {
        method: "POST",
        body: JSON.stringify(situation),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    setLoading(false);

    if (!data.exito) {
      setResponse({
        type: "error",
        message: data.mensaje ?? "error al hacer la solicitud",
      });
      return;
    }

    setResponse({ type: "succeeded", message: data.mensaje });
    setSituation({
      token: user?.token ?? "",
      titulo: "",
      descripcion: "",
      foto: "",
      latitud: "",
      longitud: "",
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {response.type === "error" && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{response.message}</Text>
          </View>
        )}

        {response.type === "succeeded" && (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>{response.message}</Text>
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Titulo"
          placeholderTextColor="gray"
          value={situation.titulo}
          onChangeText={(text) => setSituation({ ...situation, titulo: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Descripcion"
          placeholderTextColor="gray"
          value={situation.descripcion}
          onChangeText={(text) =>
            setSituation({ ...situation, descripcion: text })
          }
        />
        <Pressable style={styles.imageButton} onPress={seleccionarImagen}>
          <Text style={styles.imageButtonText}>Seleccionar Foto</Text>
        </Pressable>
        {situation.foto.trim() && (
          <Image source={{ uri: situation.foto }} style={styles.imagePreview} />
        )}
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {loading ? "Guardando..." : "Guardar"}
          </Text>
        </Pressable>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#FFF",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageButton: {
    backgroundColor: "#EFEFEF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  imageButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  errorContainer: {
    backgroundColor: "#FDECEA",
    borderColor: "#F44336",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 16,
    fontWeight: "bold",
  },
  successContainer: {
    backgroundColor: "#E8F5E9",
    borderColor: "#388E3C",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  successText: {
    color: "#388E3C",
    fontSize: 16,
    fontWeight: "bold",
  },
});
