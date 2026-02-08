import { Controller } from "react-hook-form";
import { TextInput, View, Text } from "react-native";

export function FormInput({
  name,
  control,
  placeholder,
  secureTextEntry,
  rules,
  keyboardType,
}: any) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange }, fieldState }) => (
        <View style={{ marginBottom: 14 }}>
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            style={{
              borderWidth: 1,
              borderColor: fieldState.error ? "red" : "#ccc",
              padding: 12,
              borderRadius: 6,
            }}
          />

          {fieldState.error && (
            <Text style={{ color: "red", fontSize: 12 }}>
              {fieldState.error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
