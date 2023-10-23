import React from "react";
import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: "bold",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 24,
    fontFamily: "Times-Roman",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
export default function PdfQrTemp({ imageq, textq }) {
  const pages = [
    {
      text: textq,
      image: imageq,
    },
  ];
  const pageColors = ["#f6d186", "#f67280", "#c06c84"];

  return (
    <Document>
      {pages.map((page, index) => {
        return (
          <Page
            key={index}
            style={{ ...styles.body, backgroundColor: pageColors[index] }}
          >
            <Text style={styles.header} fixed>
              Generated QR
            </Text>
            <Image style={styles.image} src={page.image} />
            <Text style={styles.text}>{page.text}</Text>
          </Page>
        );
      })}
    </Document>
  );
}
