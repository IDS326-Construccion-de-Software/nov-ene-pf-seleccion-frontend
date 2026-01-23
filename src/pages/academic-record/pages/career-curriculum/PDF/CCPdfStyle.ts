import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#111827",
  },

  // Card tipo Figma
  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  cardHeader: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    alignItems: "center",
  },
  headerLabel: { fontSize: 11, fontWeight: 600, color: "#111827" },
  headerValue: { fontSize: 11, fontWeight: 700, color: "#111827" },

  // Summary centrado (424)
  summaryWrap: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  summaryBox: {
    width: 424,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 6,
  },
  summaryLabel: {
    color: "#6B7280",
  },
  summaryValue: {
    fontWeight: 700,
    textAlign: "right",
    color: "#111827",
    maxWidth: 250,
  },
  summaryDivider: {
    marginVertical: 6,
  },

  // Table
  table: {
    marginTop: 6,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  thead: {
    backgroundColor: "#F9FAFB",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tr: {
    flexDirection: "row",
  },

  th: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    fontWeight: 700,
    color: "#4B5563",
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  td: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    color: "#111827",
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#F3F4F6",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  // Column widths (ajústalas a tu gusto)
  colCodigo: { width: 60 },
  colAsig: { flexGrow: 1, textAlign: "left" },
  colEstado: { width: 70 },
  colPre: { width: 110 },
  colCo: { width: 90 },
  colCred: { width: 90, borderRightWidth: 0 }, // sin borde al final
});
