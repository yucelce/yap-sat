import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, MapPin, Calendar, Printer, FileText } from 'lucide-react';
import { ContractData } from '../types';

type AccordionSection = 'taraflar' | 'konu' | 'tarih' | null;

interface SidebarProps {
  formData: ContractData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function Sidebar({ formData, onChange }: SidebarProps) {
  const [activeSection, setActiveSection] = useState<AccordionSection>('taraflar');

  const toggleSection = (section: AccordionSection) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="w-full md:w-[400px] md:min-w-[400px] bg-white border-r border-slate-200 flex flex-col shadow-xl print:hidden h-screen sticky top-0 overflow-y-auto">
      {/* Üst Başlık */}
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-3">
        <FileText className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-bold tracking-tight text-slate-900">Sözleşme Sihirbazı</h2>
      </div>

      <div className="p-4 flex-1 space-y-4">
        
        {/* SEKME 1: TARAFLAR */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('taraflar')}
            className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors font-semibold text-slate-700"
          >
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-indigo-500" />
              <span>1. Sözleşme Tarafları</span>
            </div>
            {activeSection === 'taraflar' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          
          {activeSection === 'taraflar' && (
            <div className="p-4 bg-white space-y-4 border-t border-slate-200">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Müteahhit Firma / Kişi</label>
                <input type="text" name="muteahhit" value={formData.muteahhit} onChange={onChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Müteahhit Vergi No / TC</label>
                <input type="text" name="muteahhitVn" value={formData.muteahhitVn} onChange={onChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div className="border-t border-slate-100 pt-3">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Arsa Sahibi Adı Soyadı</label>
                <input type="text" name="arsaSahibi" value={formData.arsaSahibi} onChange={onChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Arsa Sahibi T.C. Kimlik No</label>
                <input type="text" name="arsaSahibiTc" value={formData.arsaSahibiTc} onChange={onChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
            </div>
          )}
        </div>

        {/* SEKME 2: KONU */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('konu')}
            className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors font-semibold text-slate-700"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-indigo-500" />
              <span>2. Taşınmaz & Paylaşım</span>
            </div>
            {activeSection === 'konu' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          
          {activeSection === 'konu' && (
            <div className="p-4 bg-white space-y-4 border-t border-slate-200">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Arsa Adresi</label>
                <textarea name="adres" value={formData.adres} onChange={onChange} rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Paylaşım Oranı</label>
                <input type="text" name="oran" value={formData.oran} onChange={onChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
            </div>
          )}
        </div>

        {/* SEKME 3: TARİH */}
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('tarih')}
            className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors font-semibold text-slate-700"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-500" />
              <span>3. Sözleşme Tarihi</span>
            </div>
            {activeSection === 'tarih' ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          
          {activeSection === 'tarih' && (
            <div className="p-4 bg-white space-y-4 border-t border-slate-200">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">İmza Tarihi</label>
                <input type="text" name="tarih" value={formData.tarih} onChange={onChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Yazdırma Butonu */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <button
          onClick={() => window.print()}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 font-semibold flex items-center justify-center gap-2 cursor-pointer"
        >
          <Printer className="h-5 w-5" />
          Sözleşmeyi Yazdır
        </button>
      </div>
    </div>
  );
}