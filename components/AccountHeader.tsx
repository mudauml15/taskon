import { DollarSign, User } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface AccountHeaderProps {
  userName: string;
  balance: number;
  onAvatarPress: () => void;
}

export function AccountHeader({
  userName,
  balance,
  onAvatarPress,
}: AccountHeaderProps) {
  return (
    <View className="flex-row justify-between items-center mb-4 px-6">
      <View className="flex-row items-center">
        <TouchableOpacity
          className="bg-slate-800 rounded-full w-12 h-12 items-center justify-center border-2 border-cyan-500 mr-3"
          onPress={onAvatarPress}
        >
          <User size={24} color="#06b6d4" />
        </TouchableOpacity>
        <View>
          <Text className="text-slate-400 text-xs">Welcome back!</Text>
          <Text className="text-white text-lg font-bold">{userName}</Text>
        </View>
      </View>
      <View className="bg-slate-800 rounded-full px-4 py-2 border border-cyan-500/30">
        <View className="flex-row items-center">
          <DollarSign size={16} color="#fbbf24" />
          <Text className="text-amber-400 font-bold ml-1">
            {balance.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}
