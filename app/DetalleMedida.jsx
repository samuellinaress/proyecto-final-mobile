// app/DetalleMedida.jsx
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function DetalleMedida() {
  const { id } = useLocalSearchParams();
  const [medida, setMedida] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://adamix.net/defensa_civil/def/medidas_preventivas.php")
      .then((res) => res.json())
      .then((data) => {
        const encontrada = data.datos.find((m) => m.id === id);
        setMedida(encontrada);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando detalle:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!medida) {
    return (
      <View style={styles.center}>
        <Text>No se encontró la medida.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{medida.titulo}</Text>
      <Image source={{ uri: medida.foto }} style={styles.image} />
      <Text style={styles.description}>{medida.descripcion}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: { fontSize: 16, textAlign: "justify", color: "#333" },
});
