import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { ValeAlumnoDetails, ValeProfesorDetails } from "@/types/ValeTypes";

import { styles } from "./styles";
import ItemsTable from "./ItemsTable";
import FirmasTable from "./FirmasTable";
import FirmaAlumnoTable from "./FirmaAlumnoTable";

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
          Vale de préstamo para <Text style={styles.bold}>alumno</Text> -
          Laboratorio de Química
        </Text>

        {/* Tabla de datos */}
        <View style={styles.table}>
          {/* Primera fila */}
          <View style={styles.row}>
            <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
              <Text>Unidad de Aprendizaje</Text>
            </View>
            <View style={[styles.cell]}>
              <Text>{data.practica.nombre_semestre}</Text>
            </View>
            <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
              <Text>Carrera</Text>
            </View>
            <View style={[styles.cell, styles.cellText]}>
              <Text>Ingeniería Biotecnológica</Text>
            </View>
          </View>

          {/* Segunda fila */}
          <View style={styles.row}>
            <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
              <Text>Nombre del docente</Text>
            </View>
            <View style={[styles.cell]}>
              <Text>{data.practica.nombre_profesor}</Text>
            </View>
            <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
              <Text>Grupo y Unidad</Text>
            </View>
            <View style={styles.cell}>
              <Text>{`${data.practica.semestre}`}</Text>
            </View>
          </View>

          {/* Tercera fila */}
          {/* <View style={styles.row}>
            <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
              <Text>Fecha y hora</Text>
            </View>
            <View style={[styles.cell]}>
              <Text>{`De: ${data.fecha_inicio}`}</Text>
              <Text>{`A: ${data.fecha_fin}`}</Text>
            </View>
            <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
              <Text>Fecha de solicitud</Text>
            </View>
            <View style={[styles.cell, styles.cellText]}>
              <Text>{getCurrentDateTime()}</Text>
            </View>
          </View> */}
        </View>
        <View style={styles.container}>
          <ItemsTable items={data.practica.materiales} />
          <View style={styles.flex} />
          <Text style={[styles.subtitle, styles.centerSubtitle]}>
            Tlaxcala, Tlaxcala a {new Date().getDate()} de{" "}
            {new Date().toLocaleString("es-ES", { month: "long" })} de{" "}
            {new Date().getFullYear()}{" "}
          </Text>
          <FirmasTable items={data.practica.nombre_profesor} />
          <FirmaAlumnoTable
            boleta={data.boleta}
            nombreAlumno={data.nombre_alumno}
          />
        </View>
      </Page>
    </Document>
  );
};

export default PDFAlumno;
