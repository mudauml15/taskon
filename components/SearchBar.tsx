import { Search } from "lucide-react-native";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search services, providers, or categories...",
}: SearchBarProps) {
  return (
    <View className="bg-slate-800 rounded-2xl p-4 mx-6 mb-4 border border-slate-700">
      <View className="flex-row items-center">
        <Search size={20} color="#94a3b8" />
        <TextInput
          className="flex-1 text-white ml-3 text-base"
          placeholder={placeholder}
          placeholderTextColor="#64748b"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}
