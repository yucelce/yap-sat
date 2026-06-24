import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DocumentPreview from './components/DocumentPreview';
import { ContractData } from './types';

export default function App() {
  // Uygulamanın merkezi (Global) state yönetimi burada yapılıyor
  const [formData, setFormData] = useState<ContractData>({
    muteahhit: "Ahmet Yılmaz İnşaat Ltd. Şti.",
    muteahhitVn: "1234567890",
    arsaSahibi: "Mehmet Kaya",
    arsaSahibiTc: "11111111111",
    adres: "İstanbul İli, Kadıköy İlçesi, Erenköy Mahallesi, 1024 Ada, 15 Parsel",
    oran: "%50 Müteahhit - %50 Arsa Sahibi",
    tarih: new Date().toLocaleDateString('tr-TR')
  });

  // Girdilerden gelen değişiklikleri yakalayan fonksiyon
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100 print:bg-white text-slate-800">
      {/* Sol Panel: Form Girdileri */}
      <Sidebar formData={formData} onChange={handleChange} />
      
      {/* Sağ Panel: Canlı Önizleme */}
      <DocumentPreview formData={formData} />
    </div>
  );
}