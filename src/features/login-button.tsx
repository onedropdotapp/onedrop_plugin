import React from "react"

export const LoginButton = ({ showLoginPrompt }: { showLoginPrompt: boolean }) => {
  const handleLogin = () => {
    const isDevelopment = process.env.NODE_ENV === "development";
    const loginUrl = isDevelopment ? "http://localhost:3000/platform/dashboard" : "https://www.onedrop.app/platform/dashboard";
    window.open(loginUrl, "_blank")
  }

  if (!showLoginPrompt) {
    return null;
  }

  return (
    <button
      onClick={handleLogin}
      className="plasmo-bg-blue-500 plasmo-text-white plasmo-px-4 plasmo-py-2 plasmo-rounded-lg plasmo-hover:plasmo-bg-blue-600 plasmo-transition-colors  gradient-button">
      Login in OneDrop
    </button>
  )
} 