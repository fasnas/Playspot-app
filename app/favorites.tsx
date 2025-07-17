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
import { useLocalSearchParams } from "expo-router";

export default function FavoritesScreen() {
  const { favs } = useLocalSearchParams();
  const [venues, setVenues] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    if (favs) {
      setFavoriteIds(JSON.parse(favs as string));
    }
  }, [favs]);

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

  const favoriteVenues = venues.filter((v) => favoriteIds.includes(v.id));

  const renderVenue = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://phtest.demosoftfruit.com/${item.logo}` }}
        style={styles.image}
      />
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
      <Text style={styles.heading}>Favorite Venues</Text>
      <FlatList
        data={favoriteVenues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVenue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f4f4f4" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    overflow: "hidden",
  },
  image: { width: "100%", height: 180 },
  details: { padding: 10 },
  name: { fontSize: 18, fontWeight: "bold" },
  address: { color: "#666", marginVertical: 4 },
  rating: { color: "#888" },
  sports: { marginTop: 6, color: "#444" },
});
