import { View, Text, ScrollView, StyleSheet, Image } from "react-native";

export default function Historia() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Historia de la Defensa Civil</Text>

      <Image
        source={require("../assets/images/logo-h.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.text}>
        Antes del año 1966, cuando llegaba la temporada de huracanes,
        un grupo de radioaficionados se reunía en la Cruz Roja para estar
        atentos por si surgía algún tipo de emergencia, inmediatamente
        ponerse a disposición y ayudar en todo lo posible, inclusive, usando
        sus propios equipos de comunicación para así tener contacto con el
        exterior en caso de que las redes telefónicas resultaran afectadas.
      </Text>

      <Text style={styles.text}>
        Al surgir el triunvirato fue designado el Dr. Rafael Cantizano Arias,
        como presidente de la Cruz Roja y al mismo tiempo nombraron al Ing.
        Carlos D´ Franco como director de la Defensa Civil, quien con un grupo
        compuesto por seis personas, se instaló en la calle Francia esquina Galván,
        siendo esa la primera oficina de la Defensa Civil.
      </Text>

      <Text style={styles.text}>
        Al surgir el Gobierno Provisional, presidido por el Dr. Héctor García Godoy,
        a los diecisiete días del mes de junio de 1966, fue promulgada la Ley 257,
        mediante la cual fue creada la Defensa Civil, institución dependiente de la
        Secretaría Administrativa de la Presidencia (ahora Ministerio de la Presidencia)
        y quien en la actualidad preside la Comisión Nacional de Emergencias.
      </Text>

      <Text style={styles.text}>
        Más adelante, el local fue trasladado a la calle Dr. Delgado No. 164 y luego en la
        gestión del Contralmirante Radhamés Lora Salcedo se reubicó a la Plaza de la Salud,
        donde aún permanece.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#E67E22",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 180,
    marginBottom: 20,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: "#333",
    marginBottom: 15,
    textAlign: "justify",
  },
});