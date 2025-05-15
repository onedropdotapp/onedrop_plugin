import React from "react"

export const RocketButton = (
    { showLoginPrompt, onClick, isLoading }: { showLoginPrompt: boolean, onClick: () => void, isLoading: boolean }
) => {

    
  if (showLoginPrompt) {
    return null;
  }

  return (<button
        onClick={onClick}
        disabled={isLoading}
        type="button"
        className="plasmo-flex plasmo-items-center plasmo-px-4 plasmo-py-2 plasmo-text-sm plasmo-font-medium
          plasmo-rounded-full plasmo-border-none
          plasmo-bg-gradient-to-r plasmo-from-blue-500 plasmo-to-blue-600
          hover:plasmo-from-blue-600 hover:plasmo-to-blue-700
          plasmo-shadow-[0_0_15px_rgba(183,63,232,0.5)]
          hover:plasmo-shadow-[0_0_20px_rgba(183,63,232,0.6)]
          plasmo-text-white plasmo-transition-all
          disabled:plasmo-opacity-50 disabled:plasmo-cursor-not-allowed
          disabled:hover:plasmo-shadow-none disabled:hover:plasmo-scale-100
          plasmo-animate-fade-in  gradient-button">
        <span className="plasmo-flex plasmo-items-center plasmo-gap-2">
          {isLoading ? (
            <>
              <div className="plasmo-w-4 plasmo-h-4 plasmo-border-2 plasmo-border-white plasmo-border-t-transparent plasmo-rounded-full plasmo-animate-spin" />
              AI analysising ...
            </>
          ) : (
            <>
              <span className="plasmo-animate-shake">
                OneDrop
              </span>
              <span className="plasmo-animate-bounce">
                🚀
              </span>
            </>
          )}
        </span>
      </button>
  )
} 