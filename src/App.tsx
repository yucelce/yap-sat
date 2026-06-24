import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User, MapPin, Calendar, Printer, FileText } from 'lucide-react';

type AccordionSection = 'taraflar' | 'konu' | 'tarih';

export default function App() {
  // Sözleşme verileri
  const [formData, setFormData] = useState({
    muteahhit: "Ahmet Yılmaz İnşaat Ltd. Şti.",
    muteahhitVn: "1234567890",
    arsaSahibi: "Mehmet Kaya",
    arsaSahibiTc: "11111111111",
    adres: "İstanbul İli, Kadıköy İlçesi, Erenköy Mahallesi, 1024 Ada, 15 Parsel",
    oran: "%50 Müteahhit - %50 Arsa Sahibi",
    tarih: new Date().toLocaleDateString('tr-TR')
  });

  // Aktif akordeon sekmesini tutan state
  const [activeSection, setActiveSection] = useState<AccordionSection>('taraflar');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSection = (section: AccordionSection) => {
    setActiveSection(activeSection === section ? 'taraflar' : section);
  };

  // Önizlemede değişen alanları vurgulamak için yardımcı bileşen
  const HighlightedText = ({ value }: { value: string }) => (
    <span className="bg-indigo-50 text-indigo-900 px-1.5 py-0.5 rounded font-semibold border-b border-indigo-200 transition-colors print:bg-transparent print:text-black print:p-0 print:border-none print:font-bold">
      {value || ".........."}
    </span>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100 print:bg-white text-slate-800">
      
      {/* SOL PANEL: Girdiler ve Akordeon (Yazdırma esnasında gizlenir) */}
      <div className="w-full md:w-[400px] bg-white border-r border-slate-200 flex flex-col shadow-xl print:hidden h-screen sticky top-0 overflow-y-auto">
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
              <div className="p-4 bg-white space-y-4 border-t border-slate-200 animation-fadeIn">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Müteahhit Firma / Kişi</label>
                  <input
                    type="text"
                    name="muteahhit"
                    value={formData.muteahhit}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Müteahhit Vergi No / TC</label>
                  <input
                    type="text"
                    name="muteahhitVn"
                    value={formData.muteahhitVn}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>
                <div className="border-t border-slate-100 pt-3">
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Arsa Sahibi Adı Soyadı</label>
                  <input
                    type="text"
                    name="arsaSahibi"
                    value={formData.arsaSahibi}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Arsa Sahibi T.C. Kimlik No</label>
                  <input
                    type="text"
                    name="arsaSahibiTc"
                    value={formData.arsaSahibiTc}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* SEKME 2: SÖZLEŞME KONUSU VE ORANLAR */}
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
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Arsa Adresi (Ada/Parsel/Mahalle)</label>
                  <textarea
                    name="adres"
                    value={formData.adres}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Paylaşım Oranı</label>
                  <input
                    type="text"
                    name="oran"
                    value={formData.oran}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* SEKME 3: TARİH VE ONAY */}
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
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Sözleşme İmza Tarihi</label>
                  <input
                    type="text"
                    name="tarih"
                    value={formData.tarih}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Yazdırma Butonu (Sabit Alt Kısım) */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={() => window.print()}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="h-5 w-5" />
            Dokümanı Hazırla / Yazdır
          </button>
        </div>
      </div>

      {/* SAĞ PANEL: Canlı Önizleme (Live Preview) */}
      <div className="flex-1 bg-slate-100 py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto flex justify-center h-screen print:h-auto print:bg-white print:py-0 print:px-0">
        
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
              
              {/* Madde 1 */}
              <div>
                <h3 className="font-bold text-lg text-slate-950 mb-2">1. TARAFLAR</h3>
                <p>
                  İşbu sözleşme, bir tarafta mukim ve Vergi/TC numarası <HighlightedText value={formData.muteahhitVn} /> olan{' '}
                  <HighlightedText value={formData.muteahhit} /> (bundan böyle kısaca <strong>"MÜTEAHHİT"</strong> olarak anılacaktır) ile diğer tarafta mukim ve T.C. Kimlik numarası <HighlightedText value={formData.arsaSahibiTc} /> olan{' '}
                  <HighlightedText value={formData.arsaSahibi} /> (bundan böyle kısaca <strong>"ARSA SAHİBİ"</strong> olarak anılacaktır) arasında aşağıda belirtilen şartlar dahilinde tanzim ve imza edilmiştir.
                </p>
              </div>

              {/* Madde 2 */}
              <div>
                <h3 className="font-bold text-lg text-slate-950 mb-2">2. SÖZLEŞMENİN KONUSU</h3>
                <p>
                  İşbu sözleşmenin konusu; mülkiyeti ARSA SAHİBİ'ne ait olan, tapunun <HighlightedText value={formData.adres} /> adresinde kayıtlı taşınmaz üzerine MÜTEAHHİT tarafından ilgili imar durumuna, tasdikli projesine, imar yönetmeliklerine ve teknik şartnameye tam uygun olarak modern bir inşaat yapılması ve inşa edilecek bağımsız bölümlerin taraflar arasında <HighlightedText value={formData.oran} /> oranında paylaşılması işidir.
                </p>
              </div>

              {/* Madde 3 */}
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

    </div>
  );
}