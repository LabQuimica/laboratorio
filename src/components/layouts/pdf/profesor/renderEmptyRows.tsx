import { View, Text } from "@react-pdf/renderer";
import { styles } from "./styles";
// Función para renderizar filas vacías
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
        <View style={styles.cell}>
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
        <View style={styles.cell}>
          <Text> </Text>
        </View>
      </View>
    </>
  );
};

export default renderEmptyRows;
