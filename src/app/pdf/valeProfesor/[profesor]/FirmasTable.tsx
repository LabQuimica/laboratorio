import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "./styles";
import { ItemProfesor } from "@/types/ValeTypes";

const FirmasTable = ({ items }: { items: string }) => {
  return (
    <View style={styles.table}>
      {/* Encabezado de la tabla */}
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
        <View style={[styles.cell]}>
          <Text> </Text>
          <Text> </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.cell, styles.headerCell]}>
          <Text style={[styles.bold, styles.cellText]}>Docente</Text>
          <Text>{items}</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text style={[styles.cellText]}>Responsable del laboratorio</Text>
          <Text style={[styles.bold, styles.cellText]}>Entrega</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text style={[styles.cellText]}>Responsable del laboratorio</Text>
          <Text style={[styles.bold, styles.cellText]}>Recepción</Text>
        </View>
      </View>
    </View>
  );
};

export default FirmasTable;
