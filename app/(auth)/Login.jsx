import { useContext, useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link, useRouter } from "expo-router";
import AuthContext from "../store/AuthContext";

export default function Login() {
  const [login, setLogin] = useState({ cedula: "", clave: "" });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);

  async function handlePress() {
    if (!login.cedula.trim() || !login.clave.trim()) {
      setError("Todos los campos son requeridos");
      return;
    }

    if (login.cedula.length !== 11) {
      setError("La cedula debe tener 11 caracteres");
      return;
    }

    setLoading(true);
    const response = await fetch(
      "https://adamix.net/defensa_civil/def/iniciar_sesion.php",
      {
        method: "POST",
        body: JSON.stringify(login),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    setLoading(false);

    if (!data.exito) {
      setError(data.mensaje);
      return;
    }

    loginUser(data.datos);
    router.push("/index");
    setLogin({ cedula: "", clave: "" });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="user" size={60} color="#007AFF" />
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <FontAwesome5
              name="id-card"
              size={20}
              color="gray"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Cédula"
              placeholderTextColor="gray"
              value={login.cedula}
              onChangeText={(text) => setLogin({ ...login, cedula: text })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputWrapper}>
            <FontAwesome5
              name="lock"
              size={20}
              color="gray"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="gray"
              secureTextEntry
              value={login.clave}
              onChangeText={(text) => setLogin({ ...login, clave: text })}
            />
          </View>
        </View>

        <Link href="/RecuperarPassword" style={styles.link}>
          Olvidaste tu Contraseña?
        </Link>

        <Pressable
          style={styles.button}
          onPress={handlePress}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "procesando..." : "Iniciar Sesión"}
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
  iconContainer: {
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
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
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
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
  link: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginBottom: 20,
    textAlign: "center",
  },
});
