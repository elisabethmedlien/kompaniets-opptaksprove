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

interface TimeResultsScreenProps {
  results: Participant[];
  onBack: () => void;
}

const formatTime = (totalSeconds: number | null): string => {
  if (totalSeconds === null || isNaN(totalSeconds)) return "-";
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function TimeResultsScreen({
  results,
  onBack,
}: TimeResultsScreenProps) {
  const sortedResults = [...results]
    .filter((p) => p.time3k !== null)
    .sort((a, b) => (a.time3k ?? Infinity) - (b.time3k ?? Infinity));

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
      <Text style={[styles.cell, styles.scoreCell]}>
        {formatTime(item.time3k)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>3000-METER RESULTATER</Text>

        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, styles.rankCell]}>#</Text>
          <Text style={[styles.headerCell, styles.nameCell]}>NAVN</Text>
          <Text style={[styles.headerCell, styles.scoreCell]}>TID</Text>
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
    paddingTop: 80,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f1c40f",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    letterSpacing: 2,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#f1c40f",
    paddingBottom: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
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
