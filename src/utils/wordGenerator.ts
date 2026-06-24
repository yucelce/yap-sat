import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import { ContractData } from "../types";

export const generateWordDocument = async (data: ContractData) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "GAYRİMENKUL SATIŞ VAADİ VE ARSA PAYI KARŞILIĞI İNŞAAT SÖZLEŞMESİ",
                bold: true,
                size: 28, // 14pt
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "1. TARAFLAR", bold: true, size: 24 }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ 
                text: `İşbu sözleşme, bir tarafta mukim ve Vergi/TC numarası ${data.muteahhitVn || "...................."} olan ${data.muteahhit || "...................."} (bundan böyle kısaca "MÜTEAHHİT" olarak anılacaktır) ile diğer tarafta mukim ve T.C. Kimlik numarası ${data.arsaSahibiTc || "...................."} olan ${data.arsaSahibi || "...................."} (bundan böyle kısaca "ARSA SAHİBİ" olarak anılacaktır) arasında aşağıda belirtilen şartlar dahilinde tanzim ve imza edilmiştir.`, 
                size: 24 
              }),
            ],
            spacing: { after: 300 },
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "2. SÖZLEŞMENİN KONUSU", bold: true, size: 24 }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ 
                text: `İşbu sözleşmenin konusu; mülkiyeti ARSA SAHİBİ'ne ait olan, tapunun ${data.adres || "...................."} adresinde kayıtlı taşınmaz üzerine MÜTEAHHİT tarafından ilgili imar durumuna, tasdikli projesine, imar yönetmeliklerine ve teknik şartnameye tam uygun olarak modern bir inşaat yapılması ve inşa edilecek bağımsız bölümlerin taraflar arasında ${data.oran || "...................."} oranında paylaşılması işidir.`, 
                size: 24 
              }),
            ],
            spacing: { after: 300 },
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "3. SÖZLEŞME TARİHİ VE YÜRÜRLÜK", bold: true, size: 24 }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ 
                text: `İşbu sözleşme ${data.tarih || "...................."} tarihinde taraflarca eksiksiz olarak okunmuş, beyan edilen tüm hususlar üzerinde mutabakata varılarak kendi serbest iradeleriyle iki nüsha halinde imza altına alınmış ve yürürlüğe girmiştir.`, 
                size: 24 
              }),
            ],
            spacing: { after: 600 },
            alignment: AlignmentType.JUSTIFIED,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "MÜTEAHHİT\t\t\t\t\t\t\t\tARSA SAHİBİ", bold: true, size: 24 }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `${data.muteahhit || ".........."}\t\t\t\t\t\t\t${data.arsaSahibi || ".........."}`, size: 24 }),
            ],
            spacing: { before: 200 },
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "Yapsat_Sozlesmesi.docx");
};