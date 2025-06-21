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
  Alert,
} from "react-native";

interface TimeRegistrationScreenProps {
  onRegister: (totalSeconds: number) => void;
  onBack: () => void;
}

export default function TimeRegistrationScreen({
  onRegister,
  onBack,
}: TimeRegistrationScreenProps) {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const handleRegister = () => {
    const mins = parseInt(minutes, 10);
    const secs = parseInt(seconds, 10);

    if (!isNaN(mins) && !isNaN(secs) && mins >= 0 && secs >= 0 && secs < 60) {
      onRegister(mins * 60 + secs);
    } else {
      Alert.alert(
        "Ugyldig tid",
        "Vennligst skriv inn gyldige minutter og sekunder (0-59)."
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.title}>REGISTRER 3000-METER</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={minutes}
              onChangeText={setMinutes}
              placeholder="MM"
              placeholderTextColor="#7f8c8d"
              maxLength={3}
              autoFocus={true}
            />
            <Text style={styles.separator}>:</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={seconds}
              onChangeText={setSeconds}
              placeholder="SS"
              placeholderTextColor="#7f8c8d"
              maxLength={2}
            />
          </View>

          <TouchableOpacity
            style={styles.registerBtn}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={styles.registerBtnText}>REGISTRER TID</Text>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#f1c40f",
    marginBottom: 40,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    letterSpacing: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  input: {
    width: 100,
    height: 70,
    backgroundColor: "#2c3e50",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    color: "#ecf0f1",
    fontSize: 28,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
  },
  separator: {
    color: "#ecf0f1",
    fontSize: 40,
    marginHorizontal: 10,
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
