import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
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
    foto: require('../../assets/images/Huascar.jpg'), 
  },
  {
    nombre: 'Ninel Feliz',
    matricula: '2023-0245',
    telefono: '+18496215558',
    telegram: 'https://t.me/nini1802',
    foto: require('../../assets/images/Ninel.jpg'), 
  },
  {
    nombre: 'Wilme Gonzalez',
    matricula: '2023-0651',
    telefono: '+18297310444',
    telegram: 'https://t.me/wilmegm',
    foto: require('../../assets/images/Wilme.jpg'), 
  },
  {
    nombre: 'Gariel Encarnacion',
    matricula: '2021-2298',
    telefono: '+182995711462',
    telegram: 'https://t.me/gabriel_z14',
    foto: require('../../assets/images/Gabriel.jpg'), 
  }
];

export default function AcercaDe() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>✨ Acerca de nosotros ✨</Text>
      <Text style={styles.subtitle}>Conoce a quienes hicieron esta app posible</Text>

      {developers.map((dev, index) => (
        <View key={index} style={styles.card}>
          <Image source={dev.foto} style={styles.avatar} />
          <Text style={styles.name}>{dev.nombre}</Text>
          <Text style={styles.role}>{dev.matricula}</Text>

          <View style={styles.actions}>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${dev.telefono}`)} style={styles.button}>
              <FontAwesome name="phone" size={20} color="white" />
              <Text style={styles.buttonText}>Llamar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL(dev.telegram)} style={[styles.button, styles.telegram]}>
              <MaterialCommunityIcons name="send" size={20} color="white" />
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
    backgroundColor: '#f7f9fc',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 25,
    textAlign: 'center',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'transparent', // ← transparencia total
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 999,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  role: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 15,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    shadowColor: '#3b82f6',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  telegram: {
    backgroundColor: '#0088cc',
    shadowColor: '#0088cc',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 6,
  },
});