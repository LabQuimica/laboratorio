import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { styles } from "./styles";
import { ItemProfesor } from "@/types/ValeTypes";

const MaterialTable = ({ items }: { items: ItemProfesor[] }) => {
  // Filtrar los elementos por tipo: 'materiales'
  const filteredItems = items.filter(
    (item) => item.tipo_item === "materiales" || item.tipo_item === "equipos"
  );

  // Función para renderizar filas vacías
  const renderEmptyRows = () => {
    return (
      <>
        <View style={styles.row}>
          <View style={[styles.cell, styles.maxWidth]}>
            <Text> </Text>
          </View>
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
          <View style={[styles.cell, styles.maxWidth]}>
            <Text> </Text>
          </View>
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
        <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
          <Text>CANT.</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>MATERIAL</Text>
        </View>
        <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
          <Text>CAPACIDAD</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>ESPECIFICACIONES</Text>
        </View>
      </View>

      {/* Filas de datos o filas vacías */}
      {filteredItems.length > 0
        ? filteredItems.map((item, index) => (
            <View key={index} style={styles.row}>
              <View style={[styles.cell, styles.maxWidth]}>
                <Text>{item.cantidad_total_necesaria}</Text>
              </View>
              <View style={styles.cell}>
                <Text>{item.nombre_item}</Text>
              </View>
              <View style={[styles.cell, styles.maxWidth]}>
                <Text>{item.especial || "N/A"}</Text>{" "}
                {/* Si no hay capacidad, muestra "N/A" */}
              </View>
              <View style={styles.cell}>
                <Text>{item.observacion || "Sin especificaciones"}</Text>{" "}
                {/* Si no hay observación, muestra un texto predeterminado */}
              </View>
            </View>
          ))
        : renderEmptyRows()}
    </View>
  );
};

export default MaterialTable;
