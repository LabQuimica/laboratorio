import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { styles } from "./styles";
import { ValeProfesorDetails } from "@/types/ValeTypes";
import ReactivoTable from "./reactivoTable";
import EquipoKitSensorTable from "./EquipoKitSensorTable";
import MaterialTable from "./MaterialTable";
import ResiduosTable from "./ResiduosTable";
import FirmasTable from "./FirmasTable";

interface MyDocumentProps {
  data?: ValeProfesorDetails;
}

const MyDocument = ({ data }: MyDocumentProps) => {
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
              <Text>{data.nombre_usuario}</Text>
              <Text>{data.email}</Text>
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
              <Text>{data.nombre_practica}</Text>
            </View>
            <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
              <Text>Grupo</Text>
            </View>
            <View style={styles.cell}>
              <Text>{`${data.semestre_grupo}`}</Text>
              <Text>{`${data.nombre_grupo}`}</Text>
            </View>
          </View>

          {/* Tercera fila */}
          <View style={styles.row}>
            <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
              <Text>Fecha y hora</Text>
            </View>
            <View style={[styles.cell]}>
              <Text>{`De: ${data.fecha_asignada}`}</Text>
              <Text>{`A: ${data.fecha_entrega}`}</Text>
            </View>
            <View style={[styles.cell, styles.headerCell, styles.maxWidth]}>
              <Text>Fecha de solicitud</Text>
            </View>
            <View style={[styles.cell, styles.cellText]}>
              <Text>{getCurrentDateTime()}</Text>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          {/* Tabla de reactivos */}
          <ReactivoTable items={data.items} />

          {/* Tabla de equipos, kits y sensores */}
          <EquipoKitSensorTable items={data.items} />
          {/* Tabla de materiales */}
          <MaterialTable items={data.items} />

          {/* Tabla de residuos */}
          <ResiduosTable />

          <View style={styles.flex} />

          {/* Tabla de firmas */}
          <FirmasTable items={data.nombre_usuario} />
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
