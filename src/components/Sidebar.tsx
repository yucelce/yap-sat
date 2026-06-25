import React, { useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { ChevronDown, ChevronUp, MapPin, Layers, Settings, FileText, Plus, Trash2 } from 'lucide-react';
import { ContractData } from '../types';
import { CONTRACT_TEMPLATES, PREDEFINED_SPECS } from '../utils/templateEngine';

// --- SABİT STİL SINIFLARI (Kurumsal & Ciddi Görünüm) ---
const inputClass = "w-full border border-zinc-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors placeholder:text-zinc-400 shadow-sm";
const labelClass = "block text-xs font-medium text-zinc-600 mb-1.5";
const sectionHeaderClass = "w-full flex items-center justify-between p-3.5 bg-zinc-50 hover:bg-zinc-100 font-semibold text-sm text-zinc-800 transition-colors";
const moduleWrapperClass = "border border-zinc-200 bg-white shadow-sm rounded-lg overflow-hidden";

interface SidebarProps {
  formMethods: UseFormReturn<ContractData>;
}

export default function Sidebar({ formMethods }: SidebarProps) {
  const { register, control, setValue, watch } = formMethods;
  const [activeSection, setActiveSection] = useState<string | null>('lokasyon');

  const { fields: unitFields, append: appendUnit, remove: removeUnit } = useFieldArray({
    control,
    name: "unitShares"
  });

  const selectedPkg = watch("selectedSpecPackageId");

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pkgId = e.target.value;
    setValue("selectedSpecPackageId", pkgId);
    if (PREDEFINED_SPECS[pkgId]) {
      setValue("customSpecs", PREDEFINED_SPECS[pkgId].items);
    }
  };

  return (
    <div className="w-full md:w-[460px] md:min-w-[460px] bg-zinc-50/50 border-r border-zinc-200 flex flex-col h-full overflow-y-auto print:hidden shadow-lg z-10">

      {/* Üst Başlık */}
      <div className="p-4 bg-white border-b border-zinc-200 text-zinc-900 sticky top-0 z-20">
        <h2 className="font-semibold text-sm tracking-wide">Modüler Sözleşme Yapılandırıcı</h2>
      </div>

      <div className="p-5 space-y-5 flex-1">

        {/* MODÜL 3: TAPU VE LOKASYON MODELİ */}
        <div className={moduleWrapperClass}>
          <button type="button" onClick={() => setActiveSection(activeSection === 'lokasyon' ? null : 'lokasyon')} className={sectionHeaderClass}>
            <span className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-zinc-700" /> 3. Tapu & Gayrimenkul Bilgisi</span>
            {activeSection === 'lokasyon' ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
          </button>

          {activeSection === 'lokasyon' && (
            <div className="p-4 grid grid-cols-2 gap-4 border-t border-zinc-200 bg-white">
              <div><label className={labelClass}>İl</label><input {...register("property.il")} className={inputClass} /></div>
              <div><label className={labelClass}>İlçe</label><input {...register("property.ilce")} className={inputClass} /></div>
              <div className="col-span-2"><label className={labelClass}>Mahalle / Köy</label><input {...register("property.mahalleKoy")} className={inputClass} /></div>
              <div><label className={labelClass}>Pafta No</label><input {...register("property.pafta")} className={inputClass} /></div>
              <div><label className={labelClass}>Ada No</label><input {...register("property.ada")} className={inputClass} /></div>
              <div><label className={labelClass}>Parsel No</label><input {...register("property.parsel")} className={inputClass} /></div>
              <div><label className={labelClass}>Yüzölçümü (m²)</label><input {...register("property.yuzolcumu")} className={inputClass} /></div>
              <div className="col-span-2"><label className={labelClass}>Nitelik (Arsa, Tarla vb.)</label><input {...register("property.nitelik")} placeholder="Örn: Arsa" className={inputClass} /></div>
            </div>
          )}
        </div>

        {/* MODÜL 4: TEKNİK ŞARTNAME & BAĞIMSIZ BÖLÜM GRİDİ */}
        <div className={moduleWrapperClass}>
          <button type="button" onClick={() => setActiveSection(activeSection === 'sartname' ? null : 'sartname')} className={sectionHeaderClass}>
            <span className="flex items-center gap-2.5"><Settings className="w-4 h-4 text-zinc-700" /> 4. Şartname & EK-2 Tablosu</span>
            {activeSection === 'sartname' ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
          </button>

          {activeSection === 'sartname' && (
            <div className="p-4 space-y-5 border-t border-zinc-200 bg-white">
              {/* Şartname Paket Seçimi */}
              <div>
                <label className={labelClass}>Malzeme Standardı (EK-1)</label>
                <select value={selectedPkg} onChange={handlePackageChange} className={inputClass}>
                  <option value="">Seçiniz...</option>
                  <option value="premium">Premium Lüks Malzeme Paketi</option>
                  <option value="standard">Standart Konfor Malzeme Paketi</option>
                </select>
              </div>

              {/* Bağımsız Bölüm Grid Matrisi */}
              <div className="border-t border-zinc-100 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-zinc-800">EK-2: Bağımsız Bölüm Dağılımı</label>
                  <button type="button" onClick={() => appendUnit({ id: Date.now().toString(), unitNo: "", block: "A", floor: "", type: "3+1", allocatedTo: "Müteahhit" })} className="text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-2 py-1 rounded transition-colors flex items-center gap-1 text-xs font-medium"><Plus className="w-3 h-3" /> Ekle</button>
                </div>

                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                  {unitFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center bg-zinc-50 p-2.5 border border-zinc-200 rounded-md relative group transition-colors hover:border-zinc-300">
                      <input {...register(`unitShares.${index}.block` as const)} placeholder="Blok" className="w-14 border border-zinc-300 rounded px-2 py-1.5 text-xs text-center bg-white focus:ring-1 focus:ring-zinc-500 outline-none" />
                      <input {...register(`unitShares.${index}.floor` as const)} placeholder="Kat" className="w-14 border border-zinc-300 rounded px-2 py-1.5 text-xs text-center bg-white focus:ring-1 focus:ring-zinc-500 outline-none" />
                      <input {...register(`unitShares.${index}.unitNo` as const)} placeholder="No" className="w-14 border border-zinc-300 rounded px-2 py-1.5 text-xs text-center bg-white focus:ring-1 focus:ring-zinc-500 outline-none" />
                      <select {...register(`unitShares.${index}.allocatedTo` as const)} className="flex-1 border border-zinc-300 rounded px-2 py-1.5 text-xs bg-white focus:ring-1 focus:ring-zinc-500 outline-none">
                        <option value="Müteahhit">Müteahhit</option>
                        <option value="Arsa Sahibi">Arsa Sahibi</option>
                      </select>
                      <button type="button" onClick={() => removeUnit(index)} className="text-zinc-400 hover:text-red-600 p-1 transition-colors" title="Sil"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MODÜL 5: SÖZLEŞME VERSİYONLAMA & ZEYİLNAME */}
        <div className={moduleWrapperClass}>
          <button type="button" onClick={() => setActiveSection(activeSection === 'versiyon' ? null : 'versiyon')} className={sectionHeaderClass}>
            <span className="flex items-center gap-2.5"><Layers className="w-4 h-4 text-zinc-700" /> 5. Doküman Yönetimi & Zeyilname</span>
            {activeSection === 'versiyon' ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
          </button>

          {activeSection === 'versiyon' && (
            <div className="p-4 space-y-4 border-t border-zinc-200 bg-zinc-50/50">
              <div className="flex items-center gap-4 bg-white p-4 border border-zinc-200 rounded-md shadow-sm">
                <div className="border-r border-zinc-200 pr-4">
                  <label className={labelClass}>Aktif Sürüm</label>
                  <span className="text-xl font-bold text-zinc-900">V{formMethods.watch("versionInfo.versionNumber") || 1}</span>
                </div>
                <div className="flex-1 pl-2">
                  <div className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" id="addendumCheck" {...register("versionInfo.isAddendum")} className="w-4 h-4 text-zinc-900 rounded border-zinc-300 focus:ring-zinc-500 cursor-pointer" />
                    <label htmlFor="addendumCheck" className="text-sm font-medium text-zinc-800 cursor-pointer select-none">Bu bir Zeyilnamedir (Ek)</label>
                  </div>
                </div>
              </div>

              {formMethods.watch("versionInfo.isAddendum") && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                  <label className={labelClass}>Zeyil Nedeni / Değişiklik Maddesi</label>
                  <textarea {...register("versionInfo.changeReason")} rows={3} placeholder="Örn: 15.02.2026 tarihli ana sözleşmeye ek olarak mutfak mermer kalemi güncellenmiştir." className={`${inputClass} resize-none leading-relaxed`} />
                </div>
              )}
            </div>
          )}
        </div>
        {/* MODÜL 6: SÖZLEŞME MADDELERİ */}
        <div className={moduleWrapperClass}>
          <button type="button" onClick={() => setActiveSection(activeSection === 'maddeler' ? null : 'maddeler')} className={sectionHeaderClass}>
            <span className="flex items-center gap-2.5"><FileText className="w-4 h-4 text-zinc-700" /> 6. Sözleşme Maddeleri</span>
            {activeSection === 'maddeler' ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
          </button>

          {activeSection === 'maddeler' && (
            <div className="p-4 space-y-3 border-t border-zinc-200 bg-white">
              {CONTRACT_TEMPLATES.YAP_SAT.articles.map(article => {
                const isSelected = (watch("selectedClauses") || []).includes(article.id);
                return (
                  <div key={article.id} className="flex items-start gap-3 p-2.5 hover:bg-zinc-50 rounded-md transition-colors border border-transparent hover:border-zinc-200">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        if (!checked && article.isMandatory) {
                          const confirmed = window.confirm("DİKKAT: Bu madde yasal olarak sözleşmenin temelini oluşturmaktadır. Çıkarılması belgenin hukuki geçerliliğini tehlikeye atabilir. Yine de çıkarmak istiyor musunuz?");
                          if (!confirmed) return;
                        }

                        const current = watch("selectedClauses") || [];
                        if (checked) {
                          setValue("selectedClauses", [...current, article.id]);
                        } else {
                          setValue("selectedClauses", current.filter(id => id !== article.id));
                        }
                      }}
                      className="mt-1 w-4 h-4 text-zinc-900 rounded border-zinc-300 focus:ring-zinc-500 cursor-pointer"
                    />
                    <div>
                      <label className="text-sm font-semibold text-zinc-800 cursor-pointer block leading-tight">{article.title}</label>
                      {article.isMandatory && <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold mt-1 inline-block">ZORUNLU MADDE</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}