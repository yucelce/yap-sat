// src/components/ClauseBlock.tsx dosyasını tamamen şu kodla değiştirin:
import React, { useState } from 'react';
import { Edit2, Check, X, Trash2 } from 'lucide-react';
import { parseTemplateToReact } from '../utils/templateEngine';

interface ClauseBlockProps {
  title: string;
  templateContent: string;
  dataDict: Record<string, string>;
  onVariableClick: (key: string) => void;
  onContentSave?: (newContent: string) => void;
  onRemove?: () => void; // Silme fonksiyonu prop'u
}

export default function ClauseBlock({ title, templateContent, dataDict, onVariableClick, onContentSave, onRemove }: ClauseBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(templateContent);

  if (isEditing) {
    return (
      <div className="relative border border-zinc-300 rounded-lg p-5 bg-white my-4 shadow-md print:hidden transition-all">
         <h3 className="font-semibold text-lg mb-3 text-zinc-900">{title}</h3>
         <textarea
           className="w-full p-4 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-400 min-h-[140px] text-[15px] leading-loose text-zinc-800 bg-zinc-50 resize-y"
           value={tempContent}
           onChange={(e) => setTempContent(e.target.value)}
           placeholder="Sözleşme maddesini düzenleyin..."
         />
         <div className="flex justify-end gap-3 mt-4">
           <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 rounded-md flex items-center gap-1.5 text-sm font-medium transition-colors">
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
    );
  }

  return (
    <div className="relative group p-4 -mx-4 rounded-lg hover:bg-zinc-50/80 border border-transparent hover:border-zinc-200 transition-all my-1 print:p-0 print:m-0 print:border-none print:hover:bg-transparent">
       <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 print:hidden">
         <button
           onClick={() => setIsEditing(true)}
           className="p-2 bg-white border border-zinc-200 rounded-md shadow-sm text-zinc-400 hover:text-zinc-900 transition-colors"
           title="Maddeyi Düzenle"
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
          {parseTemplateToReact(tempContent, dataDict, onVariableClick)}
       </div>
    </div>
  );
}