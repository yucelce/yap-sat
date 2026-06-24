import React from 'react';
import { FileDown, Scale } from 'lucide-react';

interface HeaderProps {
  onDownloadWord: () => void;
}

export default function Header({ onDownloadWord }: HeaderProps) {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-slate-900 text-slate-50 border-b border-slate-800 shadow-md print:hidden">
      <div className="flex items-center gap-4">
        {/* Logo Alanı */}
        <div className="w-10 h-10 bg-slate-100 rounded-sm flex items-center justify-center text-slate-900 shadow-inner">
          <Scale className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white uppercase">Yap-Sat Sözleşme Jeneratörü</h1>
          <p className="text-xs text-slate-400">Profesyonel Hukuki Belge Oluşturucu</p>
        </div>
      </div>
      
      <button
        onClick={onDownloadWord}
        className="flex items-center gap-2 bg-slate-100 hover:bg-white text-slate-900 border border-slate-300 px-5 py-2.5 rounded-sm text-sm font-bold uppercase tracking-wider transition-colors focus:ring-2 focus:ring-slate-500 focus:outline-none"
      >
        <FileDown className="w-5 h-5" />
        Word Olarak İndir (.docx)
      </button>
    </header>
  );
}