import { View, Text, Image } from "react-native";
import React from "react";
import Icon from '@expo/vector-icons/Entypo';

const formatDuration = (seconds) => {
  if (!seconds) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const formatViews = (views) => {
  if (!views) return "0 views";
  if (views >= 1e6) return (views / 1e6).toFixed(1) + "M views";
  if (views >= 1e3) return (views / 1e3).toFixed(1) + "K views";
  return views + " views";
};

const VideoCard = ({ video, index }) => {
  return (
    <View className="px-2">
      {/* Video Thumbnail */}
      <Image 
        source={{ uri: video.videoThumbnails?.[0]?.url }} 
        className="h-52 w-full rounded-lg" 
      />
      
      {/* Video Duration */}
      <View className="flex items-end mr-2 mb-5 -mt-6">
        <View className="bg-black rounded px-1">
          <Text className="text-white font-semibold text-xs">
            {formatDuration(video.lengthSeconds)}
          </Text>
        </View>
      </View>

      {/* Video Info Section */}
      <View className="flex-row justify-between items-center pb-5 gap-3 mx-2">
        {/* Channel Avatar */}
        <Image
          source={{ uri: video.authorThumbnails?.[0]?.url || "https://dummyimage.com/100x100/000/fff&text=A" }}
          className="h-9 w-9 rounded-full"
        />

        <View className="flex-1">
          <Text className="text-white font-semibold" numberOfLines={2}>
            {video.title || "Untitled Video"}
          </Text>
          <Text className="text-zinc-400 text-xs">
            {video.author} • {video.viewCountText} • {video.publishedText}
          </Text>
        </View>

        <View>
          <Icon name='dots-three-vertical' size={15} color='white' />
        </View>
      </View>
    </View>
  );
};

export default VideoCard;
