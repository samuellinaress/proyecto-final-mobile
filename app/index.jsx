import React, { useRef, useState } from "react";
import { Stack } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const sliderImages = [
  require("../assets/images/slider1.jpg"),
  require("../assets/images/slider2.jpg"),
  require("../assets/images/slider3.jpg"),
  require("../assets/images/slider4.png"),
  require("../assets/images/slider5.jpg"),
];

export default function Index() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Defensa Civil</Text>

        <View style={styles.sliderContainer}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={styles.slider}
          >
            {sliderImages.map((img, index) => (
              <Image
                key={index}
                source={img}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          <View style={styles.pagination}>
            {sliderImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </View>

          <Text style={styles.slogan}>
            Sentimos pasión por lo que hacemos
          </Text>
        </View>

        <Image
          source={require("../assets/images/logo-dc.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  sliderContainer: {
    width: "100%",
    alignItems: "center",
    gap: 10,
  },
  slider: {
    width: "100%",
  },
  image: {
    width: width - 40,
    height: 250,
    borderRadius: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#bbb",
  },
  activeDot: {
    backgroundColor: "#333",
  },
  slogan: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  logo: {
    width: 200,
    height: 60,
    marginTop: "auto",
    marginBottom: 10,
    opacity: 0.9,
  },
});
