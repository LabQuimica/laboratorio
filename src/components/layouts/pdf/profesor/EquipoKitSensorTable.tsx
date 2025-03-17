import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "./styles";
import { ItemProfesor } from "@/types/ValeTypes";

const EquipoKitSensorTable = ({ items }: { items: ItemProfesor[] }) => {
  const filteredItems = items.filter(
    (item) => item.tipo_item === "kits" || item.tipo_item === "sensores"
  );
  const renderEmptyRows = () => {
    return (
      <>
        <View style={styles.row}>
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
        <View style={styles.row}>
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
      </>
    );
  };

  return (
    <View style={styles.table}>
      {/* Encabezado de la tabla */}
      <View style={[styles.row, styles.headerRow]}>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>EQUIPO / KIT / SENSORES</Text>
        </View>
        <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
          <Text>CÓDIGO</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>OBSERVACIONES</Text>
        </View>
      </View>

      {/* Filas de datos o filas vacías */}
      {filteredItems.length > 0
        ? filteredItems.map((item, index) => (
            <View key={index} style={styles.row}>
              <View style={styles.cell}>
                <Text>{item.nombre_item}</Text>
              </View>
              <View style={[styles.cell, styles.maxWidth]}>
                <Text>{item.num_serie || "N/A"}</Text>
                {/* Si no hay código, muestra "N/A" */}
              </View>
              <View style={styles.cell}>
                <Text>{item.observacion || "Sin observaciones"}</Text>
                {/* Si no hay observación, muestra un texto predeterminado */}
              </View>
            </View>
          ))
        : renderEmptyRows()}
    </View>
  );
};

export default EquipoKitSensorTable;
