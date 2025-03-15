import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "./styles";

const ResiduosTable = () => {
  // Función para renderizar las filas vacías
  const renderEmptyRows = () => {
    return Array(4)
      .fill(null) // Creamos un array de 4 elementos vacíos
      .map((_, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.cell}>
            <Text> </Text>
          </View>
          <View style={[styles.cell, styles.maxWidth]}>
            <Text> </Text>
          </View>
          <View style={styles.cell}>
            <Text> </Text>
          </View>
        </View>
      ));
  };

  return (
    <View style={styles.table}>
      {/* Encabezado de la tabla */}
      <View style={[styles.row, styles.headerRow]}>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>RESIDUO GENERADO</Text>
        </View>
        <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
          <Text>CANTIDAD</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>LUGAR DE ALMACENAMIENTO</Text>
        </View>
      </View>

      {/* Filas vacías */}
      {renderEmptyRows()}
    </View>
  );
};

export default ResiduosTable;
