import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Participant } from "./data/results";

type ExerciseType = "pushups" | "situps" | "pullups";

interface ResultsScreenProps {
  exercise: ExerciseType;
  results: Participant[];
  onBack: () => void;
}

export default function ResultsScreen({
  exercise,
  results,
  onBack,
}: ResultsScreenProps) {
  const sortedResults = [...results]
    .filter((p) => p[exercise] !== null)
    .sort((a, b) => (b[exercise] ?? 0) - (a[exercise] ?? 0));

  const renderItem = ({
    item,
    index,
  }: {
    item: Participant;
    index: number;
  }) => (
    <View style={[styles.row, item.name === "Meg" && styles.highlightRow]}>
      <Text style={[styles.cell, styles.rankCell]}>{index + 1}</Text>
      <Text style={[styles.cell, styles.nameCell]}>{item.name}</Text>
      <Text style={[styles.cell, styles.scoreCell]}>{item[exercise]}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{exercise.toUpperCase()} RESULTATER</Text>

        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, styles.rankCell]}>#</Text>
          <Text style={[styles.headerCell, styles.nameCell]}>NAVN</Text>
          <Text style={[styles.headerCell, styles.scoreCell]}>ANTALL</Text>
        </View>

        <FlatList
          data={sortedResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      </View>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backBtnText}>‹ HJEM</Text>
      </TouchableOpacity>
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
    paddingTop: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f1c40f",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    letterSpacing: 2,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#f1c40f",
    paddingBottom: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  headerCell: {
    color: "#bdc3c7",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  highlightRow: {
    backgroundColor: "rgba(241, 196, 15, 0.2)",
    borderRadius: 5,
  },
  cell: {
    color: "#ecf0f1",
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
  },
  rankCell: {
    flex: 0.15,
    textAlign: "center",
    fontWeight: "bold",
  },
  nameCell: {
    flex: 0.55,
  },
  scoreCell: {
    flex: 0.3,
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 18,
  },
  backBtn: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  backBtnText: {
    color: "#bdc3c7",
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    fontWeight: "bold",
  },
});
