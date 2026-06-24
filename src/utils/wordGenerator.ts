import { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import { saveAs } from "file-saver";
import { ContractData } from "../types";
import { generateLegalAddressText } from "./templateEngine";

const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" };

export const generateWordDocument = async (data: ContractData) => {
  const docChildren: any[] = [];

  // Zeyilname mi yoksa Ana Sözleşme mi Başlığı?
  const isZeyil = data.versionInfo?.isAddendum;
  const titleText = isZeyil 
    ? `GAYRİMENKUL SATIŞ VAADİ VE ARSA PAYI KARŞILIĞI İNŞAAT SÖZLEŞMESİ ZEYİLNAMESİ (V${data.versionInfo?.versionNumber})`
    : "GAYRİMENKUL SATIŞ VAADİ VE ARSA PAYI KARŞILIĞI İNŞAAT SÖZLEŞMESİ";

  docChildren.push(
    new Paragraph({
      children: [new TextRun({ text: titleText, bold: true, size: 28 })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    })
  );

  if (isZeyil && data.versionInfo?.changeReason) {
    docChildren.push(
      new Paragraph({
        children: [
          new TextRun({ text: "ZEYİL GEREKÇESİ VE DEĞİŞİKLİK: ", bold: true, size: 22 }),
          new TextRun({ text: data.versionInfo.changeReason, size: 22, italic: true })
        ],
        spacing: { after: 300 }
      })
    );
  }

  // 1. TARAFLAR VE 2. KONU Maddelerini ekleyelim
  docChildren.push(
    new Paragraph({ children: [new TextRun({ text: "1. TARAFLAR", bold: true, size: 24 })], spacing: { after: 150 } }),
    new Paragraph({
      children: [
        new TextRun({ text: `İşbu sözleşme, müteahhitler [${data.contractors.map(c => c.name).join(", ")}] ile arsa sahipleri [${data.landowners.map(l => l.name).join(", ")}] arasında imza edilmiştir.` })
      ],
      spacing: { after: 300 },
      alignment: AlignmentType.JUSTIFIED
    }),
    new Paragraph({ children: [new TextRun({ text: "2. SÖZLEŞME KONUSU VE GAYRİMENKUL BİLGİLERİ", bold: true, size: 24 })], spacing: { after: 150 } }),
    new Paragraph({
      children: [new TextRun({ text: generateLegalAddressText(data.property) })],
      spacing: { after: 400 },
      alignment: AlignmentType.JUSTIFIED
    })
  );

  // --- EK-1: TEKNİK ŞARTNAME TABLOSU ---
  docChildren.push(
    new Paragraph({ children: [new TextRun({ text: "EK-1: TEKNİK ŞARTNAME (MALZEME LİSTESİ)", bold: true, size: 24 })], spacing: { before: 400, after: 200 } })
  );

  const specRows = [
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "İmalat Kalemi", bold: true })] })], borders: { bottom: cellBorder }, width: { size: 40, type: WidthType.PERCENTAGE } }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Asgari Malzeme Standardı ve Markası", bold: true })] })], borders: { bottom: cellBorder }, width: { size: 60, type: WidthType.PERCENTAGE } })
      ]
    })
  ];

  data.customSpecs?.forEach(item => {
    specRows.push(
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ text: item.key })], borders: { bottom: cellBorder } }),
          new TableCell({ children: [new Paragraph({ text: item.value })], borders: { bottom: cellBorder } })
        ]
      })
    );
  });
  docChildren.push(new Table({ rows: specRows, width: { size: 100, type: WidthType.PERCENTAGE } }));

  // --- EK-2: BAĞIMSIZ BÖLÜM PAYLAŞIM TABLOSU ---
  docChildren.push(
    new Paragraph({ children: [new TextRun({ text: "EK-2: BAĞIMSIZ BÖLÜM PAYLAŞIM LİSTESİ", bold: true, size: 24 })], spacing: { before: 400, after: 200 } })
  );

  const unitRows = [
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Blok", bold: true })] })], borders: { bottom: cellBorder } }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Kat", bold: true })] })], borders: { bottom: cellBorder } }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Bağımsız Bölüm No", bold: true })] })], borders: { bottom: cellBorder } }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Tahsis Edilen Taraf", bold: true })] })], borders: { bottom: cellBorder } })
      ]
    })
  ];

  data.unitShares?.forEach(unit => {
    unitRows.push(
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ text: unit.block })], borders: { bottom: cellBorder } }),
          new TableCell({ children: [new Paragraph({ text: unit.floor })], borders: { bottom: cellBorder } }),
          new TableCell({ children: [new Paragraph({ text: unit.unitNo })], borders: { bottom: cellBorder } }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: unit.allocatedTo, bold: true, color: unit.allocatedTo === "Müteahhit" ? "1E3A8A" : "15803D" })] })], borders: { bottom: cellBorder } })
        ]
      })
    );
  });
  docChildren.push(new Table({ rows: unitRows, width: { size: 100, type: WidthType.PERCENTAGE } }));

  // Dosyayı derleyip indiriyoruz
  const doc = new Document({ sections: [{ children: docChildren }] });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, isZeyil ? `Zeyilname_V${data.versionInfo?.versionNumber}.docx` : "Yap_Sat_Sozlesmesi_Gelistirilmis.docx");
};