import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 15,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  leftImage: {
    width: 85,
    height: 60,
  },
  rightImage: {
    width: 80,
    height: 60,
  },
  centerText: {
    textAlign: "center",
    flex: 1,
  },
  centerSubtitle: {
    textAlign: "center",
    fontSize: 13,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: "normal",
  },
  table: {
    marginTop: 10,
    border: "0.5px solid #000",
    borderColor: "#000",
  },
  row: {
    flexDirection: "row",
    borderBottom: "0.5px solid #000",
  },
  cell: {
    flex: 1,
    padding: 5,
    borderRight: "0.5px solid #000",
    textAlign: "center",
    fontSize: 9,
  },
  headerCell: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 9, // Tamaño de fuente más pequeño
    padding: 3, // Menos espacio interno
  },
  cellText: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  maxWidth: {
    maxWidth: "20%",
  },
  headerRow: {
    backgroundColor: "#f0f0f0", // Color de fondo para el encabezado
  },
});
