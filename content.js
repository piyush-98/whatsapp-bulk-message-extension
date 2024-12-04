(async function () {
  // Function to inject WPPConnect library
  function injectWPP() {
    return new Promise((resolve, reject) => {
      if (document.getElementById("wppconnect-script")) {
        console.log("WPPConnect library is already loaded!");
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.id = "wppconnect-script";
      script.src = chrome.runtime.getURL("libs/wppconnect-wa.js");
      script.onload = () => {
        console.log("WPPConnect library loaded successfully!");
        resolve();
      };
      script.onerror = (err) => {
        console.error("Failed to load WPPConnect library:", err);
        reject(err);
      };
      document.head.appendChild(script);
    });
  }

  // Function to inject UI script
  function injectUi() {
    return new Promise((resolve, reject) => {
      if (document.getElementById("ui-script")) {
        console.log("UI script is already loaded!");
        resolve();
        return;
      }

      const uiScript = document.createElement("script");
      uiScript.id = "ui-script";
      uiScript.src = chrome.runtime.getURL("libs/createUi.js");
      uiScript.onload = () => {
        console.log("UI script loaded successfully!");
        resolve();
      };
      uiScript.onerror = (err) => {
        console.error("Failed to load UI script:", err);
        reject(err);
      };
      document.head.appendChild(uiScript);
    });
  }

  // Function to inject CSS
  function injectCSS() {
    return new Promise((resolve, reject) => {
      if (document.getElementById("injected-css")) {
        console.log("Injected CSS is already loaded!");
        resolve();
        return;
      }

      const cssLink = document.createElement("link");
      cssLink.id = "injected-css";
      cssLink.rel = "stylesheet";
      cssLink.href = chrome.runtime.getURL("libs/assets/injected-zCWQQICs.css");
      cssLink.onload = () => {
        console.log("Injected CSS loaded successfully!");
        resolve();
      };
      cssLink.onerror = (err) => {
        console.error("Failed to load injected CSS:", err);
        reject(err);
      };
      document.head.appendChild(cssLink);
    });
  }

  // Initialize WPP after loading the library
  async function initializeWPP() {
    try {
      await injectWPP();
      await injectCSS();
      await injectUi();
    } catch (err) {
      console.error("Error initializing WPP:", err);
    }
  }

  // Start the process
  initializeWPP();

  // Listen for the event from the injected script
  window.addEventListener("getPhoneNumber", (event) => {
    console.log("Received data for getPhoneNumber:", event.detail);
    console.log("Authenticate user", event.detail.number);
  });

  // Listen for messages from the extension
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "populate_numbers") {
      console.log("Message received in content script");
      window.dispatchEvent(
        new CustomEvent("populatedNumberOnUi", {
          detail: { numbers: message.numbers },
        })
      );
      sendResponse({ status: "success" });
    }
    // Return true to indicate that the response is asynchronous
    return true;
  });
})();
