import { Link } from "expo-router";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function Situation({ situation }) {
  return (
    <View style={styles.card}>
      <Link
        href={{
          pathname: "/SituationDetail",
          params: { data: JSON.stringify(situation) },
        }}
        asChild
      >
        <Pressable
          style={({ pressed }) => [styles.link, pressed && styles.pressed]}
        >
          <Text style={styles.title}>{situation.titulo}</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  link: {
    paddingVertical: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
});
