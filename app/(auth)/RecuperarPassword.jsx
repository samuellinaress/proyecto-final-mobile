import { useState } from "react";
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

export default function RecuperarPassword() {
  const [login, setLogin] = useState({ cedula: "", correo: "" });
  const [response, setResponse] = useState({ type: null, message: "" });
  const [loading, setLoading] = useState(false);

  async function handlePress() {
    if (!login.cedula.trim() || !login.correo.trim()) {
      setResponse({
        type: "error",
        message: "Todos los campos son requeridos",
      });
      return;
    }

    if (login.cedula.length !== 11) {
      setResponse({
        type: "error",
        message: "La cedula debe tener 11 caracteres",
      });
      return;
    }

    if (!login.correo.includes("@") || !login.correo.includes(".com")) {
      setResponse({
        type: "error",
        message: "Inserte un email valido",
      });
      return;
    }

    setLoading(true);
    const response = await fetch(
      "https://adamix.net/defensa_civil/def/recuperar_clave.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `cedula=${login.cedula}&correo=${encodeURIComponent(
          login.correo
        )}`,
      }
    );

    const data = await response.json();
    setLoading(false);

    if (!data.exito) {
      setResponse({ type: "error", message: data.mensaje });
      return;
    }

    setResponse({ type: "succeeded", message: data.mensaje });
    setLogin({ cedula: "", correo: "" });
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
              name="id-card"
              size={20}
              color="gray"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Cedula"
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
              placeholder="E-mail"
              placeholderTextColor="gray"
              value={login.correo}
              onChangeText={(text) => setLogin({ ...login, correo: text })}
              keyboardType="email-address"
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
