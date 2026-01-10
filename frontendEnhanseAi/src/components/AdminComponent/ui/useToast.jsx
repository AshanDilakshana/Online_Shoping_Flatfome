import React, { useCallback, useState } from 'react';
import { Toast } from './Toast';

let showToastGlobal = null;

export function useToast() {
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type) => {
    setToast({
      message,
      type
    });
    setTimeout(() => setToast(null), 3000);
  }, []);
  // Expose globally for convenience
  if (!showToastGlobal) {
    showToastGlobal = showToast;
  }
  const ToastContainer = toast ? <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} /> : null;
  return {
    showToast,
    ToastContainer
  };
}
// Export a global function that can be called from anywhere
export function showToast(message, type) {
  if (showToastGlobal) {
    showToastGlobal(message, type);
  }
}
