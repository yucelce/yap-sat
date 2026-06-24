// src/components/DocumentPreview.tsx
import React from 'react';
import { ContractData } from '../types';
import { CONTRACT_TEMPLATES, formatDataForTemplate } from '../utils/templateEngine';
import ClauseBlock from './ClauseBlock';

interface DocumentPreviewProps {
  formData: ContractData;
}

export default function DocumentPreview({ formData }: DocumentPreviewProps) {
  const template = CONTRACT_TEMPLATES.YAP_SAT;
  const isDataValid = formData && formData.contractors && formData.landowners;
  const dataDict = isDataValid ? formatDataForTemplate(formData) : {};

  // Bir değişkene tıklandığında ne olacağı (Şimdilik alert veriyoruz, sonra Sidebar'ı tetikleyeceğiz)
  const handleVariableClick = (key: string) => {
    alert(`"${key}" değişkenine tıkladınız! (Yakında soldaki formda ilgili alana odaklanacak)`);
  };

  return (
    <div className="flex-1 bg-slate-200 py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto flex justify-center print:bg-white print:p-0 print:overflow-visible">
      <div className="w-full max-w-[210mm] min-h-[297mm] bg-white p-16 sm:p-24 shadow-lg border border-slate-300 rounded-none print:shadow-none print:border-none print:p-0 print:max-w-full flex flex-col justify-between font-serif">
        
        <div>
          <div className="border-b-2 border-black pb-4 mb-10 text-center">
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-black leading-snug">
              {template.title}
            </h1>
          </div>

          <div className="space-y-4 text-black">
            {isDataValid && template.articles.map((article, idx) => (
              <ClauseBlock 
                key={idx}
                title={article.title}
                templateContent={article.content}
                dataDict={dataDict}
                onVariableClick={handleVariableClick}
              />
            ))}
          </div>
        </div>

        {/* İmza Blokları (Değişmedi, aynı kalacak) */}
        {/* ... */}
      </div>
    </div>
  );
}