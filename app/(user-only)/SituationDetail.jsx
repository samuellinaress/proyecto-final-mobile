import { useLocalSearchParams } from "expo-router";
import { Image, Text, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";

export default function SituationDetail() {
  const { data } = useLocalSearchParams();
  const situation = JSON.parse(data);

  console.log(situation.foto);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: situation.foto }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{situation.titulo}</Text>
        <Text style={styles.description}>Codigo: {situation.id}</Text>
        <Text style={styles.description}>
          Descripcion: {situation.descripcion}
        </Text>
        <Text style={styles.description}>Estado: {situation.estado}</Text>
        <Text style={styles.date}>{situation.fecha}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  textContainer: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: "100%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    textAlign: "justify",
  },
  date: {
    fontSize: 14,
    color: "#888",
    textAlign: "right",
  },
});
