import React from 'react';
import { ContractData } from '../types';
import { CONTRACT_TEMPLATES, formatDataForTemplate, renderTemplateString } from '../utils/templateEngine';

interface DocumentPreviewProps {
  formData: ContractData;
}

export default function DocumentPreview({ formData }: DocumentPreviewProps) {
  // Şablon ve verileri hazırlıyoruz
  const template = CONTRACT_TEMPLATES.YAP_SAT;
  // Eğer form henüz init olmadıysa hataları engellemek için basic check
  const isDataValid = formData && formData.contractors && formData.landowners;
  const dataDict = isDataValid ? formatDataForTemplate(formData) : {};

  // Formdan çekilen metni JSX'te Highlighted olarak göstermek için özel parser (Basit Regex)
  const renderHighlightedText = (text: string) => {
    // Sözleşme metninde verilerimizi bold gösterebiliriz ama biz şimdilik normal text basıyoruz.
    // Eğer değişkenlerin yerini bilerek css uygulamak istersek şablonlama motorunu zenginleştirebiliriz.
    // Şimdilik sadece render edilmiş metni basıyoruz.
    return text;
  };

  return (
    <div className="flex-1 bg-slate-200 py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto flex justify-center print:bg-white print:p-0 print:overflow-visible">
      <div className="w-full max-w-[210mm] min-h-[297mm] bg-white p-16 sm:p-24 shadow-lg border border-slate-300 rounded-none print:shadow-none print:border-none print:p-0 print:max-w-full flex flex-col justify-between font-serif">
        
        <div>
          {/* Dinamik Başlık */}
          <div className="border-b-2 border-black pb-4 mb-10 text-center">
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-black leading-snug">
              {template.title}
            </h1>
          </div>

          {/* Dinamik Şablon Maddeleri */}
          <div className="space-y-8 text-black leading-loose text-justify text-[15px]">
            {isDataValid && template.articles.map((article, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-lg mb-2">{article.title}</h3>
                <p>{renderHighlightedText(renderTemplateString(article.content, dataDict))}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dinamik İmza Blokları */}
        {isDataValid && (
          <div className="mt-24 flex justify-between px-4 sm:px-8 mb-6">
            {/* Müteahhitler */}
            <div className="text-center w-5/12 flex flex-col justify-between">
              <p className="font-bold uppercase tracking-wider text-sm mb-6">MÜTEAHHİT(LER)</p>
              <div className="space-y-12">
                {formData.contractors.map((c, i) => (
                  <div key={i} className="border-t border-black pt-2">
                    <p className="font-semibold text-sm leading-tight">{c.name || '...................'}</p>
                    <p className="text-xs text-gray-500 mt-1 print:hidden">(İmza)</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Arsa Sahipleri */}
            <div className="text-center w-5/12 flex flex-col justify-between">
              <p className="font-bold uppercase tracking-wider text-sm mb-6">ARSA SAHİBİ (VEYA VEKİLLERİ)</p>
              <div className="space-y-12">
                {formData.landowners.map((l, i) => (
                  <div key={i} className="border-t border-black pt-2">
                    <p className="font-semibold text-sm leading-tight">{l.name || '...................'}</p>
                    {l.isProxy && <p className="text-xs font-semibold">Vekaleten: {l.proxyName}</p>}
                    <p className="text-xs text-gray-500 mt-1 print:hidden">(İmza)</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}