import { pgTable, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

// 1. Rol Yönetimi (RBAC)
export const roles = sqliteTable("roles", {
  id: text("id").primaryKey(),
  name: text("name").notNull(), // 'contractor', 'lawyer', 'landowner', 'admin'
  description: text("description"),
});

// 2. Kullanıcı Tablosu
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  roleId: text("role_id").notNull().references(() => roles.id),
  companyName: text("company_name"), // Müteahhit firmalar için
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

// 3. Şartname Paketleri (Örn: Premium Paket, Standart Paket)
export const specPackages = sqliteTable("spec_packages", {
  id: text("id").primaryKey(),
  packageName: text("package_name").notNull(), // 'Premium', 'Standart'
  contentJson: text("content_json").notNull(), // Anahtar-değer şablon listesi
});

// 4. Sözleşme Ana Kökü (Kapsayıcı)
export const contracts = sqliteTable("contracts", {
  id: text("id").primaryKey(),
  creatorId: text("creator_id").notNull().references(() => users.id),
  status: text("status").notNull().default("draft"), // 'draft', 'signed', 'amended'
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

// 5. Sözleşme Versiyonları (Zeyilname & Taslak Geçmişi)
export const contractVersions = sqliteTable("contract_versions", {
  id: text("id").primaryKey(),
  contractId: text("contract_id").notNull().references(() => contracts.id),
  versionNumber: integer("version_number").notNull().default(1), // V1, V2, V3...
  isAddendum: integer("is_addendum", { mode: "boolean" }).notNull().default(false), // Zeyilname mi?
  changeReason: text("change_reason"), // Versiyon/Zeyilname açıklama nedeni
  snapshotData: text("snapshot_data").notNull(), // O ana ait tüm Zod form datası (JSON string)
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});