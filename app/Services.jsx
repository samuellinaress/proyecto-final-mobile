import React, { useEffect, useState } from "react";
import { FlatList, Text, View, StyleSheet, ActivityIndicator, Image } from "react-native";

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getServices = async () => {
            try {
                const res = await fetch("https://adamix.net/defensa_civil/def/servicios.php");
                const json = await res.json();
                if (json.exito) {
                    setServices(json.datos);
                }
            } catch (err) {
                console.error("Error al obtener los servicios:", err);
            } finally {
                setLoading(false);
            }
        };

        getServices();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image
                source={{ uri: item.foto }}
                style={styles.foto}
            />
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#e67e22" />
                <Text>Cargando servicios...</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={services}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    card: {
        backgroundColor: "#f2f2f2",
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    foto: {
        width: "100%",
        height: 180,
        borderRadius: 8,
        marginBottom: 10,
    },
    nombre: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 6,
    },
    descripcion: {
        fontSize: 14,
        color: "#333",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
