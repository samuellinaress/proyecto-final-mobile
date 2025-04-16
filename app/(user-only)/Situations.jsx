import { useEffect, useState, useContext } from "react";
import AuthContext from "../store/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Situation from "./Situation";

export default function Situations() {
  const { user } = useContext(AuthContext);
  const [situations, setSituations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getSituations() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://adamix.net/defensa_civil/def/situaciones.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `token=${user.token}`,
          }
        );

        const data = await response.json();
        setLoading(false);

        if (!data.exito) {
          setError(data.mensaje);
          return;
        }

        setSituations(data.datos);
      } catch (error) {
        setLoading(false);
        setError("Error al obtener las situaciones");
      }
    }

    getSituations();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando situaciones...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {error.trim() && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {situations.length > 0 && (
        <FlatList
          data={situations}
          keyExtractor={(situation) => situation.id.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => <Situation situation={item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  errorContainer: {
    backgroundColor: "#FDECEA",
    borderColor: "#F44336",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
});
