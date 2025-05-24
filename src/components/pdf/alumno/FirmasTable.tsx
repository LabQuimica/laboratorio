import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "./styles";

const FirmasTable = ({ items }: { items: string }) => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.headerRow]}>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>Vo.Bo</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>Vo.Bo</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>Vo.Bo</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.cell]}>
          <Text> </Text>
          <Text> </Text>
        </View>
        <View style={styles.cell}>
          <Text> </Text>
          <Text> </Text>
        </View>
        <View style={styles.cell}>
          <Text> </Text>
          <Text> </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.cell]}>
          <Text style={[styles.cellText]}>Docente</Text>
          <Text>{items}</Text>
        </View>
        <View style={[styles.cell]}>
          <Text style={[styles.cellText]}>Responsable del laboratorio</Text>
          <Text style={[styles.cellText, styles.bold]}>Entrega</Text>
        </View>
        <View style={[styles.cell]}>
          <Text style={[styles.cellText]}>Responsable del laboratorio</Text>
          <Text style={[styles.cellText, styles.bold]}>Recepción</Text>
        </View>
      </View>
    </View>
  );
};

export default FirmasTable;
