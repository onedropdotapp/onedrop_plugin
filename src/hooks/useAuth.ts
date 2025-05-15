import { useState, useEffect } from "react";
import { isDevelopment, STORAGE_KEYS, USER_INFO, MESSAGE_TYPES, API_ENDPOINTS } from "../utils/constants";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Detect login status
  useEffect(() => {
    chrome.storage.local.get([STORAGE_KEYS.IS_LOGGED_IN], (result) => {
      setIsLoggedIn(!!result[STORAGE_KEYS.IS_LOGGED_IN]);
      
      // If using the plugin for the first time (not logged in), show login prompt
      if (!result[STORAGE_KEYS.IS_LOGGED_IN]) {
        setShowLoginPrompt(true);
      }
    });
  }, []);

  // Monitor chrome.storage.local.get("oneclick_auth_token"), if there is a value then login is successful, if empty then user is not logged in
  useEffect(() => {
    const checkAuthToken = () => {
      chrome.storage.local.get([STORAGE_KEYS.AUTH_TOKEN], (result) => {
        const hasToken = !!result[STORAGE_KEYS.AUTH_TOKEN];
        setIsLoggedIn(hasToken);
        setShowLoginPrompt(!hasToken);
        
        // If there is a token, ensure login status is also correctly set
        if (hasToken) {
          chrome.storage.local.set({
            [STORAGE_KEYS.IS_LOGGED_IN]: true
          });
        }else{
          chrome.storage.local.set({
            [STORAGE_KEYS.IS_LOGGED_IN]: false
          });
        }
      });
    };

    // Initial check
    checkAuthToken();

    // Monitor storage changes
    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (STORAGE_KEYS.AUTH_TOKEN in changes) {
        checkAuthToken();
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  // Simulate login state toggle (for development mode only)
  const toggleLoginState = () => {
    const newLoginState = !isLoggedIn;
    chrome.storage.local.set({
      [STORAGE_KEYS.IS_LOGGED_IN]: newLoginState,
      [STORAGE_KEYS.USER_INFO]: newLoginState ? USER_INFO.DEFAULT_DEV_USER : null
    });
    setIsLoggedIn(newLoginState);
    setShowLoginPrompt(!newLoginState);
  };

  // Redirect to login page
  const goToLogin = () => {
    console.log("goToLogin function called");
    
    // Determine which login page URL to use
    const loginPageUrl = isDevelopment ? API_ENDPOINTS.LOGIN_PAGE : API_ENDPOINTS.LOGIN_PAGE;
    
    try {
      console.log("Attempting to open login page via message passing");
      // Use message passing to background script
      chrome.runtime.sendMessage(
        { 
          type: MESSAGE_TYPES.OPEN_LOGIN_PAGE,
          isDevelopment: isDevelopment // Add development environment flag
        },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Failed to send message:", chrome.runtime.lastError.message);
          } else if (response && response.success) {
            console.log("Successfully requested to open login page");
          }
        }
      );
    } catch (error) {
      console.error("Exception occurred sending message:", error);
      // Backup method: try using window.open
      try {
        window.open(loginPageUrl, '_blank');
      } catch (err) {
        console.error("Backup method also failed:", err);
      }
    }
  };

  return {
    isLoading,
    setIsLoading,
    isLoggedIn,
    showLoginPrompt,
    setShowLoginPrompt,
    toggleLoginState,
    goToLogin
  };
}; 