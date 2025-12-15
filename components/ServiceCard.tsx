import { DollarSign, Star } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import type { Service } from "../data/mockServices";

interface ServiceCardProps {
  service: Service;
  onPress: () => void;
}

export function ServiceCard({ service, onPress }: ServiceCardProps) {
  return (
    <TouchableOpacity
      className="bg-slate-800 rounded-2xl p-4 mb-4 border border-slate-700 active:border-cyan-500"
      onPress={onPress}
    >
      <View className="flex-row items-start">
        <View className="bg-slate-700 rounded-xl w-16 h-16 items-center justify-center mr-3">
          <Text className="text-4xl">{service.image}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-white font-bold text-lg mb-1">
            {service.title}
          </Text>
          <Text className="text-slate-400 text-sm mb-2">
            {service.provider}
          </Text>
          <View className="flex-row items-center mb-2">
            <Star size={14} color="#fbbf24" fill="#fbbf24" />
            <Text className="text-amber-400 font-semibold ml-1 mr-2">
              {service.rating}
            </Text>
            <Text className="text-slate-500 text-xs">
              ({service.reviews} reviews)
            </Text>
          </View>
          <View className="flex-row items-center">
            <DollarSign size={16} color="#fbbf24" />
            <Text className="text-amber-400 font-bold text-lg">
              {service.pricePerHour}
            </Text>
            <Text className="text-slate-400 text-sm ml-1">/hour</Text>
          </View>
        </View>
      </View>
      <Text className="text-slate-400 text-sm mt-3">{service.description}</Text>
    </TouchableOpacity>
  );
}
