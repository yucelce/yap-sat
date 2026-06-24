// src/db/schema.ts

import { pgTable, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

// 1. Rol Yönetimi (RBAC)
export const roles = pgTable("roles", { // sqliteTable yerine pgTable
  id: text("id").primaryKey(),
  name: text("name").notNull(), 
  description: text("description"),
});

// 2. Kullanıcı Tablosu
export const users = pgTable("users", { // sqliteTable yerine pgTable
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  roleId: text("role_id").notNull().references(() => roles.id),
  companyName: text("company_name"), 
  createdAt: timestamp("created_at").notNull(), // PostgreSQL için timestamp
});

// 3. Şartname Paketleri 
export const specPackages = pgTable("spec_packages", { // sqliteTable yerine pgTable
  id: text("id").primaryKey(),
  packageName: text("package_name").notNull(), 
  contentJson: text("content_json").notNull(), 
});

// 4. Sözleşme Ana Kökü 
export const contracts = pgTable("contracts", { // sqliteTable yerine pgTable
  id: text("id").primaryKey(),
  creatorId: text("creator_id").notNull().references(() => users.id),
  status: text("status").notNull().default("draft"), 
  createdAt: timestamp("created_at").notNull(), // PostgreSQL için timestamp
});

// 5. Sözleşme Versiyonları 
export const contractVersions = pgTable("contract_versions", { // sqliteTable yerine pgTable
  id: text("id").primaryKey(),
  contractId: text("contract_id").notNull().references(() => contracts.id),
  versionNumber: integer("version_number").notNull().default(1), 
  isAddendum: boolean("is_addendum").notNull().default(false), // integer mode: boolean yerine direkt boolean
  changeReason: text("change_reason"), 
  snapshotData: text("snapshot_data").notNull(), 
  createdAt: timestamp("created_at").notNull(), // PostgreSQL için timestamp
});