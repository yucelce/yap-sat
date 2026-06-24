import React from 'react';
import { FileText, Download } from 'lucide-react';

interface HeaderProps {
  onDownloadWord: () => void;
}

export default function Header({ onDownloadWord }: HeaderProps) {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white text-zinc-900 border-b border-zinc-200 print:hidden">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center text-white shadow-sm">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-zinc-900">Yap-Sat Sözleşme Yöneticisi</h1>
          <p className="text-sm text-zinc-500 font-medium">Akıllı Doküman Üreticisi</p>
        </div>
      </div>
      
      <button
        onClick={onDownloadWord}
        className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-all shadow-sm focus:ring-2 focus:ring-zinc-400 focus:outline-none"
      >
        <Download className="w-4 h-4" />
        Sözleşmeyi İndir
      </button>
    </header>
  );
}