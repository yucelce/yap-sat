import React, { useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { ChevronDown, ChevronUp, User, MapPin, Calendar, Printer, Plus, Trash2 } from 'lucide-react';
import { ContractData } from '../types';

type AccordionSection = 'taraflar' | 'konu' | 'tarih' | null;

interface SidebarProps {
  formMethods: UseFormReturn<ContractData>;
}

export default function Sidebar({ formMethods }: SidebarProps) {
  const { register, control, formState: { errors } } = formMethods;
  const [activeSection, setActiveSection] = useState<AccordionSection>('taraflar');

  const { fields: contractorFields, append: appendContractor, remove: removeContractor } = useFieldArray({ control, name: "contractors" });
  const { fields: landownerFields, append: appendLandowner, remove: removeLandowner } = useFieldArray({ control, name: "landowners" });

  const toggleSection = (section: AccordionSection) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="w-full md:w-[450px] md:min-w-[450px] bg-slate-50 border-r border-slate-300 flex flex-col shadow-md print:hidden h-full overflow-y-auto">
      <div className="p-4 border-b border-slate-200 bg-slate-100">
        <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide">Sözleşme Bilgileri</h2>
      </div>

      <form className="p-4 flex-1 space-y-3">
        {/* SEKME 1: TARAFLAR */}
        <div className="border border-slate-300 rounded-sm bg-white overflow-hidden shadow-sm">
          <button type="button" onClick={() => toggleSection('taraflar')} className="w-full flex items-center justify-between p-3 bg-slate-100 hover:bg-slate-200 transition-colors font-bold text-slate-800 text-sm uppercase">
            <div className="flex items-center gap-2"><User className="h-4 w-4 text-slate-600" /><span>1. Sözleşme Tarafları</span></div>
            {activeSection === 'taraflar' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {activeSection === 'taraflar' && (
            <div className="p-4 space-y-6 border-t border-slate-300 bg-white">
              
              {/* MÜTEAHHİTLER (ORTAK GİRİŞİM DESTEĞİ) */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold text-slate-800">MÜTEAHHİTLER</h3>
                  <button type="button" onClick={() => appendContractor({ id: Date.now().toString(), name: '', idNumber: '', isProxy: false })} className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold"><Plus className="w-3 h-3"/> Ekle</button>
                </div>
                {contractorFields.map((field, index) => (
                  <div key={field.id} className="p-3 border border-slate-200 rounded-sm mb-3 bg-slate-50 relative">
                    {index > 0 && <button type="button" onClick={() => removeContractor(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button>}
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Firma / Kişi Unvanı</label>
                    <input {...register(`contractors.${index}.name` as const)} className="w-full px-3 py-2 border border-slate-300 rounded-sm mb-2 text-sm focus:ring-1 focus:ring-slate-800" />
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Vergi No / TC</label>
                    <input {...register(`contractors.${index}.idNumber` as const)} className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm focus:ring-1 focus:ring-slate-800" />
                  </div>
                ))}
              </div>

              {/* ARSA SAHİPLERİ (ÇOKLU HİSSEDAR VE VEKALET DESTEĞİ) */}
              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold text-slate-800">ARSA SAHİPLERİ</h3>
                  <button type="button" onClick={() => appendLandowner({ id: Date.now().toString(), name: '', idNumber: '', isProxy: false })} className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold"><Plus className="w-3 h-3"/> Ekle</button>
                </div>
                {landownerFields.map((field, index) => (
                  <div key={field.id} className="p-3 border border-slate-200 rounded-sm mb-3 bg-slate-50 relative">
                    {index > 0 && <button type="button" onClick={() => removeLandowner(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button>}
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Arsa Sahibi Adı Soyadı</label>
                    <input {...register(`landowners.${index}.name` as const)} className="w-full px-3 py-2 border border-slate-300 rounded-sm mb-2 text-sm" />
                    
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">T.C. Kimlik No</label>
                    <input {...register(`landowners.${index}.idNumber` as const)} className="w-full px-3 py-2 border border-slate-300 rounded-sm mb-2 text-sm" />

                    <div className="flex items-center gap-2 mt-2 mb-2">
                      <input type="checkbox" id={`proxy-${index}`} {...register(`landowners.${index}.isProxy` as const)} className="w-4 h-4" />
                      <label htmlFor={`proxy-${index}`} className="text-xs font-semibold text-slate-700">İşlem Vekil Aracılığıyla Yapılacak</label>
                    </div>

                    {formMethods.watch(`landowners.${index}.isProxy`) && (
                      <div>
                        <label className="block text-xs font-bold uppercase text-blue-600 mb-1">Vekilin Adı Soyadı</label>
                        <input {...register(`landowners.${index}.proxyName` as const)} className="w-full px-3 py-2 border border-blue-300 bg-blue-50 rounded-sm text-sm" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SEKME 2: KONU VE PAYLAŞIM */}
        <div className="border border-slate-300 rounded-sm bg-white overflow-hidden shadow-sm">
          <button type="button" onClick={() => toggleSection('konu')} className="w-full flex items-center justify-between p-3 bg-slate-100 hover:bg-slate-200 transition-colors font-bold text-slate-800 text-sm uppercase">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-600" /><span>2. Taşınmaz & Paylaşım</span></div>
            {activeSection === 'konu' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {activeSection === 'konu' && (
            <div className="p-4 space-y-4 border-t border-slate-300 bg-white">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Arsa Adresi (Ada/Parsel)</label>
                <textarea {...register('adres')} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:ring-1 text-sm resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Paylaşım Oranı</label>
                <input {...register('oran')} className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm" />
              </div>
            </div>
          )}
        </div>

        {/* SEKME 3: TARİH */}
        <div className="border border-slate-300 rounded-sm bg-white overflow-hidden shadow-sm">
          <button type="button" onClick={() => toggleSection('tarih')} className="w-full flex items-center justify-between p-3 bg-slate-100 hover:bg-slate-200 transition-colors font-bold text-slate-800 text-sm uppercase">
            <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-slate-600" /><span>3. Sözleşme Tarihi</span></div>
            {activeSection === 'tarih' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {activeSection === 'tarih' && (
            <div className="p-4 space-y-4 border-t border-slate-300 bg-white">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">İmza Tarihi</label>
                <input {...register('tarih')} className="w-full px-3 py-2 border border-slate-300 rounded-sm text-sm" />
              </div>
            </div>
          )}
        </div>
      </form>

      <div className="p-4 border-t border-slate-300 bg-slate-200">
        <button onClick={() => window.print()} className="w-full bg-slate-800 text-white py-2.5 rounded-sm hover:bg-slate-900 transition-colors shadow-sm font-bold uppercase text-sm flex items-center justify-center gap-2 cursor-pointer">
          <Printer className="h-4 w-4" />
          Yazıcıdan Çıktı Al
        </button>
      </div>
    </div>
  );
}