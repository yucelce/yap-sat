import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import { ContractData } from "../types";
import { CONTRACT_TEMPLATES, formatDataForTemplate, renderTemplateString } from "./templateEngine";

export const generateWordDocument = async (data: ContractData) => {
  const template = CONTRACT_TEMPLATES.YAP_SAT;
  const dataDict = formatDataForTemplate(data);

  const docChildren: Paragraph[] = [];

  // Başlık
  docChildren.push(
    new Paragraph({
      children: [
        new TextRun({
          text: template.title,
          bold: true,
          size: 28, // 14pt
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    })
  );

  // Dinamik Şablon Maddeleri
  template.articles.forEach(article => {
    docChildren.push(
      new Paragraph({
        children: [new TextRun({ text: article.title, bold: true, size: 24 })],
        spacing: { after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun({ 
            text: renderTemplateString(article.content, dataDict), 
            size: 24 
          }),
        ],
        spacing: { after: 300 },
        alignment: AlignmentType.JUSTIFIED,
      })
    );
  });

  // İmza Alanı Başlıkları
  docChildren.push(
    new Paragraph({
      children: [
        new TextRun({ text: "MÜTEAHHİT(LER)\t\t\t\t\t\tARSA SAHİPLERİ (VEYA VEKİLLERİ)", bold: true, size: 24 }),
      ],
      spacing: { before: 600, after: 200 }
    })
  );

  // Ortak Girişim & Çoklu Arsa Sahibi İmza Eşleştirmesi
  const maxSignatures = Math.max(data.contractors.length, data.landowners.length);
  for (let i = 0; i < maxSignatures; i++) {
    const contractorStr = data.contractors[i]?.name || "";
    let landownerStr = data.landowners[i]?.name || "";
    if (data.landowners[i]?.isProxy) {
      landownerStr += `\n(Vekaleten: ${data.landowners[i].proxyName})`;
    }

    docChildren.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${contractorStr}\t\t\t\t\t\t\t${landownerStr}`, size: 24 }),
        ],
        spacing: { before: 400 },
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: docChildren,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "Yapsat_Sozlesmesi.docx");
};