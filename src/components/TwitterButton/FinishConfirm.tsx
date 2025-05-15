import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import type { LaunchFinishResponse } from '../../types';
interface FinishConfirmProps {
  showFinishConfirm: boolean;
  setShowFinishConfirm: (show: boolean) => void;
  launchFinish: LaunchFinishResponse;
  onClose: () => void;
  title?: string;
  message?: string;
}

const FinishConfirm: React.FC<FinishConfirmProps> = ({
  showFinishConfirm,
  setShowFinishConfirm,
  launchFinish,
  onClose,
  title = 'Launch Success',
  message = `Your operation is complete, token address: ${launchFinish}, pumpfun url: <a href="https://pump.fun/coin/${launchFinish}" target="_blank">https://pump.fun/coin/${launchFinish}</a>`
}) => {
  const [copied, setCopied] = useState(false);
  const [descriptionCopied, setDescriptionCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(launchFinish.tokenAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDescriptionCopy = async () => {
    try {
      await navigator.clipboard.writeText(launchFinish.tokenDescription);
      setDescriptionCopied(true);
      setTimeout(() => setDescriptionCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy description: ', err);
    }
  };

  useEffect(() => {
    if (showFinishConfirm) {
      // Trigger confetti effect
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          zIndex: 0,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          zIndex: 0,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
    }
  }, [showFinishConfirm]);

  useEffect(() => {
    if (showFinishConfirm) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Wait for fade-out animation to complete
      return () => clearTimeout(timer);
    }
  }, [showFinishConfirm]);

  if (!isVisible && !showFinishConfirm) return null;

  return (
    <div 
      className={`plasmo-fixed plasmo-inset-0 plasmo-bg-black plasmo-bg-opacity-50 plasmo-flex plasmo-items-center plasmo-justify-center plasmo-z-50 plasmo-transition-opacity plasmo-duration-300 ${showFinishConfirm ? 'plasmo-opacity-100' : 'plasmo-opacity-0'}`} 
      style={{ zIndex: 9999 }}
    >
      <div className={`plasmo-bg-white plasmo-rounded-2xl plasmo-p-8 plasmo-max-w-2xl plasmo-w-full plasmo-relative plasmo-shadow-2xl plasmo-mx-4 plasmo-transition-all plasmo-duration-300 ${showFinishConfirm ? 'plasmo-transform plasmo-scale-100 plasmo-opacity-100' : 'plasmo-transform plasmo-scale-95 plasmo-opacity-0'}`}>
        <button 
          onClick={() => {
            setShowFinishConfirm(false);
            onClose();
          }}
          className="plasmo-absolute plasmo-top-4 plasmo-right-4 plasmo-text-gray-400 hover:plasmo-text-gray-600 plasmo-transition-colors plasmo-p-2 plasmo-rounded-full hover:plasmo-bg-gray-100"
        >
          ✕
        </button>
        
        <div className="plasmo-text-center plasmo-space-y-6">
          <div className="plasmo-relative plasmo-w-24 plasmo-h-24 plasmo-mx-auto">
            <div className="plasmo-absolute plasmo-inset-0 plasmo-bg-green-100 plasmo-rounded-full plasmo-animate-ping plasmo-opacity-75"></div>
            <div className="plasmo-relative plasmo-flex plasmo-items-center plasmo-justify-center plasmo-w-24 plasmo-h-24 plasmo-bg-gradient-to-br plasmo-from-green-400 plasmo-to-green-600 plasmo-rounded-full plasmo-shadow-lg">
              <svg 
                className="plasmo-w-14 plasmo-h-14 plasmo-text-white plasmo-animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="3" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <div className="plasmo-space-y-2">
            <h2 className="plasmo-text-3xl plasmo-font-bold plasmo-text-gray-800">{title}</h2>
            <p className="plasmo-text-gray-500 plasmo-text-sm">🎉 Congratulations </p>
          </div>
          
          <div className="plasmo-bg-gray-50 plasmo-rounded-xl plasmo-p-6 plasmo-space-y-4">
            <div className="plasmo-space-y-2">
              <p className="plasmo-text-gray-600 plasmo-text-sm plasmo-font-medium plasmo-text-left">Token Address</p>
              <div className="plasmo-relative">
                <div 
                  onClick={handleCopy}
                  className="plasmo-text-gray-800 plasmo-font-mono plasmo-bg-gray-100 plasmo-p-3 plasmo-rounded-lg plasmo-break-all plasmo-text-sm plasmo-cursor-pointer hover:plasmo-bg-gray-200 plasmo-transition-colors plasmo-flex plasmo-items-center plasmo-justify-between"
                >
                  <span>{launchFinish.tokenAddress}</span>
                  <svg 
                    className="plasmo-w-4 plasmo-h-4 plasmo-text-gray-500 hover:plasmo-text-gray-700 plasmo-ml-2 plasmo-flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                </div>
                {copied && (
                  <div className="plasmo-absolute plasmo-top-1/2 plasmo-right-4 plasmo-transform plasmo--translate-y-1/2 plasmo-bg-green-500 plasmo-text-white plasmo-px-2 plasmo-py-1 plasmo-rounded plasmo-text-xs plasmo-animate-fade-in plasmo-flex plasmo-items-center plasmo-space-x-1">
                    <svg 
                      className="plasmo-w-3 plasmo-h-3" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Copied!</span>
                  </div>
                )}
              </div>
            </div>

            <div className="plasmo-space-y-2">
              <p className="plasmo-text-gray-600 plasmo-text-sm plasmo-font-medium  plasmo-text-left">Description</p>
              <div className="plasmo-relative">
                <div 
                  onClick={handleDescriptionCopy}
                  className="plasmo-text-gray-800 plasmo-font-mono plasmo-bg-gray-100 plasmo-p-3 plasmo-rounded-lg plasmo-break-all plasmo-text-sm plasmo-cursor-pointer hover:plasmo-bg-gray-200 plasmo-transition-colors plasmo-flex plasmo-items-center plasmo-justify-between plasmo-min-h-[100px] plasmo-max-h-[200px] plasmo-overflow-y-auto"
                >
                  <span>{launchFinish.tokenDescription}</span>
                  <svg 
                    className="plasmo-w-4 plasmo-h-4 plasmo-text-gray-500 hover:plasmo-text-gray-700 plasmo-ml-2 plasmo-flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                </div>
                {descriptionCopied && (
                  <div className="plasmo-absolute plasmo-top-1/2 plasmo-right-4 plasmo-transform plasmo--translate-y-1/2 plasmo-bg-green-500 plasmo-text-white plasmo-px-2 plasmo-py-1 plasmo-rounded plasmo-text-xs plasmo-animate-fade-in plasmo-flex plasmo-items-center plasmo-space-x-1">
                    <svg 
                      className="plasmo-w-3 plasmo-h-3" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Copied!</span>
                  </div>
                )}
              </div>
            </div>

            <div className="plasmo-space-y-2">
              <p className="plasmo-text-gray-600 plasmo-text-sm plasmo-font-medium plasmo-text-left">PumpFun URL</p>
              <a 
                href={`https://pump.fun/coin/${launchFinish.tokenAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="plasmo-text-blue-500 hover:plasmo-text-blue-600 plasmo-break-all plasmo-inline-block plasmo-text-sm plasmo-bg-blue-50 plasmo-p-3 plasmo-rounded-lg plasmo-w-full"
              >
                https://pump.fun/coin/{launchFinish.tokenAddress}
              </a>
            </div>

            <div className="plasmo-mt-6 plasmo-p-4 plasmo-bg-gradient-to-r plasmo-from-green-50 plasmo-to-emerald-50 plasmo-rounded-xl plasmo-border plasmo-border-green-200 plasmo-shadow-sm plasmo-flex plasmo-items-center plasmo-justify-center plasmo-space-x-3">
              <svg 
                className="plasmo-w-6 plasmo-h-6 plasmo-text-green-500 plasmo-animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
              <p className="plasmo-text-green-600 plasmo-font-semibold plasmo-text-lg">OneDrop point +1</p>
            </div>
          </div>

          <button
            onClick={() => {
              setShowFinishConfirm(false);
              onClose();
            }}
            className="plasmo-bg-gradient-to-r plasmo-from-green-500 plasmo-to-green-600 hover:plasmo-from-green-600 hover:plasmo-to-green-700 plasmo-text-white plasmo-px-8 plasmo-py-3 plasmo-rounded-xl plasmo-transition-all plasmo-shadow-md hover:plasmo-shadow-lg plasmo-font-medium plasmo-text-lg"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishConfirm;
