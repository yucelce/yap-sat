// src/components/DocumentPreview.tsx
import React from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { ContractData } from '../types';
import { CONTRACT_TEMPLATES, formatDataForTemplate } from '../utils/templateEngine';
import ClauseBlock from './ClauseBlock';

interface DocumentPreviewProps {
  formData: ContractData;
  setValue: UseFormSetValue<ContractData>;
}

export default function DocumentPreview({ formData, setValue }: DocumentPreviewProps) {
  const template = CONTRACT_TEMPLATES.YAP_SAT;
  const isDataValid = formData && formData.contractors && formData.landowners;
  const dataDict = isDataValid ? formatDataForTemplate(formData) : {};

  const handleVariableClick = (key: string) => {
    alert(`"${key}" değişkenine tıkladınız!`);
  };

  const handleRemoveClause = (clauseId: string, isMandatory: boolean) => {
    if (isMandatory) {
      const isConfirmed = window.confirm(
        "DİKKAT: Bu madde yasal olarak sözleşmenin temelini oluşturmaktadır. Çıkarılması belgenin hukuki geçerliliğini tehlikeye atabilir. Yine de çıkarmak istiyor musunuz?"
      );
      if (!isConfirmed) return;
    }
    
    const currentClauses = formData.selectedClauses || [];
    setValue("selectedClauses", currentClauses.filter(id => id !== clauseId), { shouldDirty: true });
  };

  // YENİ: Özel madde metnini kaydetme fonksiyonu
  const handleSaveContent = (clauseId: string, newContent: string) => {
    setValue(`customArticles.${clauseId}`, newContent, { shouldDirty: true });
  };

  // YENİ: Özel madde metnini silip varsayılana dönme fonksiyonu
  const handleResetContent = (clauseId: string) => {
    const updatedCustom = { ...formData.customArticles };
    delete updatedCustom[clauseId];
    setValue("customArticles", updatedCustom, { shouldDirty: true });
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
            {isDataValid && template.articles
              .filter(article => (formData.selectedClauses || []).includes(article.id))
              .map((article) => {
                // Eğer bu madde için özelleştirilmiş bir metin varsa onu kullan, yoksa orijinal şablonu kullan
                const hasCustomContent = !!formData.customArticles?.[article.id];
                const activeTemplateContent = formData.customArticles?.[article.id] || article.content;

                return (
                  <ClauseBlock 
                    key={article.id}
                    title={article.title}
                    templateContent={activeTemplateContent}
                    dataDict={dataDict}
                    onVariableClick={handleVariableClick}
                    onRemove={() => handleRemoveClause(article.id, article.isMandatory || false)}
                    onContentSave={(newContent) => handleSaveContent(article.id, newContent)}
                    onReset={() => handleResetContent(article.id)}
                    isModified={hasCustomContent}
                  />
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}