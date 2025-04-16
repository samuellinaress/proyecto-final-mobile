import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, ActivityIndicator, FlatList } from "react-native";


export default function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNews = async () => {
            try {
                const res = await fetch("https://adamix.net/defensa_civil/def/noticias.php");
                const json = await res.json();

                if (json.exito) {
                    setNews(json.datos);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        getNews();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image
                source={{ uri: item.foto }}
                style={styles.foto}
            />
            <Text style={styles.nombre}>{item.titulo} - {item.fecha}</Text>
            <Text style={styles.descripcion}>{item.contenido}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#e67e22" />
                <Text>Cargando noticias...</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={news}
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