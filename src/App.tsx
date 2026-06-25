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

      // 'adres' yerine şemada istenen 'property' objesi eklendi
      property: {
        il: 'İstanbul',
        ilce: 'Kadıköy',
        mahalleKoy: 'Erenköy',
        pafta: '12',
        ada: '1024',
        parsel: '15',
        yuzolcumu: '1500',
        nitelik: 'Arsa'
      },

      selectedClauses: ["taraflar", "gayrimenkul", "paylasim", "gecikme"],

      // Şemada min(1) zorunluluğu olan unitShares dizisi eklendi
      unitShares: [
        { id: '1', unitNo: '1', block: 'A', floor: '1', type: '3+1', allocatedTo: 'Müteahhit' }
      ],

      // Zod şemasının talep ettiği diğer alanlar eklendi
      selectedSpecPackageId: '',
      customSpecs: [],

      oran: '%50 Müteahhit - %50 Arsa Sahibi',
      tarih: new Date().toLocaleDateString('tr-TR'),

      versionInfo: {
        versionNumber: 1,
        isAddendum: false,
        changeReason: ''
      }
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
        <DocumentPreview formData={formData as ContractData} setValue={formMethods.setValue} />      </div>
    </div>
  );
}