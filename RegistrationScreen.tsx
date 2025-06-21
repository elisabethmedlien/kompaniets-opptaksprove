import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";

interface RegistrationScreenProps {
  exercise: string;
  onRegister: (count: number) => void;
  onBack: () => void;
}

export default function RegistrationScreen({
  exercise,
  onRegister,
  onBack,
}: RegistrationScreenProps) {
  const [count, setCount] = useState("");

  const handleRegister = () => {
    const numericCount = parseInt(count, 10);
    if (!isNaN(numericCount) && numericCount > 0) {
      onRegister(numericCount);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.title}>REGISTRER</Text>
          <Text style={styles.exerciseName}>{exercise.toUpperCase()}</Text>

          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={count}
            onChangeText={setCount}
            placeholder="Antall"
            placeholderTextColor="#7f8c8d"
            maxLength={4}
            autoFocus={true}
          />

          <TouchableOpacity
            style={styles.registerBtn}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={styles.registerBtnText}>REGISTRER</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backBtnText}>‹ TILBAKE</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#34495e",
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#bdc3c7",
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    letterSpacing: 2,
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#f1c40f",
    marginBottom: 40,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    letterSpacing: 2,
  },
  input: {
    width: "80%",
    height: 70,
    backgroundColor: "#2c3e50",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    color: "#ecf0f1",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 30,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
  },
  registerBtn: {
    backgroundColor: "#27ae60",
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 10,
    alignItems: "center",
  },
  registerBtnText: {
    color: "#ecf0f1",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    letterSpacing: 1,
  },
  backBtn: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 20,
    padding: 10,
  },
  backBtnText: {
    color: "#bdc3c7",
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    fontWeight: "bold",
  },
});
