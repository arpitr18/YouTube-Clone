import {
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Platform, // ✅ Import Platform
} from "react-native";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import Icon from "@expo/vector-icons/Feather";
import { fetchTrendingVideos } from "../api/youtube";
import { categories } from "../utils/constants";

export default function HomeScreens() {
  const [activeCat, setActiveCat] = useState("All");
  const [videos, setVids] = useState([]);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetchTrendingVideos();
    setVids(data);
    SetLoading(false);
  };

  return (
    <View 
      className="flex-1 bg-neutral-800" 
      style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10 }}
    >
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <ScrollView className="flex-1">
          <View className="mx-4 my-3 flex-row items-center justify-between">
            <View className="flex-1 flex-row items-center">
              <Image source={require("../assets/youtube.png")} className="mr-2 h-8 w-10" />
              <Text className="text-[20px] font-bold text-white">YouTube</Text>
            </View>

            <View className="flex-row gap-4">
              <Icon name="cast" size={25} color="white" />
              <Icon name="bell" size={25} color="white" />
              <Icon name="search" size={25} color="white" />
              <Image source={require("../assets/Me.jpg")} className="h-8 w-8 rounded-full" />
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 px-3 my-2">
            {categories.map((category, index) => {
              const isActive = category === activeCat;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveCat(category)}
                  style={{
                    backgroundColor: isActive ? "#FFFFFF" : "rgba(255,255,255,0.1)",
                    minWidth: 80,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 6,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    marginRight: 8,
                  }}
                >
                  <Text className={`${isActive ? "text-black" : "text-white"} text-base font-bold`}>
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <ScrollView className="border-t-zinc-700 border-4 border-l-0 border-r-0 mt-2 pt-2">
            {videos.map((video, index) => (
              <VideoCard video={video} key={index} />
            ))}
          </ScrollView>
        </ScrollView>
      )}
    </View>
  );
}
