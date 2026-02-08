import { View, Text, Button, TouchableOpacity, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { FormInput } from "@/components/Reusable/HookForm/HookForm";

import { useState } from "react";
import { authRepository } from "@/modules/auth/authRepo";

type LoginForm = {
  identifier: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    if (loading) return;

    setLoading(true);

    const result = await authRepository.login(
      data.identifier,
      data.password
    );

    setLoading(false);

    if (!result.success) {
      Alert.alert("Login Failed", "Invalid email/phone or password");
      return;
    }

    // ✅ Login success


 
    router.replace("/(tabs)/homePage");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Login
      </Text>

      <FormInput
        name="identifier"
        control={control}
        placeholder="Email or Phone Number"
        keyboardType="email-address"
        rules={{
          required: "Email or phone is required",
        }}
      />

      <FormInput
        name="password"
        control={control}
        placeholder="Password"
        secureTextEntry
        rules={{
          required: "Password is required",
        }}
      />

      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />

      <TouchableOpacity
        onPress={() => router.push("./register")}
        style={{ marginTop: 20, alignItems: "center" }}
      >
        <Text>
          Don’t have an account?{" "}
          <Text style={{ color: "blue" }}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
