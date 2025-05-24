import React from "react";
import { View, Text } from "@react-pdf/renderer";
import { ValeAlumnoDetailsMateriale } from "@/types/ValeTypes";
import { styles } from "./styles";

const ItemsTable = ({ items }: { items: ValeAlumnoDetailsMateriale[] }) => {
  const renderEmptyRows = () => {
    return (
      <>
        <View style={styles.row}>
          <View style={[styles.cell, styles.lessMaxWidth]}>
            <Text> </Text>
          </View>
          <View style={styles.cell}>
            <Text> </Text>
          </View>
          <View style={[styles.cell, styles.lessMaxWidth]}>
            <Text> </Text>
          </View>
          <View style={styles.cell}>
            <Text> </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.cell, styles.lessMaxWidth]}>
            <Text> </Text>
          </View>
          <View style={styles.cell}>
            <Text> </Text>
          </View>
          <View style={[styles.cell, styles.lessMaxWidth]}>
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
        <View style={[styles.cell, styles.headerCell, styles.lessMaxWidth]}>
          <Text>CANTIDAD</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>NOMBRE</Text>
        </View>
        <View style={[styles.cell, styles.headerCell, styles.lessMaxWidth]}>
          <Text>TIPO</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>CARACTERISTICA</Text>
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <Text>OBSERVACION</Text>
        </View>
      </View>

      {items.length > 0
        ? items.map((item, index) => (
            <View key={index} style={styles.row}>
              <View style={[styles.cell, styles.lessMaxWidth]}>
                <Text>{item.cantidad_material}</Text>
              </View>
              <View style={styles.cell}>
                <Text>{item.nombre_item}</Text>
              </View>
              <View style={[styles.cell, styles.lessMaxWidth]}>
                <Text>
                  {item.tipo_item === "reactivos-liquidos" ||
                  item.tipo_item === "reactivos-solidos"
                    ? "Reactivos"
                    : item.tipo_item}
                </Text>
              </View>
              <View style={[styles.cell]}>
                <Text>
                  {item.tipo_item === "kits" || item.tipo_item === "sensores"
                    ? "Sin caracteristicas"
                    : item.caracteristica}
                </Text>
              </View>
              <View style={[styles.cell]}>
                <Text>{item.observacion_item}</Text>
              </View>
            </View>
          ))
        : renderEmptyRows()}
    </View>
  );
};

export default ItemsTable;
