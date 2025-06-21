import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

interface ExerciseModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectExercise: (exercise: string) => void;
}

const exercises = [
  { id: "pushups", name: "PUSHUPS" },
  { id: "pullups", name: "PULLUPS" },
  { id: "situps", name: "SITUPS" },
  { id: "3k-meter", name: "3000 METER" },
];

export default function ExerciseModal({
  visible,
  onClose,
  onSelectExercise,
}: ExerciseModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>VELG ØVELSE</Text>

          {exercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.optionBtn}
              onPress={() => onSelectExercise(exercise.id)}
            >
              <Text style={styles.optionBtnText}>{exercise.name}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>LUKK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalView: {
    margin: 20,
    width: "90%",
    backgroundColor: "#34495e",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f1c40f",
    marginBottom: 30,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    letterSpacing: 2,
  },
  optionBtn: {
    backgroundColor: "rgba(44, 62, 80, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  optionBtnText: {
    color: "#ecf0f1",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    letterSpacing: 1,
  },
  closeBtn: {
    marginTop: 20,
    padding: 10,
  },
  closeBtnText: {
    color: "#bdc3c7",
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "Courier New" : "monospace",
    fontWeight: "bold",
  },
});
