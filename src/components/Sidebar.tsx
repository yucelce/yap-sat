import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, MapPin, Calendar, Printer } from 'lucide-react';
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
    <div className="w-full md:w-[400px] md:min-w-[400px] bg-slate-50 border-r border-slate-300 flex flex-col shadow-md print:hidden h-full overflow-y-auto">
      <div className="p-4 border-b border-slate-200 bg-slate-100">
        <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide">Sözleşme Bilgileri</h2>
      </div>

      <div className="p-4 flex-1 space-y-3">
        {/* SEKME 1: TARAFLAR */}
        <div className="border border-slate-300 rounded-sm bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection('taraflar')}
            className="w-full flex items-center justify-between p-3 bg-slate-100 hover:bg-slate-200 transition-colors font-bold text-slate-800 text-sm uppercase"
          >
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-slate-600" />
              <span>1. Sözleşme Tarafları</span>
            </div>
            {activeSection === 'taraflar' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {activeSection === 'taraflar' && (
            <div className="p-4 space-y-4 border-t border-slate-300 bg-white">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Müteahhit Firma / Kişi</label>
                <input type="text" name="muteahhit" value={formData.muteahhit} onChange={onChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Müteahhit Vergi No / TC</label>
                <input type="text" name="muteahhitVn" value={formData.muteahhitVn} onChange={onChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm" />
              </div>
              <div className="border-t border-slate-200 pt-3">
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Arsa Sahibi Adı Soyadı</label>
                <input type="text" name="arsaSahibi" value={formData.arsaSahibi} onChange={onChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Arsa Sahibi T.C. Kimlik No</label>
                <input type="text" name="arsaSahibiTc" value={formData.arsaSahibiTc} onChange={onChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm" />
              </div>
            </div>
          )}
        </div>

        {/* SEKME 2: KONU */}
        <div className="border border-slate-300 rounded-sm bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection('konu')}
            className="w-full flex items-center justify-between p-3 bg-slate-100 hover:bg-slate-200 transition-colors font-bold text-slate-800 text-sm uppercase"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-600" />
              <span>2. Taşınmaz & Paylaşım</span>
            </div>
            {activeSection === 'konu' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {activeSection === 'konu' && (
            <div className="p-4 space-y-4 border-t border-slate-300 bg-white">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Arsa Adresi</label>
                <textarea name="adres" value={formData.adres} onChange={onChange} rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Paylaşım Oranı</label>
                <input type="text" name="oran" value={formData.oran} onChange={onChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm" />
              </div>
            </div>
          )}
        </div>

        {/* SEKME 3: TARİH */}
        <div className="border border-slate-300 rounded-sm bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection('tarih')}
            className="w-full flex items-center justify-between p-3 bg-slate-100 hover:bg-slate-200 transition-colors font-bold text-slate-800 text-sm uppercase"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-600" />
              <span>3. Sözleşme Tarihi</span>
            </div>
            {activeSection === 'tarih' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          {activeSection === 'tarih' && (
            <div className="p-4 space-y-4 border-t border-slate-300 bg-white">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">İmza Tarihi</label>
                <input type="text" name="tarih" value={formData.tarih} onChange={onChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-slate-300 bg-slate-200">
        <button
          onClick={() => window.print()}
          className="w-full bg-slate-800 text-white py-2.5 rounded-sm hover:bg-slate-900 transition-colors shadow-sm font-bold uppercase text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Printer className="h-4 w-4" />
          Yazıcıdan Çıktı Al
        </button>
      </div>
    </div>
  );
}