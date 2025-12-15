import { ScrollView, Text, TouchableOpacity } from "react-native";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="px-6"
      contentContainerStyle={{ paddingRight: 24 }}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          className={`rounded-full px-6 py-2.5 mr-3 border ${
            selectedCategory === cat
              ? "bg-cyan-600 border-cyan-500"
              : "bg-slate-800 border-cyan-500/50"
          }`}
          onPress={() => onSelectCategory(cat)}
        >
          <Text
            className={`font-semibold ${
              selectedCategory === cat ? "text-white" : "text-cyan-400"
            }`}
          >
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
