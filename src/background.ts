// Import constants
import { STORAGE_KEYS } from "~utils/constants";

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Background received message:", request.type, sender.tab ? `from: ${sender.tab.url}` : "from extension internal")
  
  if (request.type === "OPEN_OPTIONS_PAGE") {
    // Save data to storage
    chrome.storage.local.set({
      tweetContent: request.content,
      tweetImageUrl: request.imageUrl
    }, () => {
      // Open options page
      chrome.runtime.openOptionsPage(() => {
        console.log("Options page opened")
        sendResponse({ success: true })
      })
    })
    
    // Need to return true to indicate will send response asynchronously
    return true
  }
  
  // Handle request to open login page
  if (request.type === "OPEN_LOGIN_PAGE") {
    console.log("Background received request to open login page");
    
    // Choose login page URL based on whether in development environment
    const loginUrl = process.env.PLASMO_PUBLIC_ONECLICK_URL + "/platform/login";
    
    // Open login page
    chrome.tabs.create({
      url: loginUrl
    }, () => {
      if (chrome.runtime.lastError) {
        console.error("Failed to open login page:", chrome.runtime.lastError.message);
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        console.log("Successfully opened login page");
        sendResponse({ success: true });
      }
    });
    
    // Need to return true to indicate will send response asynchronously
    return true;
  }

})

// Check storage on startup
console.log("Background script started");
chrome.storage.local.get(null, (result) => {
  console.log("Current storage contents:", Object.keys(result).join(", "));
  
  // Check if there is an auth token
  if (result.oneclick_auth_token) {
    console.log("Stored auth token:", result.oneclick_auth_token);
  } else {
    console.log("No stored auth token found");
  }
});

// Listen for install events
chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension install/update event:", details.reason);
  
  if (details.reason === "install") {
    console.log("First time installing extension");
    // First time installing plugin, set login status to false
    chrome.storage.local.set({
      isLoggedIn: false
    });

    // Open welcome page
    chrome.tabs.create({
      url: process.env.PLASMO_PUBLIC_ONECLICK_URL + "/"
    });
  } else if (details.reason === "update") {
    console.log("Extension updated to new version");
  }
});