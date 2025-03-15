import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 10,
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
    marginTop: 20,
  },
});
