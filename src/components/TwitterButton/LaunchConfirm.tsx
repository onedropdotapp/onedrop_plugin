import React, { useState } from "react";
import type { LaunchInfo, UserResponse } from "../../types";

const randomEmoji = Math.random().toString(36).substring(2, 36);
const DEFAULT_IMAGE = "https://api.dicebear.com/7.x/fun-emoji/svg?seed=" + randomEmoji;

interface LaunchConfirmProps {
  showLaunchConfirm: boolean;
  setShowLaunchConfirm: (show: boolean) => void;
  launchInfo: LaunchInfo;
  setLaunchInfo: React.Dispatch<React.SetStateAction<LaunchInfo>>;
  handleLaunch: () => void;
  isLoading: boolean;
  userInfo?: UserResponse;
  responseMessage: string;
}

export const LaunchConfirm: React.FC<LaunchConfirmProps> = ({
  showLaunchConfirm,
  setShowLaunchConfirm,
  launchInfo,
  setLaunchInfo,
  handleLaunch,
  isLoading,
  userInfo,
  responseMessage
}) => {
  if (!showLaunchConfirm) return null;

  // Calculate the total required amount
  const requiredAmount = userInfo ? userInfo.data.settings.amount + 0.025 : 0;
  // Determine if balance is insufficient
  const hasInsufficientBalance = userInfo && userInfo.data.balance.sol < requiredAmount;
  // Determine if button should be disabled
  const isButtonDisabled = isLoading || !userInfo || hasInsufficientBalance;

  // If imageUrl is empty, set default image
  if (launchInfo.imageUrl === ""){
    setLaunchInfo({...launchInfo, imageUrl: DEFAULT_IMAGE});
  }

  // If loading, show waiting window
  if (isLoading) {
    return (
      <div className="plasmo-fixed plasmo-inset-0 plasmo-bg-black plasmo-bg-opacity-50 plasmo-flex plasmo-items-center plasmo-justify-center plasmo-z-50">
        <div className="plasmo-bg-white plasmo-rounded-lg plasmo-p-8 plasmo-max-w-md plasmo-w-full plasmo-text-center">
          <div className="plasmo-animate-spin plasmo-h-12 plasmo-w-12 plasmo-border-4 plasmo-border-blue-500 plasmo-border-t-transparent plasmo-rounded-full plasmo-mx-auto plasmo-mb-4"></div>
          <h3 className="plasmo-text-xl plasmo-font-bold plasmo-mb-2">Processing...</h3>
          <p className="plasmo-text-gray-600">{responseMessage || "Drop to pump.fun, please wait..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="plasmo-fixed plasmo-inset-0 plasmo-bg-black plasmo-bg-opacity-50 plasmo-flex plasmo-items-center plasmo-justify-center plasmo-z-50 ">
      <div className="plasmo-bg-white plasmo-rounded-lg plasmo-p-6 plasmo-max-w-4xl plasmo-w-full plasmo-relative plasmo-flex plasmo-gap-6 plasmo-max-w-6xl plasmo-mx-auto">
        {/* Left: User Information */}
        <div className="plasmo-w-1/3 plasmo-border-r plasmo-pr-6">
          <h3 className="plasmo-text-lg plasmo-font-bold plasmo-mb-4 gradient-text">User Information</h3>
          
          {userInfo ? (
            <div className="plasmo-space-y-6 plasmo-bg-gray-50 plasmo-p-4 plasmo-rounded-lg">
              <div className="plasmo-bg-white plasmo-p-3 plasmo-rounded-md plasmo-shadow-sm">
                <h4 className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-500 plasmo-mb-1">Deployer Wallet Address</h4>
                <p className="plasmo-text-sm plasmo-break-all plasmo-font-mono plasmo-bg-gray-50 plasmo-p-2 plasmo-rounded">
                  {userInfo.data.wallet.accounts[0].address}
                </p>
              </div>
              
              <div className="plasmo-bg-white plasmo-p-3 plasmo-rounded-md plasmo-shadow-sm">
                <h4 className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-500 plasmo-mb-1">Deployer SOL Balance</h4>
                <p className="plasmo-text-xl plasmo-font-bold gradient-text plasmo-flex plasmo-items-center plasmo-gap-2">
                  <span>{userInfo.data.balance.sol.toFixed(6)}</span>
                  <span className="plasmo-text-sm plasmo-font-normal">SOL</span>
                </p>
              </div>
              
              <div className="plasmo-bg-white plasmo-p-3 plasmo-rounded-md plasmo-shadow-sm">
                <h4 className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-500 plasmo-mb-2">Default Settings</h4>
                <div className="plasmo-space-y-2">
                  <div className="plasmo-flex plasmo-justify-between plasmo-items-center">
                    <span className="plasmo-text-sm">Buy Amount:</span>
                    <span className="plasmo-text-sm plasmo-font-semibold">{userInfo.data.settings.amount} SOL</span>
                  </div>
                  <div className="plasmo-flex plasmo-justify-between plasmo-items-center">
                    <span className="plasmo-text-sm">Auto Tweet:</span>
                    <span className="plasmo-text-sm plasmo-font-semibold">{userInfo.data.settings.autoTweet ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              <div className="plasmo-bg-white plasmo-p-3 plasmo-rounded-md plasmo-shadow-sm">
                <h4 className="plasmo-text-sm plasmo-font-medium plasmo-text-gray-500 plasmo-mb-2">Cost</h4>
                <div className="plasmo-space-y-2">
                  <div className="plasmo-flex plasmo-justify-between plasmo-items-center">
                    <span className="plasmo-text-sm">Buy Amount:</span>
                    <span className="plasmo-text-sm plasmo-font-semibold">{userInfo.data.settings.amount} SOL</span>
                  </div>
                  <div className="plasmo-flex plasmo-justify-between plasmo-items-center">
                    <span className="plasmo-text-sm">Using Pump.fun cost:</span>
                    <span className="plasmo-text-sm plasmo-font-semibold">0.025 SOL</span>
                  </div>
                  {/* <div className="plasmo-flex plasmo-justify-between plasmo-items-center">
                    <span className="plasmo-text-sm">Platform Fee:</span>
                    <span className="plasmo-text-sm plasmo-font-semibold plasmo-line-through">0.001 SOL</span>
                  </div> */}
                  <div className="plasmo-flex plasmo-justify-between plasmo-items-center plasmo-border-t plasmo-pt-2">
                    <span className="plasmo-text-sm plasmo-font-medium">Estimated Cost:</span>
                    <span className="plasmo-text-sm plasmo-font-bold gradient-text">
                      ≈{(userInfo.data.settings.amount + 0.025).toFixed(6)} SOL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="plasmo-text-sm plasmo-text-gray-500 plasmo-text-center plasmo-py-4">Loading user information...</div>
          )}
        </div>

        {/* Right: Launch Information */}
        <div className="plasmo-flex-1">
          <button 
            onClick={() => setShowLaunchConfirm(false)}
            className="plasmo-absolute plasmo-top-2 plasmo-right-2 plasmo-text-gray-400 hover:plasmo-text-gray-600"
          >
            ✕
          </button>
          
          <h2 className="plasmo-text-xl plasmo-font-bold plasmo-mb-4">Launch Confirmation</h2>
          
          <div className="plasmo-mb-4">
            <label className="plasmo-block plasmo-text-sm plasmo-font-medium plasmo-mb-1">Name</label>
            <input 
              type="text" 
              value={launchInfo.name} 
              onChange={(e) => setLaunchInfo({...launchInfo, name: e.target.value})}
              className="plasmo-w-full plasmo-px-3 plasmo-py-2 plasmo-border plasmo-rounded-md"
              placeholder="Enter name"
            />
          </div>
          
          <div className="plasmo-mb-4">
            <label className="plasmo-block plasmo-text-sm plasmo-font-medium plasmo-mb-1">Ticker</label>
            <input 
              type="text" 
              value={launchInfo.ticket} 
              onChange={(e) => setLaunchInfo({...launchInfo, ticket: e.target.value})}
              className="plasmo-w-full plasmo-px-3 plasmo-py-2 plasmo-border plasmo-rounded-md"
              placeholder="Enter Ticker"
            />
          </div>
          
          <div className="plasmo-mb-6">
            <label className="plasmo-block plasmo-text-sm plasmo-font-medium plasmo-mb-1">Description</label>
            <textarea 
              value={launchInfo.description} 
              onChange={(e) => setLaunchInfo({...launchInfo, description: e.target.value})}
              className="plasmo-w-full plasmo-px-3 plasmo-py-2 plasmo-border plasmo-rounded-md plasmo-h-20"
              placeholder="Enter description"
            />
          </div>

          <div className="plasmo-mb-6">
            <label className="plasmo-block plasmo-text-sm plasmo-font-medium plasmo-mb-1">Image</label>
            <img src={launchInfo.imageUrl || DEFAULT_IMAGE} alt="Launch Image" className="plasmo-w-full plasmo-h-40 plasmo-object-cover plasmo-rounded-md" />
          </div>
          
          <div className="plasmo-flex plasmo-gap-2">
            <button
              onClick={() => setShowLaunchConfirm(false)}
              className="plasmo-flex-1 plasmo-border plasmo-border-gray-300 plasmo-text-gray-700 plasmo-py-2 plasmo-rounded-lg hover:plasmo-bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleLaunch}
              disabled={isButtonDisabled}
              className="plasmo-flex-1 plasmo-bg-blue-500 hover:plasmo-bg-blue-600 plasmo-text-white plasmo-py-2 plasmo-rounded-lg disabled:plasmo-opacity-50 disabled:plasmo-cursor-not-allowed gradient-button"
            >
              {isLoading ? "Processing..." : 
               hasInsufficientBalance ? "Insufficient Balance" : "Launch 🚀"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 