// User information type
export interface UserInfo {
  name: string;
  id: string;
}

export interface LaunchFinishResponse {
  tokenAddress?: string;
  tokenDescription?: string;
}

// Tweet analysis data type
export interface TweetAnalysis {
  tweet_url: string;
  tweet: string;
  twitter_name: string;
  tweet_id: string;
  image_url: string;
  create_time: string;
  twitter_url: string;
  telegram_url: string;
  website_url: string;
}

// Launch information type
export interface LaunchInfo {
  name: string;
  ticket: string;
  description: string;
  imageUrl: string;
  createOn?: string;
  twitter?: string;
  telegram?: string;
  website?: string;
}

// Message type
export interface OpenTokenPageMessage {
  type: string;
  tweetId: string;
  launchInfo?: LaunchInfo;
}

export interface LoginSuccessMessage {
  type: string;
  userInfo: UserInfo;
}

export interface WalletAccount {
  address: string;
  addressFormat: string;
  curve: string;
  path: string;
  pathFormat: string;
  publicKey: string;
  walletId: string;
}

export interface Wallet {
  accounts: WalletAccount[];
  userAddress: string;
}

export interface UserSettings {
  amount: number;
  autoTweet: boolean;
  [key: string]: any;
}

export interface Balance {
  lamports: number;
  sol: number;
}

export interface UserResponse {
  success: boolean;
  data: {
    wallet: Wallet;
    settings: UserSettings;
    balance: Balance;
  };
}

// Launch response type
export interface LaunchResponse {
  success: boolean;
  tokenAddress?: string;
  url?: string;
  txUrl?: string;
  txResult?: string;
  error?: string;
} 