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
import AuthContext from "../store/AuthContext";

export default function CambiarPassword() {
  const { user } = useContext(AuthContext);
  const [password, setPassword] = useState({
    clave_nueva: "",
    clave_anterior: "",
    token: user.token,
  });
  const [response, setResponse] = useState({ type: null, message: "" });
  const [loading, setLoading] = useState(false);

  async function handlePress() {
    if (!password.clave_nueva.trim() || !password.clave_anterior.trim()) {
      setResponse({
        type: "error",
        message: "Todos los campos son requeridos",
      });
      return;
    }

    setLoading(true);
    const response = await fetch(
      "https://adamix.net/defensa_civil/def/cambiar_clave.php",
      {
        method: "POST",
        body: JSON.stringify(password),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    setLoading(false);

    if (!data.exito) {
      setResponse({ type: "error", message: data.mensaje });
      return;
    }

    setResponse({ type: "succeeded", message: data.mensaje });
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

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <FontAwesome5
              name="lock"
              size={20}
              color="gray"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña vieja"
              placeholderTextColor="gray"
              secureTextEntry
              value={password.clave_anterior}
              onChangeText={(text) =>
                setPassword({ ...password, clave_anterior: text })
              }
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
              placeholder="Contraseña nueva"
              placeholderTextColor="gray"
              secureTextEntry
              value={password.clave_nueva}
              onChangeText={(text) =>
                setPassword({ ...password, clave_nueva: text })
              }
            />
          </View>
        </View>

        <Pressable
          style={styles.button}
          onPress={handlePress}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "procesando..." : "Enviar"}
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
