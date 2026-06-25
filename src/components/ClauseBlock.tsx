// src/components/ClauseBlock.tsx
import React, { useState, useEffect } from 'react';
import { Edit2, Check, X, Trash2, RotateCcw } from 'lucide-react';
import { parseTemplateToReact } from '../utils/templateEngine';

interface ClauseBlockProps {
  title: string;
  templateContent: string;
  dataDict: Record<string, string>;
  onVariableClick: (key: string) => void;
  onContentSave?: (newContent: string) => void;
  onRemove?: () => void;
  onReset?: () => void;    // YENİ: Varsayılana dönme fonksiyonu
  isModified?: boolean;    // YENİ: Maddenin değiştirilip değiştirilmediği bilgisi
}

export default function ClauseBlock({ title, templateContent, dataDict, onVariableClick, onContentSave, onRemove, onReset, isModified }: ClauseBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(templateContent);

  // Dışarıdan templateContent değişirse (örneğin varsayılana dönüldüğünde) local state'i güncelle
  useEffect(() => {
    setTempContent(templateContent);
  }, [templateContent]);

  if (isEditing) {
    return (
      <div className="relative border border-zinc-300 rounded-lg p-5 bg-white my-4 shadow-md print:hidden transition-all">
         <h3 className="font-semibold text-lg mb-1 text-zinc-900">{title}</h3>
         <p className="text-xs text-zinc-500 mb-3 font-sans">
           💡 Dinamik kalmasını istediğiniz alanları değiştirmeyiniz. Örn: <code className="bg-zinc-100 px-1 rounded text-amber-700">{"{{oran}}"}</code> veya <code className="bg-zinc-100 px-1 rounded text-amber-700">{"{{taraflar}}"}</code>
         </p>
         <textarea
           className="w-full p-4 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400 min-h-[140px] text-[15px] leading-loose text-zinc-800 bg-zinc-50 resize-y font-serif"
           value={tempContent}
           onChange={(e) => setTempContent(e.target.value)}
           placeholder="Sözleşme maddesini düzenleyin..."
         />
         <div className="flex justify-between items-center mt-4">
           <div>
             {isModified && onReset && (
               <button 
                 onClick={() => {
                   if(window.confirm("Bu maddeye yaptığınız özel değişiklikler silinecektir. Emin misiniz?")) {
                     onReset();
                     setIsEditing(false);
                   }
                 }} 
                 className="px-3 py-2 text-amber-700 hover:bg-amber-50 rounded-md flex items-center gap-1.5 text-xs font-medium transition-colors"
               >
                 <RotateCcw size={14}/> Varsayılana Dön
               </button>
             )}
           </div>
           <div className="flex gap-3">
             <button onClick={() => { setTempContent(templateContent); setIsEditing(false); }} className="px-4 py-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 rounded-md flex items-center gap-1.5 text-sm font-medium transition-colors">
               <X size={16}/> İptal
             </button>
             <button 
               onClick={() => {
                 if(onContentSave) onContentSave(tempContent);
                 setIsEditing(false);
               }} 
               className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2 rounded-md flex items-center gap-1.5 text-sm font-medium shadow-sm transition-colors"
             >
               <Check size={16}/> Kaydet
             </button>
           </div>
         </div>
      </div>
    );
  }

  return (
    <div className={`relative group p-4 -mx-4 rounded-lg border border-transparent hover:border-zinc-200 transition-all my-1 print:p-0 print:m-0 print:border-none print:hover:bg-transparent ${isModified ? 'bg-amber-50/30 hover:bg-amber-50/50 border-dashed border-amber-200' : 'hover:bg-zinc-50/80'}`}>
       <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 print:hidden">
         {isModified && (
           <span className="text-[10px] bg-amber-100 text-amber-800 font-sans font-medium px-2 py-1 rounded flex items-center shadow-sm">Düzenlendi</span>
         )}
         <button
           onClick={() => setIsEditing(true)}
           className="p-2 bg-white border border-zinc-200 rounded-md shadow-sm text-zinc-400 hover:text-zinc-900 transition-colors"
           title="Maddeyi Düzenle / Özelleştir"
         >
           <Edit2 size={16} />
         </button>
         {onRemove && (
           <button
             onClick={onRemove}
             className="p-2 bg-white border border-red-200 rounded-md shadow-sm text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
             title="Sözleşmeden Çıkar"
           >
             <Trash2 size={16} />
           </button>
         )}
       </div>
       <h3 className="font-semibold text-lg mb-2 text-zinc-900">{title}</h3>
       <div className="leading-loose text-justify text-[15px] text-zinc-800">
          {parseTemplateToReact(templateContent, dataDict, onVariableClick)}
       </div>
    </div>
  );
}