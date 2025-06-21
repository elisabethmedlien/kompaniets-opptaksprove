import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ExerciseModal from "./ExerciseModal";
import RegistrationScreen from "./RegistrationScreen";
import ResultsScreen from "./ResultsScreen";
import TimeRegistrationScreen from "./TimeRegistrationScreen";
import TimeResultsScreen from "./TimeResultsScreen";
import { initialResults, Participant } from "./data/results";

type Exercise = "pushups" | "situps" | "pullups";

const HomeScreen = ({ onStartTest }: { onStartTest: () => void }) => (
  <LinearGradient
    colors={["#2c3e50", "#34495e"]}
    style={styles.gradient}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    {/* Header */}
    <View style={styles.header}>
      <View style={styles.militaryBadge}>
        <Text style={styles.star}>★</Text>
        <Text style={styles.title}>KOMPANIETS OPPTAKSPRØVE</Text>
        <View style={styles.rankStrip} />
      </View>
      <Text style={styles.tagline}>
        Se hvor god du er i forhold til rekruttene fra Kompani Lauritzen!
      </Text>
    </View>

    {/* Main Actions */}
    <View style={styles.mainActions}>
      <TouchableOpacity
        style={[styles.actionBtn, styles.startBtn]}
        onPress={onStartTest}
        activeOpacity={0.8}
      >
        <Text style={styles.btnIcon}>🚀</Text>
        <Text style={styles.btnText}>START OPPTAKSPRØVE</Text>
      </TouchableOpacity>
    </View>

    {/* Footer */}
    <View style={styles.footer}>
      <Text style={styles.motto}>"Aldri gi opp - Alltid fremover"</Text>
    </View>
  </LinearGradient>
);

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("home"); // home, registration, results, time_registration, time_results
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [results, setResults] = useState<Participant[]>(initialResults);

  const handleStartTest = () => {
    setModalVisible(true);
  };

  const handleSelectExercise = (exercise: string) => {
    setModalVisible(false);
    if (exercise === "3k-meter") {
      setCurrentScreen("time_registration");
    } else {
      setCurrentExercise(exercise as Exercise);
      setCurrentScreen("registration");
    }
  };

  const handleRegister = (count: number) => {
    if (!currentExercise) return;

    const meIndex = results.findIndex((p) => p.name === "Meg");
    let newResults: Participant[];

    if (meIndex > -1) {
      newResults = results.map((p, index) =>
        index === meIndex ? { ...p, [currentExercise]: count } : p
      );
    } else {
      const me: Participant = {
        id: 999,
        name: "Meg",
        pushups: null,
        situps: null,
        pullups: null,
        time3k: null,
        [currentExercise]: count,
      };
      newResults = [...results, me];
    }
    setResults(newResults);
    setCurrentScreen("results");
  };

  const handleRegisterTime = (totalSeconds: number) => {
    const meIndex = results.findIndex((p) => p.name === "Meg");
    const newResults =
      meIndex > -1
        ? results.map((p, index) =>
            index === meIndex ? { ...p, time3k: totalSeconds } : p
          )
        : [
            ...results,
            {
              id: 999,
              name: "Meg",
              pushups: null,
              situps: null,
              pullups: null,
              time3k: totalSeconds,
            },
          ];
    setResults(newResults);
    setCurrentScreen("time_results");
  };

  const handleBack = () => {
    setCurrentScreen("home");
    setCurrentExercise(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "registration":
        return (
          <RegistrationScreen
            exercise={currentExercise!}
            onRegister={handleRegister}
            onBack={() => setCurrentScreen("home")}
          />
        );
      case "results":
        return (
          <ResultsScreen
            exercise={currentExercise!}
            results={results}
            onBack={handleBack}
          />
        );
      case "time_registration":
        return (
          <TimeRegistrationScreen
            onRegister={handleRegisterTime}
            onBack={() => setCurrentScreen("home")}
          />
        );
      case "time_results":
        return <TimeResultsScreen results={results} onBack={handleBack} />;
      default:
        return <HomeScreen onStartTest={handleStartTest} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderScreen()}
      <ExerciseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectExercise={handleSelectExercise}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 40,
  },

  // Header Styles
  header: {
    alignItems: "center",
    marginBottom: 60,
  },
  militaryBadge: {
    alignItems: "center",
    marginBottom: 16,
  },
  star: {
    fontSize: 40,
    color: "#f1c40f",
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 3.2,
    color: "#ecf0f1",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
  },
  rankStrip: {
    width: 80,
    height: 4,
    backgroundColor: "#f39c12",
    marginTop: 8,
    borderRadius: 2,
  },
  tagline: {
    fontSize: 16,
    color: "#bdc3c7",
    fontStyle: "italic",
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
  },

  // Main Actions Styles
  mainActions: {
    width: "100%",
    maxWidth: 320,
    gap: 24,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8, // For Android shadow
  },
  startBtn: {
    backgroundColor: "#e74c3c",
    borderWidth: 2,
    borderColor: "#c0392b",
  },
  btnIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.8,
    color: "#ecf0f1",
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
  },

  // Footer Styles
  footer: {
    marginTop: 60,
    alignItems: "center",
  },
  motto: {
    fontStyle: "italic",
    color: "#f39c12",
    fontSize: 14,
    opacity: 0.8,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
  },
});
