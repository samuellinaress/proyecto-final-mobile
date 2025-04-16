import React from 'react';
import { View, Text, Image, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const developers = [
  {
    nombre: 'Samuel Linares',
    matricula: '2023-0215',
    telefono: '+18098645478',
    telegram: 'https://t.me/samuellinares',
    foto: require('../../assets/images/Samuel.jpg'), // ← Imagen local
  },
  {
    nombre: 'Kiara Custodio',
    matricula: '2023-0276',
    telefono: '+18297141418',
    telegram: 'https://t.me/KiaNic_23',
    foto: require('../../assets/images/Kiara.jpg'), // ← Imagen local
  },
  {
    nombre: 'Miguel Acosta',
    matricula: ' 2023-1050',
    telefono: '+18294092014',
    telegram: 'https://t.me/miguelac27',
    foto: require('../../assets/images/Miguel.jpg'), // ← Imagen local
  },
  {
    nombre: 'Huascar Espinal',
    matricula: '2023-0664',
    telefono: '+18297057166',
    telegram: 'https://t.me/huascar22',
    foto: require('../../assets/images/Huascar.jpg'), // ← Imagen local
  },
  {
    nombre: 'Ninel Feliz',
    matricula: '2023-0245',
    telefono: '+18496215558',
    telegram: 'https://t.me/nini1802',
    foto: require('../../assets/images/Ninel.jpg'), // ← Imagen local
  },
  {
    nombre: 'Wilme Gonzalez',
    matricula: '2023-0651',
    telefono: '+18297310444',
    telegram: 'https://t.me/wilmegm',
    foto: require('../../assets/images/Wilme.jpg'), // ← Imagen local
  }
];

export default function AcercaDe() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Acerca de la App</Text>
      <Text style={styles.subtitle}>Conoce a quienes hicieron esta app posible 👨‍💻👩‍🎨</Text>

      {developers.map((dev, index) => (
        <View key={index} style={styles.card}>
          <Image source={dev.foto} style={styles.avatar} />
          <Text style={styles.name}>{dev.nombre}</Text>
          <Text style={styles.role}>{dev.matricula}</Text>

          <View style={styles.actions}>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${dev.telefono}`)} style={styles.button}>
              <FontAwesome name="phone" size={24} color="white" />
              <Text style={styles.buttonText}>Llamar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL(dev.telegram)} style={[styles.button, styles.telegram]}>
              <MaterialCommunityIcons name="send" size={24} color="white" />
              <Text style={styles.buttonText}>Telegram</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f0f4f8',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 999,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  telegram: {
    backgroundColor: '#229ED9',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
});
