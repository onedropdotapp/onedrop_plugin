import { API_ENDPOINTS, STORAGE_KEYS, MESSAGE_TYPES, isDevelopment } from "../utils/constants";
import type { LaunchInfo, TweetAnalysis, UserResponse, LaunchResponse } from "../types";

// Send tweet data to AI analysis API
export const sendTweetToAI = async (tweetData: TweetAnalysis): Promise<any> => {
  try {
    // if (isDevelopment) {
    //   // In development mode, return mock data
    //   return Promise.resolve({ success: true, mockData: true });
    // }
    
    const authToken = await new Promise<string>((resolve) => {
      chrome.storage.local.get([STORAGE_KEYS.AUTH_TOKEN], (result) => {
        resolve(result[STORAGE_KEYS.AUTH_TOKEN] || "");
      });
    });
    if(!authToken){
      throw new Error("No authorization token found.");
    }
    
    const response = await fetch(API_ENDPOINTS.AI_REPORTER, {
      method: 'POST',
      headers: {
        Authorization: "Bearer " + authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tweetData)
    });

    console.log(response)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to send data to AI analysis API:", error);
    throw error;
  }
};

// Get user's basic information API
export const getUser = async (): Promise<UserResponse> => {
  try {
    const authToken = await new Promise<string>((resolve) => {
      chrome.storage.local.get([STORAGE_KEYS.AUTH_TOKEN], (result) => {
        resolve(result[STORAGE_KEYS.AUTH_TOKEN] || "");
      });
    });
    
    if (!authToken) {
      throw new Error("No authorization token found.");
    }

    const response = await fetch(API_ENDPOINTS.USER, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to get user information:", error);
    throw error;
  }
};

// Handle launch operation
export const handleLaunch = async (
  tweetId: string, 
  launchInfo: LaunchInfo, 
  setShowLaunchConfirm: (value: boolean) => void,
  setError?: (error: string | null) => void
): Promise<LaunchResponse> => {
  try {
    const authToken = await new Promise<string>((resolve) => {
      chrome.storage.local.get([STORAGE_KEYS.AUTH_TOKEN], (result) => {
        resolve(result[STORAGE_KEYS.AUTH_TOKEN] || "");
      });
    });
    
    setShowLaunchConfirm(true);
    if(!authToken){
      setShowLaunchConfirm(false);
      setError("No authorization token found.");
      return {
        success: false,
        error: "No authorization token found."
      };
    }
    
    // Validate required fields
    if (!launchInfo.name || !launchInfo.ticket || !launchInfo.description || !launchInfo.imageUrl) {
      if (setError) {
        setError("Please fill in the name and Ticker information");
      } else {
        alert("Please fill in the name and Ticker information");
      }
      setShowLaunchConfirm(false);
      return {
        success: false,
        error: "Please fill in the name and Ticker information"
      };
    }
    
    // Request to create token API / API_ENDPOINTS.CREATE_TOKEN
    // API_ENDPOINTS.CREATE_TOKEN
    const tokenResponse = await fetch(API_ENDPOINTS.CREATE_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        "name": launchInfo.name,
        "ticket": launchInfo.ticket,
        "description": launchInfo.description,
        "imageUrl": launchInfo.imageUrl,
        "createOn": launchInfo.createOn,
        "twitter": launchInfo.twitter,
        "telegram": launchInfo.telegram,
        "website": launchInfo.website
      })
    });

    if (!tokenResponse.ok) {
      throw new Error(`HTTP error! status: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    
    if (!tokenData.success) {
      throw new Error(tokenData.message || "Token creation failed");
    }

    return {
      success: true,
      tokenAddress: tokenData.tokenAddress,
      url: tokenData.url,
      txUrl: tokenData.txUrl,
      txResult: tokenData.txResult
    };
  } catch (error) {
    console.error("Launch operation failed:", error);
    if (setError) {
      setError(typeof error === 'string' ? error : error instanceof Error ? error.message : "Token creation failed");
    } else {
      alert("Token creation failed: " + (typeof error === 'string' ? error : error instanceof Error ? error.message : "Unknown error"));
    }
    return {
      success: false,
      error: typeof error === 'string' ? error : error instanceof Error ? error.message : "Unknown error"
    };
  }
}; 