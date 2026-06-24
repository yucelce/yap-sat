import { ContractData } from "../types";

// Sistemdeki mevcut şablonlar (ileride veritabanından gelebilir)
export const CONTRACT_TEMPLATES = {
  YAP_SAT: {
    title: "GAYRİMENKUL SATIŞ VAADİ VE ARSA PAYI KARŞILIĞI İNŞAAT SÖZLEŞMESİ",
    articles: [
      {
        title: "1. TARAFLAR",
        content: "İşbu sözleşme, bir tarafta mukim ve Vergi/TC numaraları {{contractorIds}} olan {{contractorNames}} (bundan böyle kısaca \"MÜTEAHHİT\" olarak anılacaktır) ile diğer tarafta mukim ve T.C. Kimlik numaraları {{landownerIds}} olan {{landownerNames}} (bundan böyle kısaca \"ARSA SAHİBİ\" olarak anılacaktır) arasında aşağıda belirtilen şartlar dahilinde tanzim ve imza edilmiştir."
      },
      {
        title: "2. SÖZLEŞMENİN KONUSU",
        content: "İşbu sözleşmenin konusu; mülkiyeti ARSA SAHİBİ'ne ait olan, tapunun {{adres}} adresinde kayıtlı taşınmaz üzerine MÜTEAHHİT tarafından ilgili imar durumuna, tasdikli projesine, imar yönetmeliklerine ve teknik şartnameye tam uygun olarak modern bir inşaat yapılması ve inşa edilecek bağımsız bölümlerin taraflar arasında {{oran}} oranında paylaşılması işidir."
      },
      {
        title: "3. SÖZLEŞME TARİHİ VE YÜRÜRLÜK",
        content: "İşbu sözleşme {{tarih}} tarihinde taraflarca eksiksiz olarak okunmuş, beyan edilen tüm hususlar üzerinde mutabakata varılarak kendi serbest iradeleriyle iki nüsha halinde imza altına alınmış ve yürürlüğe girmiştir."
      }
    ]
  }
};

// Form verisini şablona uygun 'Dictionary' formatına dönüştürür
export const formatDataForTemplate = (data: ContractData): Record<string, string> => {
  return {
    contractorNames: data.contractors.map(c => c.name).join(', '),
    contractorIds: data.contractors.map(c => c.idNumber).join(', '),
    landownerNames: data.landowners.map(l => l.isProxy && l.proxyName ? `${l.name} (Vekaleten: ${l.proxyName})` : l.name).join(', '),
    landownerIds: data.landowners.map(l => l.idNumber).join(', '),
    adres: data.adres,
    oran: data.oran,
    tarih: data.tarih
  };
};

// Şablonun içindeki {{değişken}} alanlarını form verisiyle değiştirir
export const renderTemplateString = (template: string, dataDict: Record<string, string>) => {
  return template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
    return dataDict[key.trim()] || "....................";
  });
};