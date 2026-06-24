import { useState } from 'react';

export default function App() {
  // Sözleşmedeki varsayılan değerleri (state) burada tutuyoruz.
  // Kullanıcı bunları doğrudan sözleşme üzerinden değiştirebilecek.
  const [formData, setFormData] = useState({
    muteahhit: "Firma/Kişi Adı",
    arsaSahibi: "Arsa Sahibi Adı",
    adres: "Mahalle, Ada, Parsel",
    oran: "%50 Müteahhit - %50 Arsa Sahibi",
    tarih: new Date().toLocaleDateString('tr-TR')
  });

  // Girdiler değiştikçe state'i güncelleyen fonksiyon
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Metin içine gömülü, şık görünümlü input bileşeni
  const InlineInput = ({ name, value }: { name: string, value: string }) => (
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      className="mx-1 border-b-2 border-blue-300 bg-blue-50 px-1 text-blue-800 font-semibold focus:outline-none focus:border-blue-600 focus:bg-blue-100 transition-colors inline-block"
      style={{ width: `${Math.max(value.length * 8.5, 80)}px` }}
    />
  );

  return (
    <div className="min-h-screen bg-gray-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-10 sm:p-16 shadow-xl rounded-sm border-t-8 border-gray-800">
        <h1 className="text-2xl font-bold text-center mb-10 uppercase tracking-wide border-b pb-4">
          Gayrimenkul Satış Vaadi ve Arsa Payı Karşılığı İnşaat Sözleşmesi
        </h1>

        <div className="space-y-6 text-gray-800 leading-relaxed text-justify text-lg">
          <p>
            <strong>1. TARAFLAR</strong><br/>
            İşbu sözleşme, bir tarafta mukim 
            <InlineInput name="muteahhit" value={formData.muteahhit} /> 
            (bundan böyle "MÜTEAHHİT" olarak anılacaktır) ile diğer tarafta mukim 
            <InlineInput name="arsaSahibi" value={formData.arsaSahibi} /> 
            (bundan böyle "ARSA SAHİBİ" olarak anılacaktır) arasında aşağıda belirtilen şartlar dahilinde tanzim ve imza edilmiştir.
          </p>

          <p>
            <strong>2. SÖZLEŞMENİN KONUSU</strong><br/>
            İşbu sözleşmenin konusu; ARSA SAHİBİ'ne ait olan, tapunun 
            <InlineInput name="adres" value={formData.adres} /> 
            adresinde kayıtlı taşınmaz üzerine MÜTEAHHİT tarafından imar durumuna, tasdikli projesine ve teknik şartnameye uygun olarak inşaat yapılması ve yapılacak bağımsız bölümlerin 
            <InlineInput name="oran" value={formData.oran} /> 
            oranında paylaşılmasıdır.
          </p>

          <p>
            <strong>3. SÖZLEŞME TARİHİ VE İMZA</strong><br/>
            İşbu sözleşme 
            <InlineInput name="tarih" value={formData.tarih} /> 
            tarihinde taraflarca okunarak kendi serbest iradeleriyle imza altına alınmıştır.
          </p>
        </div>

        {/* İmza Alanları */}
        <div className="mt-20 flex justify-between px-10">
          <div className="text-center w-1/3">
            <p className="font-bold mb-12">MÜTEAHHİT</p>
            <p className="border-t border-gray-400 pt-2 px-2 truncate">{formData.muteahhit}</p>
          </div>
          <div className="text-center w-1/3">
            <p className="font-bold mb-12">ARSA SAHİBİ</p>
            <p className="border-t border-gray-400 pt-2 px-2 truncate">{formData.arsaSahibi}</p>
          </div>
        </div>

        {/* Yazdır Butonu (Sadece ekranda görünür, kağıda basılmaz) */}
        <div className="mt-16 text-center print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-gray-800 text-white px-8 py-3 rounded-md hover:bg-gray-700 transition-colors shadow-md font-semibold"
          >
            Sözleşmeyi Yazdır / PDF Olarak Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}