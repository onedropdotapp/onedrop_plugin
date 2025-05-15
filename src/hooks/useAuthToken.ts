import { useState, useEffect } from "react";
import { STORAGE_KEYS } from "~utils/constants";

export const useAuthToken = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get saved auth token
  useEffect(() => {
    const getAuthToken = async () => {
      setIsLoading(true);
      try {
        chrome.storage.local.get([STORAGE_KEYS.AUTH_TOKEN], (result) => {
          const token = result[STORAGE_KEYS.AUTH_TOKEN];
          setAuthToken(token || null);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Failed to get auth token:", error);
        setAuthToken(null);
        setIsLoading(false);
      }
    };

    getAuthToken();

    // Listen for storage changes
    const handleStorageChange = (changes, area) => {
      if (area === "local" && STORAGE_KEYS.AUTH_TOKEN in changes) {
        setAuthToken(changes[STORAGE_KEYS.AUTH_TOKEN].newValue || null);
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  // Save auth token to storage
  const saveAuthToken = (token: string) => {
    if (!token) return;

    chrome.storage.local.set({
      [STORAGE_KEYS.AUTH_TOKEN]: token
    }, () => {
      console.log("Auth token updated");
      setAuthToken(token);
    });
  };

  // Clear auth token
  const clearAuthToken = () => {
    chrome.storage.local.remove([STORAGE_KEYS.AUTH_TOKEN], () => {
      console.log("Auth token cleared");
      setAuthToken(null);
    });
  };

  return {
    authToken,
    isLoading,
    saveAuthToken,
    clearAuthToken
  };
}; 