import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
// Importa el set de íconos que prefieras
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ejemplo con MaterialIcons

export default function RegistroVoluntario() {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    apellido: '',
    clave: '',
    correo: '',
    telefono: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { cedula, nombre, apellido, clave, correo, telefono } = formData;

    if (!cedula || !nombre || !apellido || !clave || !correo || !telefono) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      const response = await fetch('https://adamix.net/defensa_civil/def/registro.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `cedula=${cedula}&nombre=${nombre}&apellido=${apellido}&clave=${clave}&correo=${correo}&telefono=${telefono}`,
      });

      // Asegúrate de que la respuesta sea OK antes de intentar parsear JSON
      if (!response.ok) {
          const errorText = await response.text(); // Intenta obtener texto si no es ok
          throw new Error(errorText || 'Error en la respuesta del servidor');
      }

      const data = await response.json();

      // Verifica si el mensaje existe antes de mostrarlo
      if (data && data.mensaje) {
        Alert.alert(data.exito ? 'Éxito' : 'Respuesta del servidor', data.mensaje);
        if (data.exito) {
          // Opcional: Limpiar formulario si el registro fue exitoso
          setFormData({ cedula: '', nombre: '', apellido: '', clave: '', correo: '', telefono: '' });
        }
      } else {
         // Si no hay mensaje, muestra una respuesta genérica o la data cruda
         Alert.alert('Respuesta', JSON.stringify(data));
      }

    } catch (error) {
      console.error("Error en handleSubmit:", error);
      Alert.alert('Error', `Ocurrió un error al registrar: ${error.message || 'Intenta de nuevo.'}`);
    }
  };

  // Datos de los inputs para renderizar dinámicamente (opcional pero bueno para organización)
  const inputFields = [
    { name: 'cedula', placeholder: 'Cédula', icon: 'badge', keyboardType: 'numeric' },
    { name: 'nombre', placeholder: 'Nombre', icon: 'person' },
    { name: 'apellido', placeholder: 'Apellido', icon: 'person-outline' },
    { name: 'clave', placeholder: 'Contraseña', icon: 'lock', secureTextEntry: true },
    { name: 'correo', placeholder: 'Correo electrónico', icon: 'email', keyboardType: 'email-address' },
    { name: 'telefono', placeholder: 'Teléfono', icon: 'phone', keyboardType: 'phone-pad' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Voluntario</Text>

      {inputFields.map((field) => (
        <View key={field.name} style={styles.inputContainer}>
          <Icon name={field.icon} size={22} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={field.placeholder}
            placeholderTextColor="#999" // Color del placeholder
            value={formData[field.name]} // Controla el valor desde el estado
            onChangeText={(value) => handleChange(field.name, value)}
            keyboardType={field.keyboardType || 'default'}
            secureTextEntry={field.secureTextEntry || false}
            autoCapitalize="none" // Generalmente útil para correos y claves
          />
        </View>
      ))}

      <Button title="Registrar" onPress={handleSubmit} color="#007AFF" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 26, // Ligeramente más grande
    fontWeight: 'bold',
    marginBottom: 30, // Más espacio
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row', // Para alinear ícono y texto horizontalmente
    alignItems: 'center', // Para alinear verticalmente
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8, // Bordes más redondeados
    marginBottom: 15,
    paddingHorizontal: 10, // Padding horizontal en el contenedor
  },
  icon: {
    marginRight: 10, // Espacio entre el ícono y el input
  },
  input: {
    flex: 1, // Para que el TextInput ocupe el espacio restante
    height: 45, // Altura fija para consistencia
    paddingVertical: 10, // Padding vertical dentro del input
    fontSize: 16, // Tamaño de fuente del texto
    color: '#333', // Color del texto ingresado
    // Quita el padding, backgroundColor, border y borderRadius del input individual
    // ya que ahora están en inputContainer
  },
  // Estilos para el botón (opcional, para mejor apariencia)
  button: { // Si usaras <TouchableOpacity> en lugar de <Button>
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { // Si usaras <TouchableOpacity>
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});