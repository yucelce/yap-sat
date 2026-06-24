import { ContractData } from "../types";

export const PREDEFINED_SPECS: Record<string, { name: string; items: { key: string; value: string }[] }> = {
  "premium": {
    name: "Premium Lüks Paket",
    items: [
      { key: "Kombi / Isıtma", value: "Vaillant Tam Yoğuşmalı Akıllı Kombi ve Yerden Isıtma" },
      { key: "Zemin Kaplama", value: "12mm Şerifoğlu Lamine Parke ve İthal Süpürgelik" },
      { key: "Mutfak Dolapları", value: "Blum Mekanizmalı Akrilik Kapak ve Çimstone Tezgah" },
      { key: "Doğramalar", value: "Rehau 80mm Seri, 3'lü Sinerji Camlı Gizli Panjurlu PVC" }
    ]
  },
  "standard": {
    name: "Standart Konfor Paket",
    items: [
      { key: "Kombi / Isıtma", value: "ECA Confort Kombi ve Panel Radyatör Sistemi" },
      { key: "Zemin Kaplama", value: "8mm AGT Derzli Laminat Parke" },
      { key: "Mutfak Dolapları", value: "MDF Lam Gövde, Membran Kapak ve Granit Tezgah" },
      { key: "Doğramalar", value: "Pimapen 70mm Seri, Çift Cam Konfor Serisi PVC" }
    ]
  }
};

export const generateLegalAddressText = (p: ContractData["property"]) => {
  return `${p.il} İli, ${p.ilce} İlçesi, ${p.mahalleKoy} sınırları içerisinde yer alan, tapunun ${p.pafta} Pafta, ${p.ada} Ada, ${p.parsel} Parsel numarasında kayıtlı, ${p.yuzolcumu} yüzölçümüne sahip ve niteliği ${p.nitelik} olan taşınmaz...`;
};

// === AŞAĞIDAKİ KISIMLAR EKLENDİ ===

export const CONTRACT_TEMPLATES = {
  YAP_SAT: {
    title: "GAYRİMENKUL SATIŞ VAADİ VE ARSA PAYI KARŞILIĞI İNŞAAT SÖZLEŞMESİ",
    articles: [
      { title: "1. TARAFLAR", content: "{{taraflar}}" },
      { title: "2. SÖZLEŞME KONUSU VE GAYRİMENKUL BİLGİLERİ", content: "{{gayrimenkulBilgisi}}" },
      { title: "3. PAYLAŞIM ORANI", content: "Taraflar arasındaki paylaşım oranı {{oran}} olarak belirlenmiştir." }
    ]
  }
};

export const formatDataForTemplate = (data: ContractData): Record<string, string> => {
  const muteahhitler = data.contractors.map(c => c.name).join(", ");
  const arsaSahipleri = data.landowners.map(l => l.name).join(", ");
  
  return {
    taraflar: `İşbu sözleşme, müteahhitler [${muteahhitler}] ile arsa sahipleri [${arsaSahipleri}] arasında imza edilmiştir.`,
    gayrimenkulBilgisi: data.property ? generateLegalAddressText(data.property) : "Gayrimenkul bilgisi girilmedi.",
    oran: data.oran || "",
    tarih: data.tarih || ""
  };
};

export const renderTemplateString = (template: string, data: Record<string, string>) => {
  // {{degisken}} formatındaki metinleri veri objesindeki değerlerle değiştirir
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || match;
  });
};