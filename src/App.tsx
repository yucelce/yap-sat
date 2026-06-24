import { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    muteahhit: "Firma/Kişi Adı",
    arsaSahibi: "Arsa Sahibi Adı",
    adres: "Mahalle, Ada, Parsel",
    oran: "%50 Müteahhit - %50 Arsa Sahibi",
    tarih: new Date().toLocaleDateString('tr-TR')
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Gelişmiş, ekranda şık duran ama yazdırırken normal metin gibi görünen bileşen
  const InlineInput = ({ name, value }: { name: string, value: string }) => (
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      className="mx-1 border-b border-dashed border-gray-400 bg-indigo-50/50 px-1 text-indigo-800 font-semibold focus:outline-none focus:border-solid focus:border-indigo-500 focus:bg-indigo-100 transition-all inline-block print:border-none print:bg-transparent print:text-black print:p-0 print:font-bold print:m-0"
      style={{ width: `${Math.max(value.length * 8.5, 80)}px` }}
    />
  );

  return (
    <div className="min-h-screen bg-neutral-200 py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:py-0 print:px-0 flex justify-center">

      {/* Gerçekçi A4 Kağıt Görünümü */}
      <div className="w-full max-w-[210mm] min-h-[297mm] bg-white p-10 sm:p-16 shadow-2xl ring-1 ring-gray-900/5 print:shadow-none print:ring-0 print:p-0">
        
        {/* Başlık */}
        <div className="border-b-2 border-gray-800 pb-6 mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center uppercase tracking-wider text-gray-900">
            Gayrimenkul Satış Vaadi ve Arsa Payı Karşılığı İnşaat Sözleşmesi
          </h1>
        </div>

        {/* Sözleşme İçeriği */}
        <div className="space-y-8 text-gray-800 leading-relaxed text-justify text-lg print:text-base">
          <p>
            <strong className="text-xl print:text-lg">1. TARAFLAR</strong><br/>
            İşbu sözleşme, bir tarafta mukim
            <InlineInput name="muteahhit" value={formData.muteahhit} />
            (bundan böyle <strong>"MÜTEAHHİT"</strong> olarak anılacaktır) ile diğer tarafta mukim
            <InlineInput name="arsaSahibi" value={formData.arsaSahibi} />
            (bundan böyle <strong>"ARSA SAHİBİ"</strong> olarak anılacaktır) arasında aşağıda belirtilen şartlar dahilinde tanzim ve imza edilmiştir.
          </p>

          <p>
            <strong className="text-xl print:text-lg">2. SÖZLEŞMENİN KONUSU</strong><br/>
            İşbu sözleşmenin konusu; ARSA SAHİBİ'ne ait olan, tapunun
            <InlineInput name="adres" value={formData.adres} />
            adresinde kayıtlı taşınmaz üzerine MÜTEAHHİT tarafından imar durumuna, tasdikli projesine ve teknik şartnameye uygun olarak inşaat yapılması ve yapılacak bağımsız bölümlerin
            <InlineInput name="oran" value={formData.oran} />
            oranında paylaşılmasıdır.
          </p>

          <p>
            <strong className="text-xl print:text-lg">3. SÖZLEŞME TARİHİ VE İMZA</strong><br/>
            İşbu sözleşme
            <InlineInput name="tarih" value={formData.tarih} />
            tarihinde taraflarca okunarak kendi serbest iradeleriyle imza altına alınmıştır.
          </p>
        </div>

        {/* İmza Alanları */}
        <div className="mt-32 flex justify-between px-4 sm:px-12 print:mt-24">
          <div className="text-center w-5/12">
            <p className="font-bold text-gray-900 mb-16">MÜTEAHHİT</p>
            <p className="border-t border-gray-400 pt-3 px-2 truncate font-medium">{formData.muteahhit}</p>
          </div>
          <div className="text-center w-5/12">
            <p className="font-bold text-gray-900 mb-16">ARSA SAHİBİ</p>
            <p className="border-t border-gray-400 pt-3 px-2 truncate font-medium">{formData.arsaSahibi}</p>
          </div>
        </div>

        {/* Yazdır Butonu */}
        <div className="mt-24 text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-indigo-600 text-white px-8 py-3.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg font-semibold inline-flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Sözleşmeyi Yazdır / PDF İndir
          </button>
        </div>

      </div>
    </div>
  );
}