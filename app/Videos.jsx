import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://adamix.net/defensa_civil/def/videos.php')
      .then((response) => response.json())
      .then((data) => {
        console.log('📦 Datos crudos de la API:', data);
        setVideos(data.datos);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar videos:', error);
        setLoading(false);
      });
  }, []);

  const screenWidth = Dimensions.get('window').width;
  const height = (screenWidth * 9) / 16;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Lista de Videos</Text>

      {Array.isArray(videos) && videos.length > 0 ? (
        videos.map((video) => (
          <View key={video.id} style={styles.card}>
            <Text style={styles.title}>{video.titulo}</Text>
            <WebView
              style={{ height, width: '100%', marginVertical: 10 }}
              javaScriptEnabled
              source={{ uri: `https://www.youtube.com/embed/${video.link}` }}
            />
            <Text style={styles.description}>{video.descripcion}</Text>
            <Text style={styles.date}>{video.fecha}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noVideos}>No hay videos disponibles.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: '#444',
  },
  date: {
    marginTop: 5,
    fontSize: 12,
    color: '#888',
  },
  noVideos: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
});