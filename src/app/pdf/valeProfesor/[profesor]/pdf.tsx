import { Page, Text, View, Document } from "@react-pdf/renderer";
import { styles } from "./styles";
import { ValeProfesorDetails } from "@/types/ValeTypes";

const MyDocument = ({ data }: { data?: ValeProfesorDetails }) => {
  if (!data) {
    return (
      <Document>
        <Page size="LETTER" style={styles.page}>
          <View style={styles.section}>
            <Text>No se encontraron datos para este vale</Text>
          </View>
        </Page>
      </Document>
    );
  }
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.section}>
          <Text>{data.email}</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
