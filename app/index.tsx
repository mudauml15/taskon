import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Bell, Search, LogIn } from "lucide-react-native";

// Mock Components (you'll need to create these separately)
const WalletCard = ({ balance, className }) => (
  <View className={`bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 ${className}`}>
    <Text className="text-sm text-white/80 mb-1">Total Balance</Text>
    <Text className="text-3xl font-bold text-white">${balance.toFixed(2)}</Text>
  </View>
);

const CategoryPill = ({ name, icon, isActive, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 rounded-full mr-2 ${
      isActive ? "bg-purple-600" : "bg-gray-800"
    }`}
  >
    <Text className={`text-sm font-medium ${
      isActive ? "text-white" : "text-gray-300"
    }`}>
      {icon} {name}
    </Text>
  </TouchableOpacity>
);

const ServiceCard = ({ service, style }) => (
  <TouchableOpacity
    className="bg-gray-800 rounded-xl p-4 mb-4 border border-gray-700"
    style={style}
  >
    <View className="flex-row items-start justify-between mb-3">
      <View className="flex-1">
        <Text className="text-base font-semibold text-white mb-1">
          {service.title}
        </Text>
        <Text className="text-sm text-gray-400" numberOfLines={2}>
          {service.description}
        </Text>
      </View>
    </View>
    <View className="flex-row items-center justify-between">
      <Text className="text-lg font-bold text-purple-400">${service.price}</Text>
      <View className="flex-row items-center">
        <Text className="text-xs text-gray-400 mr-1">⭐</Text>
        <Text className="text-xs text-gray-400">{service.rating}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const BottomNav = () => (
  <View className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
    <View className="flex-row justify-around items-center py-3">
      <TouchableOpacity className="items-center">
        <Text className="text-2xl">🏠</Text>
        <Text className="text-xs text-purple-400 font-medium mt-1">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity className="items-center">
        <Text className="text-2xl">📋</Text>
        <Text className="text-xs text-gray-400 mt-1">Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity className="items-center">
        <Text className="text-2xl">💬</Text>
        <Text className="text-xs text-gray-400 mt-1">Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity className="items-center">
        <Text className="text-2xl">👤</Text>
        <Text className="text-xs text-gray-400 mt-1">Profile</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Mock Data
const mockUser = {
  name: "John Doe",
  balance: 1234.56,
  avatar: "https://i.pravatar.cc/150?img=12",
};

const categories = [
  { name: "All", icon: "📱" },
  { name: "Design", icon: "🎨" },
  { name: "Development", icon: "💻" },
  { name: "Marketing", icon: "📈" },
  { name: "Writing", icon: "✍️" },
];

const mockServices = [
  {
    id: 1,
    title: "Logo Design",
    description: "Professional logo design for your brand",
    price: 50,
    rating: 4.8,
    category: "Design",
  },
  {
    id: 2,
    title: "Website Development",
    description: "Modern responsive website development",
    price: 200,
    rating: 4.9,
    category: "Development",
  },
  {
    id: 3,
    title: "SEO Optimization",
    description: "Boost your website's search rankings",
    price: 75,
    rating: 4.7,
    category: "Marketing",
  },
  {
    id: 4,
    title: "Content Writing",
    description: "Engaging content for your audience",
    price: 30,
    rating: 4.6,
    category: "Writing",
  },
  {
    id: 5,
    title: "Brand Identity",
    description: "Complete brand identity package",
    price: 150,
    rating: 4.9,
    category: "Design",
  },
  {
    id: 6,
    title: "Mobile App",
    description: "Native mobile app development",
    price: 500,
    rating: 5.0,
    category: "Development",
  },
];

const Index = () => {
  const [user] = useState(mockUser);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices =
    activeCategory === "All"
      ? mockServices
      : mockServices.filter((s) => s.category === activeCategory);

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <StatusBar barStyle="light-content" />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-gray-950 px-4 py-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm text-gray-400">Welcome back,</Text>
              <Text className="text-xl font-bold text-white">{mockUser.name}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <TouchableOpacity className="relative rounded-full bg-gray-800 p-2.5">
                <Bell size={20} color="#fff" />
                <View className="absolute right-1 top-1 h-2 w-2 rounded-full bg-purple-500" />
              </TouchableOpacity>
              {user ? (
                <TouchableOpacity>
                  <Image
                    source={{ uri: mockUser.avatar }}
                    className="h-10 w-10 rounded-full"
                    style={{ borderWidth: 2, borderColor: "rgba(168, 85, 247, 0.3)" }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity className="flex-row items-center gap-2 rounded-full bg-purple-600 px-4 py-2">
                  <LogIn size={16} color="#fff" />
                  <Text className="text-sm font-medium text-white">
                    Login
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Search Bar */}
          <View className="relative mt-4">
            <Search
              size={16}
              color="#9CA3AF"
              style={{ position: "absolute", left: 16, top: 14, zIndex: 10 }}
            />
            <TextInput
              placeholder="Search services..."
              placeholderTextColor="#6B7280"
              className="w-full rounded-xl bg-gray-800 py-3 pl-11 pr-4 text-sm text-white"
            />
          </View>
        </View>

        <View className="px-4">
          {/* Wallet Card */}
          <WalletCard balance={mockUser.balance} className="mb-6" />

          {/* Platform Fee Notice */}
          <View className="mb-6 rounded-xl bg-purple-900/20 p-3 border border-purple-500/30">
            <Text className="text-xs text-purple-300">
              <Text className="font-semibold">💡 Note: </Text>
              A 15% platform fee applies to all services
            </Text>
          </View>

          {/* Categories */}
          <View className="mb-6">
            <Text className="mb-3 text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Categories
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="pb-2"
            >
              {categories.map((cat) => (
                <CategoryPill
                  key={cat.name}
                  name={cat.name}
                  icon={cat.icon}
                  isActive={activeCategory === cat.name}
                  onPress={() => setActiveCategory(cat.name)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Services */}
          <View className="mb-6">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-white">
                {activeCategory === "All" ? "Popular Services" : activeCategory}
              </Text>
              <Text className="text-sm text-gray-400">
                {filteredServices.length} available
              </Text>
            </View>

            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}

            {filteredServices.length === 0 && (
              <View className="py-12 items-center">
                <Text className="text-gray-400">
                  No services found in this category
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
};

export default Index;