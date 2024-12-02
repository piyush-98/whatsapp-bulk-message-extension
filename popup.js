document.getElementById("sendBtn").addEventListener("click", () => {
  const numbers = document
    .getElementById("numbers")
    .value.split(",")
    .map((num) => num.trim());
  const message = document.getElementById("message").value;

  if (!numbers.length || !message) {
    alert("Please provide valid numbers and a message.");
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: sendMessage,
      args: [numbers, message],
    });
  });

  function sendMessage(numbers, message) {
    // This function is executed in the context of the WhatsApp Web tab
    if (typeof WPP === "undefined") {
      alert("WPP library not available. Make sure you're on WhatsApp Web.");
      return;
    }

    numbers.forEach(async (number) => {
      try {
        await WPP.chat.sendMessage(number + "@c.us", message);
        console.log(`Message sent to ${number}`);
      } catch (error) {
        console.error(`Failed to send message to ${number}`, error);
      }
    });
    alert("Messages sent!");
  }
});
