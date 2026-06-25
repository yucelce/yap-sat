import { z } from "zod";

// Taraflar Şeması
export const PersonSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "İsim/Unvan zorunludur"),
  idNumber: z.string().min(10, "TC/Vergi No geçerli olmalıdır"),
  isProxy: z.boolean().default(false),
  proxyName: z.string().optional(),
});

// 3. Madde: Tapu ve Gayrimenkul Hiyerarşisi (Lokasyon Modeli)
export const PropertyHierarchySchema = z.object({
  il: z.string().min(2, "İl alanı zorunludur"),
  ilce: z.string().min(2, "İlçe alanı zorunludur"),
  mahalleKoy: z.string().min(2, "Mahalle/Köy alanı zorunludur"),
  pafta: z.string().min(1, "Pafta zorunludur"),
  ada: z.string().min(1, "Ada zorunludur"),
  parsel: z.string().min(1, "Parsel zorunludur"),
  yuzolcumu: z.string().min(1, "Yüzölçümü zorunludur"),
  nitelik: z.string().min(2, "Nitelik zorunludur (Örn: Arsa)"),
});

// 4. Madde: Bağımsız Bölüm Paylaşım Grid Elemanı (EK-2)
export const IndependentUnitSchema = z.object({
  id: z.string(),
  unitNo: z.string().min(1, "No"),
  block: z.string().default("A"),
  floor: z.string().min(1, "Kat"),
  type: z.string().default("3+1"), // Daire tipi
  allocatedTo: z.enum(["Müteahhit", "Arsa Sahibi"]), // Kime ait?
});

// Teknik Şartname Kalem Şeması (EK-1)
export const TechSpecItemSchema = z.object({
  key: z.string(),   // Örn: 'Kombi'
  value: z.string(), // Örn: 'Vaillant Ecotech 24kw'
});


// src/types/index.ts içinde bulun ve güncelleyin:

export const ContractDataSchema = z.object({
  contractors: z.array(PersonSchema).min(1),
  landowners: z.array(PersonSchema).min(1),
  property: PropertyHierarchySchema,
  unitShares: z.array(IndependentUnitSchema).min(1, "En az bir bağımsız bölüm girilmelidir"),
  selectedSpecPackageId: z.string(),
  customSpecs: z.array(TechSpecItemSchema),
  oran: z.string().min(1),
  tarih: z.string().min(1),
  selectedClauses: z.array(z.string()).default([]),
  
  // YENİ EKLENEN ALAN: Özelleştirilmiş madde metinlerini tutar
  customArticles: z.record(z.string(), z.string()).default({}),

  versionInfo: z.object({
    versionNumber: z.number().default(1),
    isAddendum: z.boolean().default(false),
    changeReason: z.string().optional(),
  }).optional(),
});

export type ContractData = z.infer<typeof ContractDataSchema>;
export type IndependentUnit = z.infer<typeof IndependentUnitSchema>;