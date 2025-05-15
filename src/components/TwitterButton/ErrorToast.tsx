import React, { useEffect } from "react";

interface ErrorToastProps {
  error: string | null;
  setError: (error: string | null) => void;
}

export const ErrorToast: React.FC<ErrorToastProps> = ({ error, setError }) => {
  // If there is no error, don't display the component
  if (!error) return null;
  
  // Auto-close functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [error, setError]);

  return (
    <div className="plasmo-fixed plasmo-bottom-4 plasmo-right-4 plasmo-bg-red-100 plasmo-border-l-4 plasmo-border-red-500 plasmo-text-red-700 plasmo-p-4 plasmo-rounded plasmo-shadow-md plasmo-z-50 plasmo-max-w-md">
      <div className="plasmo-flex">
        <div className="plasmo-py-1">
          <svg className="plasmo-h-6 plasmo-w-6 plasmo-text-red-500 plasmo-mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="plasmo-font-bold">Error</p>
          <p className="plasmo-text-sm">{error}</p>
        </div>
        <button 
          onClick={() => setError(null)}
          className="plasmo-ml-auto plasmo-text-red-500 hover:plasmo-text-red-700"
        >
          <svg className="plasmo-h-5 plasmo-w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}; 