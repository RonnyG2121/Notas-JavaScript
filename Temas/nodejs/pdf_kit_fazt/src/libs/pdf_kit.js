import PDFDocument from "pdfkit";


export const givePDF = (dataCallback, endCallback) => {
    const doc = new PDFDocument();

    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    doc.fontSize(18)
    .text("Hola mundo mi pdf");
    doc.end();
}
