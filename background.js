chrome.runtime.onInstalled.addListener((event) => {
  console.log("installed extension");
  // Automatically open WhatsApp Web when the extension is installed
  chrome.tabs.create({ url: "https://web.whatsapp.com/" });
});

chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    if ("launch_extension" === request.action)
      try {
        const numbers = request.numbers || "";
        chrome.tabs.query({ url: "https://web.whatsapp.com/*" }, (tabs) => {
          if (tabs.length > 0) {
            chrome.tabs.update(tabs[0].id, { active: true }, (tab) => {
              console.log("Tab activated!");
              console.log("firing populate_numbers");
              chrome.tabs.sendMessage(tab.id, {
                action: "populate_numbers",
                numbers,
              });
              // chrome.tabs.reload(tab.id, function () {
              //   chrome.tabs.onUpdated.addListener(function listener(
              //     tabId,
              //     info
              //   ) {
              //     if (info.status === "complete") {
              //       console.log("Tab reload ended");
              //       console.log("populdate numbers message sent");
              //       chrome.tabs.sendMessage(tab.id, {
              //         action: "populate_numbers",
              //         numbers,
              //       });
              //       chrome.tabs.onUpdated.removeListener(listener);
              //     }
              //   });
              // });
            });
          } else {
            // chrome.tabs.create({ url: "https://web.whatsapp.com/" }, (tab) => {
            //   // Inject content script after tab loads
            //   chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
            //     if (tabId === tab.id && info.status === "complete") {
            //       console.log("populdate numbers message sent");
            //       chrome.tabs.sendMessage(tab.id, {
            //         action: "populate_numbers",
            //         numbers,
            //       });
            //       chrome.tabs.onUpdated.removeListener(listener);
            //     }
            //   });
            // });
          }
        });
      } catch (e) {
        console.log("lag gye");
      }
  }
);

// chrome.runtime.onMessageExternal.addListener(
//   (request, sender, sendResponse) => {
//     if (request.action === "launch_extension") {
//       // Open WhatsApp Web if not already open
//       const numbers = request.numbers || "";
//       chrome.tabs.query({ url: "https://web.whatsapp.com/*" }, (tabs) => {
//         if (tabs.length > 0) {
//           chrome.tabs.update(tabs[0].id, { active: true }, (tab) => {
//             // Inject content script into the WhatsApp Web tab
//             chrome.scripting.executeScript({
//               target: { tabId: tab.id },
//               files: ["content.js"],
//             });
//             chrome.tabs.sendMessage(tab.id, {
//               action: "populate_numbers",
//               numbers,
//             });
//           });
//         } else {
//           chrome.tabs.create({ url: "https://web.whatsapp.com/" }, (tab) => {
//             // Inject content script after tab loads
//             chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
//               if (tabId === tab.id && info.status === "complete") {
//                 chrome.scripting.executeScript({
//                   target: { tabId: tab.id },
//                   files: ["content.js"],
//                 });
//                 chrome.tabs.sendMessage(tab.id, {
//                   action: "populate_numbers",
//                   numbers,
//                 });
//                 chrome.tabs.onUpdated.removeListener(listener);
//               }
//             });
//           });
//         }
//       });
//       sendResponse({ status: "Extension launched" });
//     }
//   }
// );
