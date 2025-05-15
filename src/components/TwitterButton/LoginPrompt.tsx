import React from "react";

interface LoginPromptProps {
  showLoginPrompt: boolean;
  setShowLoginPrompt: (show: boolean) => void;
  goToLogin: () => void;
}

export const LoginPrompt: React.FC<LoginPromptProps> = ({
  showLoginPrompt,
  setShowLoginPrompt,
  goToLogin
}) => {
  if (!showLoginPrompt) return null;

  return (
    <div className="plasmo-fixed plasmo-inset-0 plasmo-bg-black plasmo-bg-opacity-50 plasmo-flex plasmo-items-center plasmo-justify-center plasmo-z-50">
      <div className="plasmo-bg-white plasmo-rounded-lg plasmo-p-6 plasmo-max-w-md plasmo-w-full plasmo-relative">
        <button 
          onClick={() => setShowLoginPrompt(false)}
          className="plasmo-absolute plasmo-top-2 plasmo-right-2 plasmo-text-gray-400 hover:plasmo-text-gray-600"
        >
          ✕
        </button>
        
        <h2 className="plasmo-text-xl plasmo-font-bold plasmo-mb-4 plasmo-text-center">OneDrop chrome extension</h2>
        <p className="plasmo-text-center plasmo-mb-4">Please login to OneDrop website to use the full function</p>
        
        <div className="plasmo-flex plasmo-gap-2">
          <button
            onClick={() => setShowLoginPrompt(false)}
            className="plasmo-flex-1 plasmo-border plasmo-border-gray-300 plasmo-text-gray-700 plasmo-py-2 plasmo-rounded-lg hover:plasmo-bg-gray-50"
          >
            Later
          </button>
          <button
            onClick={() => {
              goToLogin();
            }}
            className="plasmo-flex-1 plasmo-bg-blue-500 hover:plasmo-bg-blue-600 plasmo-text-white plasmo-py-2 plasmo-rounded-lg gradient-button"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}; 