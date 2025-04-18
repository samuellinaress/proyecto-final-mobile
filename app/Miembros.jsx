// app/Miembros.jsx
import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from "react-native";

export default function Miembros() {
  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://adamix.net/defensa_civil/def/miembros.php")
      .then((res) => res.json())
      .then((data) => {
        setMiembros(data.datos);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los miembros:", error);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.foto }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.nombre}</Text>
        <Text style={styles.role}>{item.cargo}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <FlatList
      data={miembros}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    elevation: 2,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  textContainer: {
    flexShrink: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  role: {
    fontSize: 14,
    color: "#666",
  },
});
