import { z } from "zod";

// Kişi/Firma Şeması (Ortak)
export const PersonSchema = z.object({
  id: z.string(), // frontend'de array yönetimi için benzersiz ID
  name: z.string().min(2, "Ad Soyad/Unvan en az 2 karakter olmalıdır"),
  idNumber: z.string().min(10, "TC/Vergi No en az 10 haneli olmalıdır"),
  isProxy: z.boolean().default(false), // Vekaleten mi yürütülüyor?
  proxyName: z.string().optional(),
});

// Ana Sözleşme Şeması
export const ContractDataSchema = z.object({
  contractors: z.array(PersonSchema).min(1, "En az 1 müteahhit eklemelisiniz"),
  landowners: z.array(PersonSchema).min(1, "En az 1 arsa sahibi eklemelisiniz"),
  adres: z.string().min(5, "Adres alanı zorunludur"),
  oran: z.string().min(1, "Paylaşım oranı zorunludur"),
  tarih: z.string().min(1, "Tarih zorunludur"),
});

export type PersonData = z.infer<typeof PersonSchema>;
export type ContractData = z.infer<typeof ContractDataSchema>;