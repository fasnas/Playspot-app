import React, { useState, useEffect } from "react";
import { View } from "react-native";
import VenueList from "./venuelist";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <VenueList favorites={favorites} setFavorites={setFavorites} router={router} />
    </View>
  );
}
