import { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, TextInput, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';


export default function AlberguesScreen() {
  const [albergues, setAlbergues] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios.get('https://adamix.net/defensa_civil/def/albergues.php')
      .then(response => {
        setAlbergues(response.data.datos);
        setCargando(false);
      });
  }, []);

  const filtrados = albergues.filter(a =>
    a.edificio.toLowerCase().includes(busqueda.toLowerCase())
  );

  const AlbergueItem = ({ albergue }) => (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
      }}
      onPress={() => router.push({
        pathname: './DetalleAlbergue',
        params: {
          ciudad: albergue.ciudad,
          codigo: albergue.codigo,
          edificio: albergue.edificio,
          coordinador: albergue.coordinador,
          telefono: albergue.telefono,
          capacidad: albergue.capacidad,
          lat: albergue.lat,
          lng: albergue.lng,
        },
      })}
    >
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{albergue.edificio}</Text>
      <Text style={{ fontSize: 14, color: 'gray' }}>{albergue.ciudad}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6', padding: 16 }}>
      <TextInput
        style={{ backgroundColor: 'white', padding: 12, borderRadius: 12, marginBottom: 16 }}
        placeholder="Buscar albergue..."
        value={busqueda}
        onChangeText={setBusqueda}
      />
      {cargando ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={filtrados}
          keyExtractor={item => item.codigo}
          renderItem={({ item }) => <AlbergueItem albergue={item} />}
        />
      )}
      </View>
  );
}