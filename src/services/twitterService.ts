import { SELECTORS, STORAGE_KEYS } from "../utils/constants";
import type { TweetAnalysis } from "../types";

// Write text in the tweet reply box and click the reply button
export const autoReply = async (text: string, tokenAddress: string, tokenDescription: string): Promise<void> => {
  try {
    // Step 1: Find and click the "Reply" button
    const replyButton = document.querySelector(SELECTORS.REPLY_BUTTON) as HTMLElement;
    if (replyButton) {
      replyButton.click();
    } else {
      alert("Reply button not found");
      return;
    }

    // Step 2: Wait for the popup to load
    await new Promise((r) => setTimeout(r, 1000));

    // Step 3: Enter text
    const textarea = document.querySelector(SELECTORS.TWEET_TEXTAREA) as HTMLElement;
    if (textarea) {
      textarea.focus();

      // Method 1: Use document.execCommand (slightly less compatible)
      document.execCommand("insertText", false, text);

      // If execCommand doesn't work, you can use the method below:
      const inputEvent = new InputEvent("input", {
        bubbles: true,
        cancelable: true,
        inputType: "insertText",
        data: text
      });
      textarea.textContent = text;
      textarea.dispatchEvent(inputEvent);
    } else {
      alert("Input box not found");
    }

    // Step 4: Click the "Tweet" button
    await new Promise((r) => setTimeout(r, 3000));
    const sendBtn = document.querySelector(SELECTORS.TWEET_BUTTON) as HTMLElement;
    if (sendBtn) {
      if (tokenAddress && tokenDescription) {
        // Store in plugin storage for display in popup
        await chrome.storage.local.set({
          [STORAGE_KEYS.TOKEN_ADDRESS]: tokenAddress,
          [STORAGE_KEYS.TOKEN_DESCRIPTION]: tokenDescription
        });
      }
      sendBtn.click();
    } else {
      alert("Send button not found");
    }
  } catch (err) {
    console.error("Send failed:", err);
  }
};

// Get the content and image of the current tweet
export const getTweetData = (): TweetAnalysis | null => {
  try {
    // Get the tweet address
    const tweetUrl = window.location.href;
    // Get tweet content and image
    const tweetContainer = document.querySelector(SELECTORS.TWEET_TEXT)?.closest('article');
    const tweetTextElement = tweetContainer?.querySelector(SELECTORS.TWEET_TEXT);
    const imageElement = tweetContainer?.querySelector(SELECTORS.TWEET_IMAGE);
    
    // Logic for getting image URL
    let imgUrl = "";
    if (imageElement) {
      imgUrl = imageElement.getAttribute('src') || "";
    } else if (tweetContainer) {
      // If no image is found with the specified selector, try to get all images in the container, then select the image with src containing https://pbs.twimg.com/card_img/
      const allImgs = tweetContainer.querySelectorAll('img');
      const img = Array.from(allImgs).find(img => img.getAttribute('src')?.includes('https://pbs.twimg.com/card_img/'));
      imgUrl = img ? (img.getAttribute('src') || "") : "";
    }
    console.log("imgUrl",imgUrl);
    
    console.log(tweetContainer);
    console.log(tweetTextElement, imageElement);
    // Get the tweet_id from the current tweet URL
    const tweetId = window.location.pathname.split('/').pop() || "";

    if (!tweetTextElement || !tweetContainer) {
      console.error("Tweet content not found");
      return null;
    }

    // Get tweet content
    const content = tweetTextElement.textContent || "";
    
    // Get author information - usually somewhere in the article
    let authorName = "";
    let authorHandle = "";
    const authorElements = tweetContainer.querySelectorAll('a[href^="/"]');
    // Usually the first link is to the author's home page
    if (authorElements && authorElements.length > 0) {
      const authorElement = authorElements[0];
      // Get username in "@username" format
      authorHandle = authorElement.getAttribute('href')?.substring(1) || "";
      // Try to get display name
      const nameElement = authorElement.querySelector('span');
      if (nameElement) {
        authorName = nameElement.textContent || "";
      }
    }

    // Get tweet time
    let tweetTime = "";
    const timeElement = tweetContainer.querySelector('time');
    if (timeElement) {
      tweetTime = timeElement.getAttribute('datetime') || "";
      // Can also get the displayed time text
      const displayTime = timeElement.textContent || "";
      tweetTime = displayTime || tweetTime;
    }

    // Get all text content (including replies, retweets, likes, etc.)
    let fullText = "";
    // Remove script and style tags, only get visible text
    const textNodeIterator = document.createNodeIterator(
      tweetContainer,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          // Exclude hidden text nodes
          const parentElement = node.parentElement;
          if (parentElement && (
              parentElement.style.display === 'none' ||
              parentElement.style.visibility === 'hidden'
          )) {
            return NodeFilter.FILTER_REJECT;
          }
          return node.textContent && node.textContent.trim() !== '' 
            ? NodeFilter.FILTER_ACCEPT 
            : NodeFilter.FILTER_REJECT;
        }
      }
    );

    let textNode;
    const textNodes = [];
    while ((textNode = textNodeIterator.nextNode())) {
      textNodes.push(textNode.textContent?.trim());
    }
    fullText = textNodes.join(' ').replace(/\s+/g, ' ').trim();
    
    return {
      tweet_url: tweetUrl,
      tweet: fullText,
      twitter_name: authorName,
      tweet_id: tweetId,
      create_time: tweetTime,
      image_url: imgUrl,
      twitter_url: `https://x.com/${authorHandle}`,
      telegram_url: ``,
      website_url: ``
    };
  } catch (error) {
    console.error("Error getting tweet content:", error);
    return null;
  }
}; 