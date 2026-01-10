import React from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export function Toast({
  message,
  type,
  onClose
}) {
  return <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg animate-fade-in ${type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
      {type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
      <p className="font-medium text-sm">{message}</p>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X size={16} />
      </button>
    </div>;
}
