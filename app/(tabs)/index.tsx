import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl font-bold text-dark-200">Welcome!</Text>

      {/*  How routing works in expo-router
      <Link href="./onboarding">Onboarding</Link>
      <Link href="./movie/avengers">Avengers</Link> */}
    </View>
  );
}
