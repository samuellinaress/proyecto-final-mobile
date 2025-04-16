import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AuthContext from "../store/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";

export default function SituationsMap() {
  const { user } = useContext(AuthContext);
  const [situations, setSituations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getSituations() {
      try {
        setLoading(true);
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
      } catch (err) {
        setLoading(false);
        setError("Error al cargar las situaciones.");
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
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 18.7357,
            longitude: -70.1627,
            latitudeDelta: 3.5,
            longitudeDelta: 3.5,
          }}
        >
          {situations.map((situation) => (
            <Marker
              key={situation.id}
              coordinate={{
                latitude: parseFloat(situation.latitud),
                longitude: parseFloat(situation.longitud),
              }}
              title={situation.titulo}
              description={situation.descripcion}
            />
          ))}
        </MapView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
