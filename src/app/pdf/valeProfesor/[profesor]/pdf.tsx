import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { styles } from "./styles";
import { ValeProfesorDetails } from "@/types/ValeTypes";

interface MyDocumentProps {
  data?: ValeProfesorDetails;
}

const MyDocument = ({ data }: MyDocumentProps) => {
  if (!data) {
    return (
      <Document>
        <Page size="LETTER" style={styles.page}>
          <View style={styles.header}>
            <Text>No se encontraron datos para este vale</Text>
          </View>
        </Page>
      </Document>
    );
  }
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Image src="/images/ipn.png" style={styles.leftImage} />

          <View style={styles.centerText}>
            <Text style={styles.title}>INSTITUTO POLITÉCNICO NACIONAL</Text>
            <Text style={styles.subtitle}>
              Unidad Profesional Interdisciplinaria de Ingeniería Campus
              Tlaxcala
            </Text>
          </View>

          <Image src="/images/upiit.png" style={styles.rightImage} />
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
