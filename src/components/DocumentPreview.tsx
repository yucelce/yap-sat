import React from 'react';
import { ContractData } from '../types';

interface DocumentPreviewProps {
  formData: ContractData;
}

// Renkli arka plan yerine yalnızca altı çizili siyah metin
const HighlightedText = ({ value }: { value: string }) => (
  <span className="font-bold border-b border-slate-400 pb-0.5 print:border-none print:font-bold">
    {value || "...................."}
  </span>
);

export default function DocumentPreview({ formData }: DocumentPreviewProps) {
  return (
    <div className="flex-1 bg-slate-200 py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto flex justify-center print:bg-white print:p-0 print:overflow-visible">
      {/* Köşeli A4 Tasarımı, Serif Font Ailesi */}
      <div className="w-full max-w-[210mm] min-h-[297mm] bg-white p-16 sm:p-24 shadow-lg border border-slate-300 rounded-none print:shadow-none print:border-none print:p-0 print:max-w-full flex flex-col justify-between font-serif">
        
        <div>
          {/* Resmi Sözleşme Başlığı */}
          <div className="border-b-2 border-black pb-4 mb-10 text-center">
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-black leading-snug">
              GAYRİMENKUL SATIŞ VAADİ VE<br/>ARSA PAYI KARŞILIĞI İNŞAAT SÖZLEŞMESİ
            </h1>
          </div>

          {/* Sözleşme Maddeleri */}
          <div className="space-y-8 text-black leading-loose text-justify text-[15px]">
            <div>
              <h3 className="font-bold text-lg mb-2">1. TARAFLAR</h3>
              <p>
                İşbu sözleşme, bir tarafta mukim ve Vergi/TC numarası <HighlightedText value={formData.muteahhitVn} /> olan{' '}
                <HighlightedText value={formData.muteahhit} /> (bundan böyle kısaca <strong>"MÜTEAHHİT"</strong> olarak anılacaktır) ile diğer tarafta mukim ve T.C. Kimlik numarası <HighlightedText value={formData.arsaSahibiTc} /> olan{' '}
                <HighlightedText value={formData.arsaSahibi} /> (bundan böyle kısaca <strong>"ARSA SAHİBİ"</strong> olarak anılacaktır) arasında aşağıda belirtilen şartlar dahilinde tanzim ve imza edilmiştir.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">2. SÖZLEŞMENİN KONUSU</h3>
              <p>
                İşbu sözleşmenin konusu; mülkiyeti ARSA SAHİBİ'ne ait olan, tapunun <HighlightedText value={formData.adres} /> adresinde kayıtlı taşınmaz üzerine MÜTEAHHİT tarafından ilgili imar durumuna, tasdikli projesine, imar yönetmeliklerine ve teknik şartnameye tam uygun olarak modern bir inşaat yapılması ve inşa edilecek bağımsız bölümlerin taraflar arasında <HighlightedText value={formData.oran} /> oranında paylaşılması işidir.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">3. SÖZLEŞME TARİHİ VE YÜRÜRLÜK</h3>
              <p>
                İşbu sözleşme <HighlightedText value={formData.tarih} /> tarihinde taraflarca eksiksiz olarak okunmuş, beyan edilen tüm hususlar üzerinde mutabakata varılarak kendi serbest iradeleriyle iki nüsha halinde imza altına alınmış ve yürürlüğe girmiştir.
              </p>
            </div>
          </div>
        </div>

        {/* İmza Blokları */}
        <div className="mt-24 flex justify-between px-4 sm:px-12 mb-6">
          <div className="text-center w-5/12 flex flex-col justify-between h-32">
            <p className="font-bold uppercase tracking-wider text-sm">MÜTEAHHİT</p>
            <div className="border-t border-black pt-3">
              <p className="font-semibold text-sm truncate">{formData.muteahhit}</p>
              <p className="text-xs text-gray-500 mt-1 print:hidden">(İmza)</p>
            </div>
          </div>
          
          <div className="text-center w-5/12 flex flex-col justify-between h-32">
            <p className="font-bold uppercase tracking-wider text-sm">ARSA SAHİBİ</p>
            <div className="border-t border-black pt-3">
              <p className="font-semibold text-sm truncate">{formData.arsaSahibi}</p>
              <p className="text-xs text-gray-500 mt-1 print:hidden">(İmza)</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}