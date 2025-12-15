import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import {
  X,
  Star,
  Clock,
  DollarSign,
  Check,
  Calendar,
  MessageSquare,
} from "lucide-react-native";
import { mockServices } from "../../data/mockServices";
import { calculateTotal } from "../../utils/pricing";

export default function BookingModal() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [hours, setHours] = useState("2");
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [notes, setNotes] = useState("");
  const [balance] = useState(500);

  const service = mockServices.find((s) => s.id === Number(id));

  if (!service) return null;

  const hoursNum = parseFloat(hours) || 0;
  const { subtotal, fee, total } = calculateTotal(service.pricePerHour, hoursNum);

  const handleConfirmBooking = () => {
    if (hoursNum <= 0) {
      Alert.alert("Invalid Hours", "Please enter a valid number of hours");
      return;
    }
    if (balance < total) {
      Alert.alert(
        "Insufficient Balance",
        "Please add funds to your account to complete this booking."
      );
      return;
    }

    Alert.alert(
      "Booking Confirmed!",
      `Your booking for ${service.title} has been confirmed. The provider will contact you shortly.`,
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  const dates = ["Today", "Tomorrow", "This Week"];
  const times = [
    "8:00 AM",
    "10:00 AM",
    "12:00 PM",
    "2:00 PM",
    "4:00 PM",
    "6:00 PM",
  ];

  return (
    <View className="flex-1 bg-black/80">
      <View className="flex-1 mt-20 bg-slate-900 rounded-t-3xl">
        {/* Header */}
        <View className="flex-row justify-between items-center p-6 border-b border-slate-800">
          <Text className="text-white text-xl font-bold">Book Service</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <X size={24} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Service Info Card */}
          <View className="p-6">
            <View className="bg-slate-800 rounded-2xl p-4 border border-slate-700 mb-6">
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
                  <View className="flex-row items-center">
                    <Star size={14} color="#fbbf24" fill="#fbbf24" />
                    <Text className="text-amber-400 font-semibold ml-1">
                      {service.rating}
                    </Text>
                    <Text className="text-slate-500 text-xs ml-1">
                      ({service.reviews} reviews)
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Hours Selection */}
            <View className="mb-6">
              <Text className="text-white font-semibold mb-3">
                Number of Hours
              </Text>
              <View className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
                <View className="flex-row items-center">
                  <Clock size={20} color="#06b6d4" />
                  <TextInput
                    className="flex-1 text-white text-lg ml-3"
                    keyboardType="numeric"
                    value={hours}
                    onChangeText={setHours}
                    placeholder="Enter hours"
                    placeholderTextColor="#64748b"
                  />
                  <Text className="text-slate-400">hours</Text>
                </View>
              </View>
            </View>

            {/* Date Selection */}
            <View className="mb-6">
              <Text className="text-white font-semibold mb-3">Select Date</Text>
              <View className="flex-row gap-3">
                {dates.map((date) => (
                  <TouchableOpacity
                    key={date}
                    className={`flex-1 rounded-xl p-3 border ${
                      selectedDate === date
                        ? "bg-cyan-600 border-cyan-500"
                        : "bg-slate-800 border-slate-700"
                    }`}
                    onPress={() => setSelectedDate(date)}
                  >
                    <View className="items-center">
                      <Calendar
                        size={20}
                        color={selectedDate === date ? "#fff" : "#06b6d4"}
                      />
                      <Text
                        className={`text-sm mt-1 ${
                          selectedDate === date
                            ? "text-white font-semibold"
                            : "text-cyan-400"
                        }`}
                      >
                        {date}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Time Selection */}
            <View className="mb-6">
              <Text className="text-white font-semibold mb-3">
                Preferred Time
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {times.map((time) => (
                  <TouchableOpacity
                    key={time}
                    className={`rounded-full px-4 py-2 border ${
                      selectedTime === time
                        ? "bg-cyan-600 border-cyan-500"
                        : "bg-slate-800 border-slate-700"
                    }`}
                    onPress={() => setSelectedTime(time)}
                  >
                    <Text
                      className={`text-sm ${
                        selectedTime === time
                          ? "text-white font-semibold"
                          : "text-slate-400"
                      }`}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Notes */}
            <View className="mb-6">
              <Text className="text-white font-semibold mb-3">
                Additional Notes (Optional)
              </Text>
              <View className="bg-slate-800 rounded-2xl p-4 border border-slate-700">
                <View className="flex-row items-start">
                  <MessageSquare size={20} color="#06b6d4" />
                  <TextInput
                    className="flex-1 text-white ml-3"
                    multiline
                    numberOfLines={3}
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Any special requirements or instructions..."
                    placeholderTextColor="#64748b"
                    style={{ minHeight: 60, textAlignVertical: "top" }}
                  />
                </View>
              </View>
            </View>

            {/* Pricing Breakdown */}
            <View className="bg-slate-800 rounded-2xl p-4 border border-slate-700 mb-6">
              <Text className="text-white font-semibold mb-3">
                Pricing Breakdown
              </Text>
              <View className="space-y-2">
                <View className="flex-row justify-between items-center py-2">
                  <Text className="text-slate-400">
                    Service ({hoursNum}h × ${service.pricePerHour})
                  </Text>
                  <Text className="text-white font-semibold">
                    ${subtotal.toFixed(2)}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center py-2 border-t border-slate-700">
                  <View className="flex-row items-center">
                    <Text className="text-amber-400">Platform Fee (15%)</Text>
                  </View>
                  <Text className="text-amber-400 font-semibold">
                    +${fee.toFixed(2)}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center py-3 border-t-2 border-slate-600">
                  <Text className="text-white font-bold text-lg">Total</Text>
                  <View className="flex-row items-center">
                    <DollarSign size={20} color="#fbbf24" />
                    <Text className="text-amber-400 font-bold text-xl">
                      {total.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Balance Info */}
            <View
              className={`rounded-2xl p-4 mb-6 border ${
                balance < total
                  ? "bg-red-900/20 border-red-500/30"
                  : "bg-cyan-900/20 border-cyan-500/30"
              }`}
            >
              <View className="flex-row justify-between items-center">
                <Text
                  className={
                    balance < total ? "text-red-400" : "text-cyan-400"
                  }
                >
                  Your Balance: ${balance.toFixed(2)}
                </Text>
                <Text
                  className={
                    balance < total ? "text-red-400" : "text-cyan-400"
                  }
                >
                  After: ${(balance - total).toFixed(2)}
                </Text>
              </View>
              {balance < total && (
                <Text className="text-red-400 text-xs mt-2">
                  ⚠️ Insufficient balance. Please add funds to continue.
                </Text>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action Button */}
        <View className="p-6 border-t border-slate-800 bg-slate-900">
          <TouchableOpacity
            className={`rounded-2xl p-4 flex-row items-center justify-center ${
              balance < total || hoursNum <= 0
                ? "bg-slate-700"
                : "bg-cyan-600"
            }`}
            onPress={handleConfirmBooking}
            disabled={balance < total || hoursNum <= 0}
          >
            <Check size={20} color="white" />
            <Text className="text-white font-bold text-lg ml-2">
              Confirm Booking
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}