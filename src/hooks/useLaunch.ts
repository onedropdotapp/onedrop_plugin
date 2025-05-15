import { useState } from "react";
import { getTweetData, autoReply } from "../services/twitterService";
import { sendTweetToAI, handleLaunch as apiHandleLaunch } from "../services/apiService";
import type { TweetAnalysis, LaunchInfo, UserSettings, LaunchFinishResponse } from "../types";
import { STORAGE_KEYS } from "../utils/constants";

export const useLaunch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showLaunchConfirm, setShowLaunchConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [launchFinish, setLaunchFinish] = useState<LaunchFinishResponse | null>(null);
  const [showFinishConfirm, setShowFinishConfirm] = useState<boolean>(false);
  const [tweetAnalysis, setTweetAnalysis] = useState<TweetAnalysis>({
    tweet_url: "",
    tweet: "",
    twitter_name: "",
    tweet_id: "",
    create_time: "",
    twitter_url: "",
    telegram_url: "",
    website_url: "",
    image_url: ""
  });
  const [launchInfo, setLaunchInfo] = useState<LaunchInfo>({
    name: "",
    ticket: "",
    description: "",
    imageUrl: "",
    twitter: "",
    telegram: "",
    website: ""
  });

  // Handle button click - OneDrop button
  const handleButtonClick = async (isLoggedIn: boolean, setShowLoginPrompt: (show: boolean) => void) => {
    // If user is not logged in, prompt for login first
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      
      // Get tweet content and image
      const tweetData = getTweetData();
      if (!tweetData) {
        setIsLoading(false);
        setShowLaunchConfirm(false);
        return;
      }
      console.log(tweetData);
      
      // setTweetAnalysis(tweetData);
      
      // Send data to AI analysis API
      try {
        const response = await sendTweetToAI({
          tweet_url: tweetData.tweet_url,
          tweet: tweetData.tweet,
          twitter_name: tweetData.twitter_name,
          tweet_id: tweetData.tweet_id,
          create_time: tweetData.create_time,
          image_url: tweetData.image_url,
          twitter_url: tweetData.tweet_url,
          telegram_url: tweetData.telegram_url,
          website_url: tweetData.website_url
        });
        
        // Save AI analysis results
        setTweetAnalysis(response);
        
        // console.log(response.data)
        // console.log(response.data.coin_info)
        
        // Set default values for launch
        setLaunchInfo({
          name: response.data.coin_info['name'],
          ticket: response.data.coin_info['ticket'],
          description: response.data.coin_info['description'],
          imageUrl:tweetData.image_url,
          twitter: tweetData.tweet_url,
          telegram: tweetData.telegram_url,
          website: tweetData.website_url
        });
        
        // Show launch confirmation window
        setShowLaunchConfirm(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to send data to AI analysis API:", error);
        setError(typeof error === 'string' ? error : error instanceof Error ? error.message : "Failed to send data to AI analysis API");
        // Show launch confirmation window
        setShowLaunchConfirm(false);
        setIsLoading(false);
      }

      setIsLoading(false);
      
    } catch (error) {
      console.error("Error processing tweet data:", error);
      setError(typeof error === 'string' ? error : error instanceof Error ? error.message : "Error processing tweet data");
      // Show launch confirmation window
      setShowLaunchConfirm(false);
      setIsLoading(false);
    }
  };

  // Handle launch operation - Launch button
  const handleLaunch = async () => {
    try {
      setIsLoading(true);
      setResponseMessage("The launch process is being initialized...");
      
      // apiHandleLaunch
      let tokenData = await apiHandleLaunch(
        tweetAnalysis.tweet_id,
        launchInfo,
        setShowLaunchConfirm,
        (error) => {
          setError(error);
          setResponseMessage(error || "");
        }
      );
      if (tokenData.success) {
        
        const userInfoData = await chrome.storage.local.get(STORAGE_KEYS.USER_INFO as string);
        const autoTweet = userInfoData.userInfo.data.settings.autoTweet;

        if (autoTweet) {
          setResponseMessage("The system is executing automatic reply to contract address...Waiting for 10 seconds...");
          // Construct reply content
          const replyText = `Ca : ${tokenData.tokenAddress} - pumpfun url : https://pump.fun/coin/${tokenData.tokenAddress}`;
          // Execute auto reply
          await autoReply(replyText, tokenData.tokenAddress, launchInfo.description || "No description provided");
          
          // Wait for 2 seconds
          await new Promise((r) => setTimeout(r, 2000));

          // Setup completion confirmation window
          // setIsLoading(true);
          // setShowFinishConfirm(true);
          // setLaunchFinish({
          //   tokenAddress: tokenData.tokenAddress,
          //   tokenDescription: launchInfo.description || "No description provided"
          // });
          setIsLoading(false);
        }
        
        // await new Promise(resolve => setTimeout(resolve, 3000));
      } else {
        console.log(tokenData);
        setResponseMessage(tokenData.error || "create token failed");
      }
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : error instanceof Error ? error.message : "The launch process failed";
      setError(errorMessage);
      setResponseMessage(errorMessage);
    }
  };

  return {
    isLoading,
    setIsLoading,
    showLaunchConfirm,
    setShowLaunchConfirm,
    tweetAnalysis,
    launchInfo,
    setLaunchInfo,
    handleButtonClick,
    handleLaunch,
    error,
    setError,
    responseMessage,
    setResponseMessage,
    showFinishConfirm,
    setShowFinishConfirm,
    launchFinish,
    setLaunchFinish
  };
}; 