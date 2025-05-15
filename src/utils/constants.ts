// Development mode flag
export const isDevelopment = process.env.PLASMO_PUBLIC_ENV === 'development';

// API endpoints
export const API_ENDPOINTS = {
  AI_REPORTER: process.env.PLASMO_PUBLIC_ONECLICK_URL+'/api/tweet-summary',
  DASHABOARD_PAGE: process.env.PLASMO_PUBLIC_ONECLICK_URL+'/platform/dashboard',
  LOGIN_PAGE: process.env.PLASMO_PUBLIC_ONECLICK_URL+'/platform/login',
  USER: process.env.PLASMO_PUBLIC_ONECLICK_URL+'/api/user',
  CREATE_TOKEN: process.env.PLASMO_PUBLIC_ONECLICK_URL+'/api/create-token'
};

// Login and user related constants
export const USER_INFO = {
  DEFAULT_DEV_USER: { name: "Development Test User", id: "dev123" }
};

// Local storage keys
export const STORAGE_KEYS = {
  IS_LOGGED_IN: "isLoggedIn",
  USER_INFO: "userInfo",
  TWEET_ID: "tweet_id",
  LAUNCH_INFO: "launch_info",
  AUTH_TOKEN: "oneclick_auth_token",
  TOKEN_ADDRESS: "token_address",
  TOKEN_DESCRIPTION: "token_description"
};

// Message types
export const MESSAGE_TYPES = {
  OPEN_LOGIN_PAGE: "OPEN_LOGIN_PAGE",
  OPEN_CREATE_TOKEN_PAGE: "OPEN_CREATE_TOKEN_PAGE",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  SAVE_AUTH_TOKEN: "SAVE_AUTH_TOKEN"
};

// Twitter DOM selectors
export const SELECTORS = {
  REPLY_BUTTON: '[data-testid="reply"]',
  TWEET_TEXTAREA: '[data-testid="tweetTextarea_0"]',
  TWEET_BUTTON: '[data-testid="tweetButton"]',
  TWEET_TEXT: '[data-testid="tweetText"]',
  TWEET_IMAGE: 'img[src*="https://pbs.twimg.com/media"]'
}; 