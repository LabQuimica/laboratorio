import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { ItemProfesor } from "@/types/ValeTypes";
import { styles } from "./styles";

const ReactivoTable = ({ items }: { items: ItemProfesor[] }) => {
  // Filtrar los elementos por tipo: 'liquidos' o 'solidos'
  const filteredItems = items.filter(
    (item) =>
      item.tipo_item === "reactivos-liquidos" ||
      item.tipo_item === "reactivos-solidos"
  );

  const renderEmptyRows = () => {
    return (
      <>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text> </Text>
          </View>
          <View style={styles.cell}>
            <Text> </Text>
          </View>
          <View style={[styles.cell, styles.maxWidth]}>
            <Text> </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text> </Text>
          </View>
          <View style={styles.cell}>
            <Text> </Text>
          </View>
          <View style={[styles.cell, styles.maxWidth]}>
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
          <Text>REACTIVO</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>UBICACIÓN</Text>
        </View>
        <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
          <Text>CANTIDAD UTILIZADA (mL/g)</Text>
        </View>
      </View>

      {filteredItems.length > 0
        ? filteredItems.map((item, index) => (
            <View key={index} style={styles.row}>
              <View style={styles.cell}>
                <Text>{item.nombre_item}</Text>
              </View>
              <View style={styles.cell}>
                <Text>{item.ubicacion}</Text>
              </View>
              <View style={[styles.cell, styles.maxWidth]}>
                <Text>{`${item.cantidad_total_necesaria} ${
                  item.tipo_item === "reactivos-liquidos" ? "mL" : "g"
                }`}</Text>
              </View>
            </View>
          ))
        : renderEmptyRows()}
    </View>
  );
};

export default ReactivoTable;
