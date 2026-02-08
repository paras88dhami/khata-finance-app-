import { View, Text, Button, TouchableOpacity, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { useState } from "react";

import { FormInput } from "@/components/Reusable/HookForm/HookForm";
import { authRepository } from "@/modules/auth/authRepo";


type RegisterForm = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<RegisterForm>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    if (loading) return;
    setLoading(true);

    const result = await authRepository.registerUser({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });

    setLoading(false);

    if (!result.success) {
      Alert.alert(
        "Registration Failed",
        "Email or phone already exists",
      );
      return;
    }

    Alert.alert("Success", "Account created successfully");

    router.replace("./login");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>
        Register
      </Text>

      <FormInput
        name="fullName"
        control={control}
        placeholder="Full Name"
        rules={{
          required: "Full name is required",
          minLength: { value: 2, message: "Too short" },
        }}
      />

      <FormInput
        name="email"
        control={control}
        placeholder="Email"
        keyboardType="email-address"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Invalid email address",
          },
        }}
      />

      <FormInput
        name="phone"
        control={control}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        rules={{
          required: "Phone number is required",
          minLength: { value: 8, message: "Invalid phone number" },
        }}
      />

      <FormInput
        name="password"
        control={control}
        placeholder="Password"
        secureTextEntry
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Minimum 6 characters",
          },
        }}
      />

      <Button
        title={loading ? "Creating Account..." : "Register"}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />

      <TouchableOpacity
        onPress={() => router.replace("./login")}
        style={{ marginTop: 20, alignItems: "center" }}
      >
        <Text>
          Already have an account?{" "}
          <Text style={{ color: "blue" }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
