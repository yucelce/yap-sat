import React from 'react';
import { ContractData } from '../types';

interface DocumentPreviewProps {
  formData: ContractData;
}

// Önizlemede değişen alanları vurgulamak için yardımcı küçük bileşen
const HighlightedText = ({ value }: { value: string }) => (
  <span className="bg-indigo-50 text-indigo-900 px-1.5 py-0.5 rounded font-semibold border-b border-indigo-200 transition-colors print:bg-transparent print:text-black print:p-0 print:border-none print:font-bold">
    {value || ".........."}
  </span>
);

export default function DocumentPreview({ formData }: DocumentPreviewProps) {
  return (
    <div className="flex-1 bg-slate-100 py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto flex justify-center h-screen print:h-auto print:bg-white print:py-0 print:px-0 print:overflow-visible">
      {/* Gerçekçi A4 Sayfa Tasarımı */}
      <div className="w-full max-w-[210mm] min-h-[297mm] bg-white p-12 sm:p-20 shadow-md ring-1 ring-slate-200 rounded-sm print:shadow-none print:ring-0 print:p-0 print:max-w-full flex flex-col justify-between">
        
        <div>
          {/* Resmi Sözleşme Başlığı */}
          <div className="border-b-2 border-slate-800 pb-6 mb-12 text-center">
            <h1 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-slate-950 leading-snug">
              Gayrimenkul Satış Vaadi Ve Arsa Payı Karşılığı İnşaat Sözleşmesi
            </h1>
          </div>

          {/* Sözleşme Maddeleri */}
          <div className="space-y-8 text-slate-900 leading-relaxed text-justify text-base">
            <div>
              <h3 className="font-bold text-lg text-slate-950 mb-2">1. TARAFLAR</h3>
              <p>
                İşbu sözleşme, bir tarafta mukim ve Vergi/TC numarası <HighlightedText value={formData.muteahhitVn} /> olan{' '}
                <HighlightedText value={formData.muteahhit} /> (bundan böyle kısaca <strong>"MÜTEAHHİT"</strong> olarak anılacaktır) ile diğer tarafta mukim ve T.C. Kimlik numarası <HighlightedText value={formData.arsaSahibiTc} /> olan{' '}
                <HighlightedText value={formData.arsaSahibi} /> (bundan böyle kısaca <strong>"ARSA SAHİBİ"</strong> olarak anılacaktır) arasında aşağıda belirtilen şartlar dahilinde tanzim ve imza edilmiştir.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-950 mb-2">2. SÖZLEŞMENİN KONUSU</h3>
              <p>
                İşbu sözleşmenin konusu; mülkiyeti ARSA SAHİBİ'ne ait olan, tapunun <HighlightedText value={formData.adres} /> adresinde kayıtlı taşınmaz üzerine MÜTEAHHİT tarafından ilgili imar durumuna, tasdikli projesine, imar yönetmeliklerine ve teknik şartnameye tam uygun olarak modern bir inşaat yapılması ve inşa edilecek bağımsız bölümlerin taraflar arasında <HighlightedText value={formData.oran} /> oranında paylaşılması işidir.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-950 mb-2">3. SÖZLEŞME TARİHİ VE YÜRÜRLÜK</h3>
              <p>
                İşbu sözleşme <HighlightedText value={formData.tarih} /> tarihinde taraflarca eksiksiz olarak okunmuş, beyan edilen tüm hususlar üzerinde mutabakata varılarak kendi serbest iradeleriyle iki nüsha halinde imza altına alınmış ve yürürlüğe girmiştir.
              </p>
            </div>
          </div>
        </div>

        {/* İmza Blokları (Sayfa Altı) */}
        <div className="mt-24 flex justify-between px-4 sm:px-12 mb-6">
          <div className="text-center w-5/12 flex flex-col justify-between h-32">
            <p className="font-bold text-slate-950 uppercase tracking-wider text-sm">MÜTEAHHİT</p>
            <div className="border-t border-slate-400 pt-3">
              <p className="font-semibold text-slate-900 text-sm truncate">{formData.muteahhit}</p>
              <p className="text-xs text-slate-400 mt-0.5 print:hidden">İmza Alanı</p>
            </div>
          </div>
          
          <div className="text-center w-5/12 flex flex-col justify-between h-32">
            <p className="font-bold text-slate-950 uppercase tracking-wider text-sm">ARSA SAHİBİ</p>
            <div className="border-t border-slate-400 pt-3">
              <p className="font-semibold text-slate-900 text-sm truncate">{formData.arsaSahibi}</p>
              <p className="text-xs text-slate-400 mt-0.5 print:hidden">İmza Alanı</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}