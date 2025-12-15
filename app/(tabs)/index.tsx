import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { AccountHeader } from "../../components/AccountHeader";
import { CategoryFilter } from "../../components/CategoryFilter";
import { SearchBar } from "../../components/SearchBar";
import { ServiceCard } from "../../components/ServiceCard";
import { mockServices } from "../../data/mockServices";

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(mockServices.map((s) => s.category))];

  const filteredServices = mockServices.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <View className="flex-1 bg-slate-900">
      {/* Sticky Header Section */}
      <View className="bg-slate-900 border-b border-slate-800 pt-12 pb-4">
        <AccountHeader
          userName="John Doe"
          balance={500}
          onAvatarPress={() => router.push("/(tabs)/profile")}
        />
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6">
          {/* Results Count */}
          {(searchQuery.length > 0 || selectedCategory !== "All") && (
            <Text className="text-slate-400 text-sm mb-4">
              Found {filteredServices.length} service
              {filteredServices.length !== 1 ? "s" : ""}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </Text>
          )}

          {/* Services Header */}
          <Text className="text-white text-2xl font-bold mb-4">
            {selectedCategory !== "All"
              ? selectedCategory
              : "Available Services"}
          </Text>

          {/* Services List */}
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onPress={() =>
                  router.push({
                    pathname: "/modal/booking",
                    params: { id: service.id },
                  })
                }
              />
            ))
          ) : (
            <View className="bg-slate-800 rounded-2xl p-8 border border-slate-700 items-center">
              <Text className="text-slate-400 text-center text-base">
                No services found {searchQuery && `matching "${searchQuery}"`}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
              </Text>
              <Text className="text-slate-500 text-center text-sm mt-2">
                Try searching with different keywords or categories
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
