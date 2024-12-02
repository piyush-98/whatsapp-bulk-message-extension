(async function () {
  // Function to inject WPPConnect library
  function injectWPP() {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
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
  function injectUi() {
    return new Promise((resolve, reject) => {
      const uiScript = document.createElement("script");
      uiScript.src = chrome.runtime.getURL("libs/createUi.js");
      uiScript.onload = () => {
        console.log("createUi loaded successfully!");
        resolve();
      };
      document.head.appendChild(uiScript);
    });
  }

  // Initialize WPP after loading the library
  async function initializeWPP() {
    try {
      await injectWPP();
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
    console.log("authenticate user", event.detail.number);
  });
})();
