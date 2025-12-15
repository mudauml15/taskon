import { DollarSign, User } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function AccountScreen() {
  const balance = 500;

  return (
    <ScrollView className="flex-1 bg-slate-900 p-6 pt-12">
      {/* Profile */}
      <View className="items-center mb-8">
        <View className="bg-slate-800 w-24 h-24 rounded-full items-center justify-center border-2 border-cyan-500 mb-4">
          <User size={40} color="#06b6d4" />
        </View>
        <Text className="text-white text-2xl font-bold">John Doe</Text>
        <Text className="text-slate-400">john.doe@email.com</Text>
      </View>

      {/* Balance */}
      <View className="bg-slate-800 rounded-2xl p-6 mb-6 border border-slate-700">
        <View className="flex-row justify-between items-center">
          <Text className="text-slate-400">Account Balance</Text>
          <View className="flex-row items-center">
            <DollarSign size={22} color="#fbbf24" />
            <Text className="text-amber-400 text-2xl font-bold ml-1">
              {balance.toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity className="bg-cyan-600 rounded-xl p-3 mt-4 items-center">
          <Text className="text-white font-semibold">Add Funds</Text>
        </TouchableOpacity>
      </View>

      {/* Menu */}
      {[
        "My Services",
        "Booking History",
        "Settings",
        "Terms and Condition",
      ].map((item) => (
        <TouchableOpacity
          key={item}
          className="bg-slate-800 rounded-2xl p-4 mb-4 border border-slate-700"
        >
          <View className="flex-row justify-between">
            <Text className="text-white">{item}</Text>
            <Text className="text-slate-400">→</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
