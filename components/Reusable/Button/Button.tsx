import React, { ReactNode } from "react";
import {
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonProps {
  title?: string;
  children?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
 
}

export default function Button({
  title,
  children,
  onPress,
  disabled = false,
  loading = false,
  style,

}: ButtonProps) {
  const isDisabled = disabled || loading;

  const handlePress = () => {
    if (isDisabled) return;
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      testID="app-button"
      style={({ pressed }) => [
        styles.base,
        isDisabled ? styles.disabled : styles.primary,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text]}>{children ?? title}</Text>
      )}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  primary: {
    backgroundColor: "#4338CA", 
  },

  disabled: {
    backgroundColor: "#9CA3AF", 
  },

  pressed: {
    opacity: 0.85,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
