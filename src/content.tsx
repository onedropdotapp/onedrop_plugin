import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState, useRef } from "react"
import Onedrop from "~components/TwitterButton/Onedrop"

import { LoginButton } from "~features/login-button"
import { TwitterImageButton } from "~features/twitter-image-button"

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*", "https://www.onedrop.app/*", "http://localhost:3000/*"]
}

/**
 * Generates a style element with adjusted CSS to work correctly within a Shadow DOM.
 *
 * Tailwind CSS relies on `rem` units, which are based on the root font size (typically defined on the <html>
 * or <body> element). However, in a Shadow DOM (as used by Plasmo), there is no native root element, so the
 * rem values would reference the actual page's root font size—often leading to sizing inconsistencies.
 *
 * To address this, we:
 * 1. Replace the `:root` selector with `:host(plasmo-csui)` to properly scope the styles within the Shadow DOM.
 * 2. Convert all `rem` units to pixel values using a fixed base font size, ensuring consistent styling
 *    regardless of the host page's font size.
 */
export const getStyle = (): HTMLStyleElement => {
  const baseFontSize = 16

  let updatedCssText = cssText.replaceAll(":root", ":host(plasmo-csui)")
  const remRegex = /([\d.]+)rem/g
  updatedCssText = updatedCssText.replace(remRegex, (match, remValue) => {
    const pixelsValue = parseFloat(remValue) * baseFontSize

    return `${pixelsValue}px`
  })

  const styleElement = document.createElement("style")

  styleElement.textContent = updatedCssText

  return styleElement
}

const isTwitterStatusPage = () => {
  const url = window.location.pathname
  const hostname = window.location.hostname
  console.log("Current URL:", url)
  console.log("Current hostname:", hostname)
  const isStatusPage = /^\/[^/]+\/status\/\d+/.test(url)
  console.log("isStatusPage check result:", isStatusPage)
  return isStatusPage
}

const isOneDropSitePage = () => {
  const hostname = window.location.hostname;
  const port = window.location.port;
  const isOneDrop = hostname === 'localhost' && port === '3000' || hostname === 'www.onedrop.app';
  console.log("isOneDrop check:", { hostname, port, isOneDrop });
  return isOneDrop;
}

const isLoginStatusPage = async () => {
  const result = await chrome.storage.local.get("oneclick_auth_token")
  console.log("Storage check result:", result)
  return result.oneclick_auth_token ? true : false
}

const PlasmoOverlay = () => {
  const [isStatusPage, setIsStatusPage] = useState(false)
  const [isOneDropPage, setIsOneDropPage] = useState(false)
  const [isLoginStatus, setIsLoginStatus] = useState(false)

  const checkLoginStatus = async () => {
    const loginStatus = await isLoginStatusPage()
    console.log("Checking login status:", loginStatus)
    setIsLoginStatus(loginStatus)
  }

  useEffect(() => {
    console.log("PlasmoOverlay mounted")
    const checkStatusPage = async () => {
      const statusPage = isTwitterStatusPage()
      const oneDropPage = isOneDropSitePage()
      
      console.log("Initial status check:", { statusPage, oneDropPage })
      
      setIsStatusPage(statusPage)
      setIsOneDropPage(oneDropPage)
      
      if (oneDropPage) {
        const localstorage = window.localStorage.getItem("oneclick_auth_token")
        console.log("Local storage check:", { localstorage })
        if (localstorage) {
          console.log("Plugin login successful, displaying success introduction")
          await chrome.storage.local.set({
            oneclick_auth_token: localstorage,
            isLoggedIn: true
          })
        } else {
          await chrome.storage.local.remove(["oneclick_auth_token", "isLoggedIn"])
        }
      }
      
      await checkLoginStatus()
    }

    checkStatusPage()

    // Add URL change monitoring
    const handleUrlChange = () => {
      console.log("URL changed, rechecking status")
      checkStatusPage()
    }

    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', handleUrlChange)
    
    // Listen for hashchange events (URL hash changes)
    window.addEventListener('hashchange', handleUrlChange)

    // Create MutationObserver to monitor DOM changes
    const observer = new MutationObserver((mutations) => {
      if (window.location.pathname !== lastPathname.current) {
        lastPathname.current = window.location.pathname
        handleUrlChange()
      }
    })

    // Start observing all document changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Cleanup function
    return () => {
      window.removeEventListener('popstate', handleUrlChange)
      window.removeEventListener('hashchange', handleUrlChange)
      observer.disconnect()
    }
  }, [])

  // Add a ref to store the previous path
  const lastPathname = useRef(window.location.pathname)

  if (isOneDropPage){
    return (<Onedrop />)
  }

  if (!isStatusPage) {
    console.log("isStatusPage", isStatusPage)
    return null
  }

  return (
    <div className="plasmo-z-50 plasmo-flex plasmo-fixed plasmo-top-32 plasmo-right-8 plasmo-flex-col plasmo-gap-2">
      <TwitterImageButton />
    </div>
  )
}

export default PlasmoOverlay
