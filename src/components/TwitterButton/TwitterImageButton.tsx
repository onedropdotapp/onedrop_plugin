import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useLaunch } from "../../hooks/useLaunch";
import { LoginPrompt } from "./LoginPrompt";
import { LaunchConfirm } from "./LaunchConfirm";
import { ErrorToast } from "./ErrorToast";
import { STORAGE_KEYS } from "../../utils/constants";
import { getUser } from "../../services/apiService";
import type { UserResponse } from "../../types";
import { LoginButton } from "~features/login-button";
import { RocketButton } from "./RocketButton";
import { autoReply } from "~services/twitterService";
import FinishConfirm from "./FinishConfirm";

export const TwitterImageButton: React.FC = () => {
  // Get authentication related states and methods
  const {
    isLoading: authLoading,
    setIsLoading: setAuthLoading,
    isLoggedIn,
    showLoginPrompt,
    setShowLoginPrompt,
    goToLogin
  } = useAuth();

  // Get launch related states and methods
  const {
    isLoading: launchLoading,
    showLaunchConfirm,
    setShowLaunchConfirm,
    launchInfo,
    setLaunchInfo,
    handleButtonClick,
    handleLaunch,
    error,
    setError,
    responseMessage,
    showFinishConfirm,
    setShowFinishConfirm,
    launchFinish,
    setLaunchFinish
  } = useLaunch();

  // User information state
  const [userInfo, setUserInfo] = useState<UserResponse | undefined>(undefined);

  // Check values in chrome.storage.local
  useEffect(() => {
    const checkStorageValues = async () => {
      const result = await chrome.storage.local.get([
        STORAGE_KEYS.TOKEN_ADDRESS,
        STORAGE_KEYS.TOKEN_DESCRIPTION
      ]);
      
      if (result[STORAGE_KEYS.TOKEN_ADDRESS] && result[STORAGE_KEYS.TOKEN_DESCRIPTION]) {
        setShowFinishConfirm(true);
        setLaunchFinish({
          tokenAddress: result[STORAGE_KEYS.TOKEN_ADDRESS],
          tokenDescription: result[STORAGE_KEYS.TOKEN_DESCRIPTION]
        });

        // Delete values from chrome.storage.local
        chrome.storage.local.remove([STORAGE_KEYS.TOKEN_ADDRESS, STORAGE_KEYS.TOKEN_DESCRIPTION]);
      }
    };

    checkStorageValues();
  }, []);

  // Get user information when launch confirmation window opens
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (showLaunchConfirm && isLoggedIn) {
        let retryCount = 0;
        const maxRetries = 3;
        
        while (retryCount < maxRetries) {
          try {
            const response = await getUser();
            setUserInfo(response);
            chrome.storage.local.set({[STORAGE_KEYS.USER_INFO]: response});
            return; // Successfully got data, exit loop
          } catch (error) {
            retryCount++;
            console.error(`Failed to get user information (attempt ${retryCount}/${maxRetries}):`, error);
            
            if (retryCount === maxRetries) {
              setError("Please try again");
              setShowLaunchConfirm(false); // Close launch window
              break;
            }
            
            // Wait one second before retrying
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }
    };

    fetchUserInfo();
  }, [showLaunchConfirm, isLoggedIn]);

  // Combine loading states
  const isLoading = authLoading || launchLoading;

  // Click handler
  const onClick = async () => {
    setAuthLoading(true);
    try {
      await handleButtonClick(isLoggedIn, setShowLoginPrompt);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <>
      {/* button */}
      <RocketButton onClick={onClick} isLoading={isLoading} showLoginPrompt={!isLoggedIn} />

      {/* Login prompt popup */}
      <LoginPrompt 
        showLoginPrompt={showLoginPrompt} 
        setShowLoginPrompt={setShowLoginPrompt}
        goToLogin={goToLogin}
      />

      <LoginButton showLoginPrompt={!isLoggedIn} />
      
      {/* Launch confirmation window */}
      <LaunchConfirm
        showLaunchConfirm={showLaunchConfirm}
        setShowLaunchConfirm={setShowLaunchConfirm}
        userInfo={userInfo}
        launchInfo={launchInfo}
        setLaunchInfo={setLaunchInfo}
        handleLaunch={handleLaunch}
        isLoading={isLoading}
        responseMessage={responseMessage}
      />

      {/* Error toast */}
      <ErrorToast error={error} setError={setError} />

      {/* Finish confirm */}
      <FinishConfirm
        showFinishConfirm={showFinishConfirm}
        setShowFinishConfirm={setShowFinishConfirm}
        launchFinish={launchFinish}
        onClose={() => setShowFinishConfirm(false)}
      />

      {/* Simulated reply button */}
      {/* <button onClick={async () => {
        const replyText = `Ca : test - pumpfun url : https://pump.fun/coin/test`;
        // Execute automatic reply
        await autoReply(replyText);
      }}>Simulated reply</button> */}


      {/* Simulate Complete Button */}
      {/* <button onClick={async () => {
        try {
          // Create reply content
          const replyText = `Good luck!`;
          // Execute auto reply
          await autoReply(replyText, "ca", "123");
          
        } catch (error) {
          console.error('Error in simulation:', error);
        }
      }}>Simulation completed</button> */}
    </>
  );
}; 