import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Sidebar from './components/Sidebar';
import DocumentPreview from './components/DocumentPreview';
import Header from './components/Header';
import { ContractData, ContractDataSchema } from './types';
import { generateWordDocument } from './utils/wordGenerator';

export default function App() {
  const formMethods = useForm<ContractData>({
    resolver: zodResolver(ContractDataSchema),
    defaultValues: {
      contractors: [{ id: '1', name: 'Ahmet Yılmaz İnşaat Ltd. Şti.', idNumber: '1234567890', isProxy: false }],
      landowners: [{ id: '2', name: 'Mehmet Kaya', idNumber: '11111111111', isProxy: false }],
      adres: 'İstanbul İli, Kadıköy İlçesi, Erenköy Mahallesi, 1024 Ada, 15 Parsel',
      oran: '%50 Müteahhit - %50 Arsa Sahibi',
      tarih: new Date().toLocaleDateString('tr-TR')
    },
    mode: "onChange"
  });

  const { watch, getValues } = formMethods;
  const formData = watch(); // Formdaki değişiklikleri anlık izler

  const handleDownloadWord = () => {
    generateWordDocument(getValues());
  };

  return (
    <div className="h-screen flex flex-col bg-slate-200 print:bg-white text-slate-900 font-sans overflow-hidden">
      <Header onDownloadWord={handleDownloadWord} />
      
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Tüm form metodlarını Sidebar'a iletiyoruz */}
        <Sidebar formMethods={formMethods} />
        <DocumentPreview formData={formData as ContractData} />
      </div>
    </div>
  );
}