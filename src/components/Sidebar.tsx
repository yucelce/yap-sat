import React, { useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { ChevronDown, ChevronUp, MapPin, Layers, Settings, FileText, Plus, Trash2 } from 'lucide-react';
import { ContractData } from '../types';
import { PREDEFINED_SPECS } from '../utils/templateEngine';

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
    <div className="w-full md:w-[460px] md:min-w-[460px] bg-slate-50 border-r border-slate-300 flex flex-col h-full overflow-y-auto print:hidden shadow-lg">
      <div className="p-4 bg-slate-900 text-white">
        <h2 className="font-bold text-sm uppercase tracking-wider">Modüler Sözleşme Yapılandırıcı</h2>
      </div>

      <div className="p-4 space-y-3 flex-1">
        
        {/* MODÜL 3: TAPU VE LOKASYON MODELİ */}
        <div className="border border-slate-300 bg-white shadow-sm">
          <button type="button" onClick={() => setActiveSection(activeSection === 'lokasyon' ? null : 'lokasyon')} className="w-full flex items-center justify-between p-3 bg-slate-100 font-bold text-xs uppercase text-slate-700">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-600"/> 3. Tapu & Gayrimenkul Hiyerarşisi</span>
            {activeSection === 'lokasyon' ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
          </button>
          {activeSection === 'lokasyon' && (
            <div className="p-4 grid grid-cols-2 gap-3 border-t border-slate-200">
              <div><label className="block text-[10px] font-bold text-slate-500 uppercase">İl</label><input {...register("property.il")} className="w-full border p-1.5 text-sm" /></div>
              <div><label className="block text-[10px] font-bold text-slate-500 uppercase">İlçe</label><input {...register("property.ilce")} className="w-full border p-1.5 text-sm" /></div>
              <div className="col-span-2"><label className="block text-[10px] font-bold text-slate-500 uppercase">Mahalle / Köy</label><input {...register("property.mahalleKoy")} className="w-full border p-1.5 text-sm" /></div>
              <div><label className="block text-[10px] font-bold text-slate-500 uppercase">Pafta No</label><input {...register("property.pafta")} className="w-full border p-1.5 text-sm" /></div>
              <div><label className="block text-[10px] font-bold text-slate-500 uppercase">Ada No</label><input {...register("property.ada")} className="w-full border p-1.5 text-sm" /></div>
              <div><label className="block text-[10px] font-bold text-slate-500 uppercase">Parsel No</label><input {...register("property.parsel")} className="w-full border p-1.5 text-sm" /></div>
              <div><label className="block text-[10px] font-bold text-slate-500 uppercase">Yüzölçümü (m²)</label><input {...register("property.yuzolcumu")} className="w-full border p-1.5 text-sm" /></div>
              <div className="col-span-2"><label className="block text-[10px] font-bold text-slate-500 uppercase">Nitelik</label><input {...register("property.nitelik")} placeholder="Arsa, Tarla vb." className="w-full border p-1.5 text-sm" /></div>
            </div>
          )}
        </div>

        {/* MODÜL 4: TEKNİK ŞARTNAME & BAĞIMSIZ BÖLÜM GRİDİ */}
        <div className="border border-slate-300 bg-white shadow-sm">
          <button type="button" onClick={() => setActiveSection(activeSection === 'sartname' ? null : 'sartname')} className="w-full flex items-center justify-between p-3 bg-slate-100 font-bold text-xs uppercase text-slate-700">
            <span className="flex items-center gap-2"><Settings className="w-4 h-4 text-green-600"/> 4. Şartname & EK-2 Paylaşım Tablosu</span>
            {activeSection === 'sartname' ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
          </button>
          {activeSection === 'sartname' && (
            <div className="p-4 space-y-4 border-t border-slate-200">
              {/* Şartname Paket Seçimi */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Malzeme Standardı (EK-1)</label>
                <select value={selectedPkg} onChange={handlePackageChange} className="w-full border p-2 text-sm bg-white">
                  <option value="">Seçiniz...</option>
                  <option value="premium">Premium Lüks Malzeme Paketi</option>
                  <option value="standard">Standart Konfor Malzeme Paketi</option>
                </select>
              </div>

              {/* Bağımsız Bölüm Grid Matrisi */}
              <div className="border-t border-slate-200 pt-3">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase">EK-2: Bağımsız Bölüm Dağılımı</label>
                  <button type="button" onClick={() => appendUnit({ id: Date.now().toString(), unitNo: "", block: "A", floor: "", type: "3+1", allocatedTo: "Müteahhit" })} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs font-bold"><Plus className="w-3 h-3"/> Ekle</button>
                </div>
                
                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                  {unitFields.map((field, index) => (
                    <div key={field.id} className="flex gap-1.5 items-center bg-slate-50 p-2 border border-slate-200 rounded-sm relative group">
                      <input {...register(`unitShares.${index}.block` as const)} placeholder="Blok" className="w-12 border p-1 text-xs text-center bg-white" />
                      <input {...register(`unitShares.${index}.floor` as const)} placeholder="Kat" className="w-12 border p-1 text-xs text-center bg-white" />
                      <input {...register(`unitShares.${index}.unitNo` as const)} placeholder="No" className="w-12 border p-1 text-xs text-center bg-white" />
                      <select {...register(`unitShares.${index}.allocatedTo` as const)} className="flex-1 border p-1 text-xs bg-white">
                        <option value="Müteahhit">Müteahhit</option>
                        <option value="Arsa Sahibi">Arsa Sahibi</option>
                      </select>
                      <button type="button" onClick={() => removeUnit(index)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="w-3 h-3"/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MODÜL 5: SÖZLEŞME VERSİYONLAMA & ZEYİLNAME */}
        <div className="border border-slate-300 bg-white shadow-sm">
          <button type="button" onClick={() => setActiveSection(activeSection === 'versiyon' ? null : 'versiyon')} className="w-full flex items-center justify-between p-3 bg-slate-100 font-bold text-xs uppercase text-slate-700">
            <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-purple-600"/> 5. Doküman Yönetimi & Zeyilname</span>
            {activeSection === 'versiyon' ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
          </button>
          {activeSection === 'versiyon' && (
            <div className="p-4 space-y-3 border-t border-slate-200 bg-purple-50/40">
              <div className="flex items-center gap-4 bg-white p-3 border border-purple-200">
                <div>
                  <label className="block text-[10px] font-bold text-purple-700 uppercase">Aktif Sürüm</label>
                  <span className="text-lg font-black text-purple-900">V{formMethods.watch("versionInfo.versionNumber") || 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="addendumCheck" {...register("versionInfo.isAddendum")} className="w-4 h-4" />
                    <label htmlFor="addendumCheck" className="text-xs font-bold text-slate-700">Bu bir Zeyilnamedir (Ek Sözleşme)</label>
                  </div>
                </div>
              </div>
              {formMethods.watch("versionInfo.isAddendum") && (
                <div>
                  <label className="block text-[10px] font-bold text-purple-700 uppercase mb-1">Zeyil Nedeni / Değişiklik Maddesi</label>
                  <textarea {...register("versionInfo.changeReason")} rows={2} placeholder="Örn: 15.02.2026 tarihli ana sözleşmeye ek olarak mutfak mermer kalemi güncellenmiştir." className="w-full border p-2 text-xs bg-white resize-none" />
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}