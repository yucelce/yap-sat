import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DocumentPreview from './components/DocumentPreview';
import Header from './components/Header';
import { ContractData } from './types';
import { generateWordDocument } from './utils/wordGenerator';

export default function App() {
  const [formData, setFormData] = useState<ContractData>({
    muteahhit: "Ahmet Yılmaz İnşaat Ltd. Şti.",
    muteahhitVn: "1234567890",
    arsaSahibi: "Mehmet Kaya",
    arsaSahibiTc: "11111111111",
    adres: "İstanbul İli, Kadıköy İlçesi, Erenköy Mahallesi, 1024 Ada, 15 Parsel",
    oran: "%50 Müteahhit - %50 Arsa Sahibi",
    tarih: new Date().toLocaleDateString('tr-TR')
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownloadWord = () => {
    generateWordDocument(formData);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-200 print:bg-white text-slate-900 font-sans overflow-hidden">
      <Header onDownloadWord={handleDownloadWord} />
      
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <Sidebar formData={formData} onChange={handleChange} />
        <DocumentPreview formData={formData} />
      </div>
    </div>
  );
}