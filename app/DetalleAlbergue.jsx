import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function DetalleAlbergue() {
  const albergue = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{albergue.edificio}</Text>

        <View style={styles.detail}>
          <Text style={styles.label}>Ciudad:</Text>
          <Text style={styles.value}>{albergue.ciudad}</Text>
        </View>

        <View style={styles.detail}>
          <Text style={styles.label}>Código:</Text>
          <Text style={styles.value}>{albergue.codigo}</Text>
        </View>

        <View style={styles.detail}>
          <Text style={styles.label}>Coordinador:</Text>
          <Text style={styles.value}>{albergue.coordinador}</Text>
        </View>

        <View style={styles.detail}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.value}>{albergue.telefono}</Text>
        </View>

        <View style={styles.detail}>
          <Text style={styles.label}>Capacidad:</Text>
          <Text style={styles.value}>{albergue.capacidad}</Text>
        </View>

        <View style={styles.detail}>
          <Text style={styles.label}>Latitud:</Text>
          <Text style={styles.value}>{albergue.lat}</Text>
        </View>

        <View style={styles.detail}>
          <Text style={styles.label}>Longitud:</Text>
          <Text style={styles.value}>{albergue.lng}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'blue',
  },
  detail: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    width: 110,
    color: '#555',
  },
  value: {
    flex: 1,
    color: '#000',
  },
});