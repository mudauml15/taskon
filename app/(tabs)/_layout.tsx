import { Tabs } from 'expo-router';
import { Home, PlusCircle, User } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#1e293b' },
        tabBarActiveTintColor: '#06b6d4',
        tabBarInactiveTintColor: '#64748b',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} size={22} />,
        }}
      />

      <Tabs.Screen
        name="post"
        options={{
          title: 'Post',
          tabBarIcon: ({ color }) => (
            <PlusCircle color={color} size={22} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User color={color} size={22} />,
        }}
      />
    </Tabs>
  );
}
