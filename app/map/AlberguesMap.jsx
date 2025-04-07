import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import axios from 'axios';

export default function AlberguesMap() {
  const [albergues, setAlbergues] = useState([]);  
  const [selected, setSelected] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [showLegend, setShowLegend] = useState(true); 

  useEffect(() => {
    axios.get('https://adamix.net/defensa_civil/def/albergues.php')
      .then(res => {
        setAlbergues(res.data.datos);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching albergues:', err);
        setLoading(false);
      });
  }, []);

  const parseCoordinates = (latStr, lngStr) => {  
    const lat = parseFloat(lngStr);  
    const lng = parseFloat(latStr);  

    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return null;
    }
    return { latitude: lat, longitude: lng };
  };

  const getMarkerColor = (capacidadStr) => {  
    const cleanCapacity = capacidadStr.replace(/[^0-9]/g, '');
    const capacidad = parseInt(cleanCapacity, 10);

    if (isNaN(capacidad)) return require('../../assets/markers/marker_gray.png');  
    if (capacidad <= 100) return require('../../assets/markers/marker_orange.png');
    if (capacidad <= 500) return require('../../assets/markers/marker_purple.png');
    return require('../../assets/markers/marker_red.png');
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 18.4861,
          longitude: -69.9312,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
      >
        {albergues.map((albergue) => {
          const coords = parseCoordinates(albergue.lat, albergue.lng);
          if (!coords) {
            console.warn('Albergue omitido:', albergue.codigo);
            return null;
          }

          return (
            <Marker
              key={albergue.codigo}
              coordinate={coords}
              onPress={() => setSelected(albergue)}
            >
              <Image
                source={getMarkerColor(albergue.capacidad)}
                style={{ width: 30, height: 30 }}  
              />
              <Callout style={styles.callout}>
                <Text style={styles.calloutTitle}>{albergue.edificio}</Text>
                <Text>Capacidad: {albergue.capacidad || 'N/A'}</Text>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <Modal visible={!!selected} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            {selected && (
              <>
                <Text style={styles.modalTitle}>{selected.edificio}</Text>
                <Text style={styles.modalText}>📄 Código: {selected.codigo}</Text>
                <Text style={styles.modalText}>📍 {selected.ciudad}, {selected.provincia}</Text>
                <Text style={styles.modalText}>🏠 Dirección: {selected.direccion}</Text>
                <Text style={styles.modalText}>👤 Responsable: {selected.coordinador}</Text>
                <Text style={styles.modalText}>📞 Teléfono: {selected.telefono}</Text>
                <Text style={styles.modalText}>👥 Capacidad: {selected.capacidad || 'No especificada'}</Text>

                <Pressable onPress={() => setSelected(null)} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Cerrar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>

      {showLegend ? (
        <View style={styles.legendContainer}>
          <View style={styles.legendHeader}>
            <Text style={styles.legendTitle}>🗂️ Índice de Marcadores</Text>
            <Pressable onPress={() => setShowLegend(false)}>
              <Text style={styles.toggleLegendText}> ❌ </Text>
            </Pressable>
          </View>
          <View style={styles.legendItem}>
            <Image source={require('../../assets/markers/marker_orange.png')} style={styles.legendIcon} />
            <Text style={styles.legendText}>Capacidad baja (≤ 100)</Text>
          </View>
          <View style={styles.legendItem}>
            <Image source={require('../../assets/markers/marker_purple.png')} style={styles.legendIcon} />
            <Text style={styles.legendText}>Capacidad media (≤ 500)</Text>
          </View>
          <View style={styles.legendItem}>
            <Image source={require('../../assets/markers/marker_red.png')} style={styles.legendIcon} />
            <Text style={styles.legendText}>Capacidad alta (&gt; 500)</Text>
          </View>
          <View style={styles.legendItem}>
            <Image source={require('../../assets/markers/marker_gray.png')} style={styles.legendIcon} />
            <Text style={styles.legendText}>Sin información</Text>
          </View>
        </View>
      ) : (
        <Pressable style={styles.showLegendButton} onPress={() => setShowLegend(true)}>
          <Text style={styles.showLegendText}>🗂️ Mostrar índice</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  callout: {
    width: 200,
    padding: 5,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    elevation: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    padding: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5A5A5A',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  },
  modalButton: {
    marginTop: 24,
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  legendContainer: {
    position: 'absolute',
    top: 20,
    left: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 10,
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 240,
  },
  legendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  toggleLegendText: {
    color: '#1976D2',
    fontWeight: '600',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  legendIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#444',
  },
  showLegendButton: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    backgroundColor: '#1976D2',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  showLegendText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
