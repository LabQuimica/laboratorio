import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { ValeAlumnoDetails, ValeProfesorDetails } from "@/types/ValeTypes";

import { styles } from "./styles";

interface MyDocumentProps {
  data?: ValeAlumnoDetails;
}

const PDFAlumno = ({ data }: MyDocumentProps) => {
  const getCurrentDateTime = (): string => {
    return new Date().toLocaleString();
  };

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
        <Text style={[styles.subtitle, styles.centerSubtitle]}>
          Vale de préstamo para docentes - Laboratorio de Química
        </Text>

        {/* Tabla de datos */}
        <View style={styles.table}>
          {/* Primera fila */}
          <View style={styles.row}>
            <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
              <Text>Nombre del Docente</Text>
            </View>
            <View style={[styles.cell]}>
              <Text>{data.nombre_alumno}</Text>
              <Text>{data.email_alumno}</Text>
            </View>
            <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
              <Text>UA</Text>
            </View>
            <View style={[styles.cell, styles.cellText]}>
              <Text>Lab de Bioingeniería</Text>
            </View>
          </View>

          {/* Segunda fila */}
          <View style={styles.row}>
            <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
              <Text>Nombre de la práctica</Text>
            </View>
            <View style={[styles.cell]}>
              <Text>{data.practica.nombre_practica}</Text>
            </View>
            <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
              <Text>Grupo</Text>
            </View>
            {/* <View style={styles.cell}>
              <Text>{`${data.}`}</Text>
              <Text>{`${data.nombre_grupo}`}</Text>
            </View> */}
          </View>

          {/* Tercera fila */}
          <View style={styles.row}>
            <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
              <Text>Fecha y hora</Text>
            </View>
            <View style={[styles.cell]}>
              <Text>{`De: ${data.fecha_asignadaPA}`}</Text>
              <Text>{`A: ${data.fecha_entregaPA}`}</Text>
            </View>
            <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
              <Text>Fecha de solicitud</Text>
            </View>
            <View style={[styles.cell, styles.cellText]}>
              <Text>{getCurrentDateTime()}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFAlumno;
