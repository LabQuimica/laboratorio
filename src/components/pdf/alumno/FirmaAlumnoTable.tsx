import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "./styles";

type Props = {
  boleta: string;
  nombreAlumno: string;
};

const FirmaAlumnoTable = ({ boleta, nombreAlumno }: Props) => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.headerCell]}>
          Responsable de material
        </Text>
      </View>

      <View style={[styles.row, styles.headerRow]}>
        <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
          <Text>MATRICULA</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>NOMBRE</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>FIRMA</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.cell, styles.maxWidth, styles.cellText]}>
          <Text>{boleta}</Text>
        </View>
        <View style={[styles.cell, styles.cellText]}>
          <Text>{nombreAlumno}</Text>
        </View>
        <View style={[styles.cell]}>
          <Text> </Text>
          <Text> </Text>
        </View>
      </View>
    </View>
  );
};

export default FirmaAlumnoTable;
