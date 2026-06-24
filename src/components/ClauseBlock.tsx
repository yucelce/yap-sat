import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { parseTemplateToReact } from '../utils/templateEngine';

interface ClauseBlockProps {
  title: string;
  templateContent: string;
  dataDict: Record<string, string>;
  onVariableClick: (key: string) => void;
  onContentSave?: (newContent: string) => void; // Backend'e bağlanınca kullanacağız
}

export default function ClauseBlock({ title, templateContent, dataDict, onVariableClick, onContentSave }: ClauseBlockProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(templateContent);

  // Edit Modu
  if (isEditing) {
    return (
      <div className="relative border-2 border-blue-500 rounded-md p-4 bg-blue-50 my-4 shadow-sm print:hidden">
         <h3 className="font-bold text-lg mb-2 text-blue-900">{title}</h3>
         <textarea
           className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] text-[15px] leading-loose"
           value={tempContent}
           onChange={(e) => setTempContent(e.target.value)}
           placeholder="Sözleşme maddesini düzenleyin..."
         />
         <div className="flex justify-end gap-2 mt-3">
           <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded flex items-center gap-1 text-sm font-semibold transition-colors">
             <X size={16}/> İptal
           </button>
           <button 
             onClick={() => {
               if(onContentSave) onContentSave(tempContent);
               setIsEditing(false);
             }} 
             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-1 text-sm font-semibold shadow-sm transition-colors"
           >
             <Check size={16}/> Kaydet
           </button>
         </div>
      </div>
    );
  }

  // Okuma (Hover) Modu
  return (
    <div className="relative group p-4 -mx-4 rounded-md hover:bg-slate-50 hover:ring-2 hover:ring-blue-300 transition-all my-2 print:p-0 print:m-0 print:ring-0 print:hover:bg-transparent">
       <button
         onClick={() => setIsEditing(true)}
         className="absolute top-3 right-3 p-2 bg-white border border-slate-200 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-blue-600 print:hidden z-10"
         title="Maddeyi Düzenle"
       >
         <Edit2 size={16} />
       </button>
       <h3 className="font-bold text-lg mb-2">{title}</h3>
       <div className="leading-loose text-justify text-[15px]">
          {/* Regex ile ayrıştırılmış etkileşimli metni basıyoruz */}
          {parseTemplateToReact(tempContent, dataDict, onVariableClick)}
       </div>
    </div>
  );
}