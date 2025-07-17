import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function VenueList({ favorites, setFavorites, router }) {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await axios.get("https://phtest.demosoftfruit.com/venue-api/");
        setVenues(res.data);
      } catch (err) {
        console.error("Error fetching venues:", err);
      }
    };
    fetchVenues();
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const renderVenue = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://phtest.demosoftfruit.com/${item.logo}` }}
        style={styles.image}
      />
      <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteBtn}>
        <Text style={{ fontSize: 20 }}>{favorites.includes(item.id) ? "❤️" : "🤍"}</Text>
      </TouchableOpacity>
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.address}>{item.address}</Text>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
        <Text style={styles.sports}>🎯 {item.sports?.join(", ")}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.favScreenBtn}
        onPress={() =>
          router.push({
            pathname: "/favorites",
            params: { favs: JSON.stringify(favorites) },
          })
        }
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>View Favorites</Text>
      </TouchableOpacity>

      <FlatList
        data={venues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVenue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", padding: 10 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    elevation: 4,
    overflow: "hidden",
    position: "relative",
  },
  image: { width: "100%", height: 180 },
  details: { padding: 12 },
  name: { fontSize: 18, fontWeight: "bold", color: "#333" },
  address: { color: "#666", marginVertical: 4 },
  rating: { color: "#888" },
  sports: { marginTop: 6, color: "#444" },
  favoriteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
  },
  favScreenBtn: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
});
