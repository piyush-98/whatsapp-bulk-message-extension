function createUI() {
  try {
    console.log("inside create UI");
    const container = document.createElement("div");
    container.id = "custom-extension-ui";
    container.style.position = "fixed";
    container.style.top = "10px";
    container.style.right = "10px";
    container.style.zIndex = "10000";
    container.style.background = "white";
    container.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
    container.style.padding = "20px";
    container.style.borderRadius = "8px";
    container.style.width = "300px";

    // Add UI content
    container.innerHTML = `
        <h3>Send Bulk Messages</h3>
        <label for="numbers">Mobile Numbers (comma-separated):</label>
        <textarea id="numbers" rows="3" style="width: 100%;"></textarea>
        <label for="message">Message:</label>
        <textarea id="message" rows="3" style="width: 100%;"></textarea>
        <button id="sendMessages" style="margin-top: 10px; padding: 8px 12px;">Send</button>
      `;

    // Append the UI to the document body
    console.log("adding to dom", window.WPP);
    document.body.appendChild(container);

    console.log(document.getElementById("custom-extension-ui"));

    // Add functionality to the "Send" button
    document.getElementById("sendMessages").addEventListener("click", () => {
      try {
        const numbers = document.getElementById("numbers").value.split(",");
        const message = document.getElementById("message").value;

        if (!numbers.length || !message) {
          alert("Please provide both numbers and a message!");
          return;
        }
        // Use WPP API to send messages
        numbers.forEach((number) => {
          window.WPP.chat.sendTextMessage(number, message);
        });
      } catch (error) {
        console.log("error in send message", error);
      }
    });
  } catch (error) {
    console.log("error in create ui", error);
  }
}

// Access the window object

(function () {
  try {
    console.log("Injected script createUI");
    if (window.WPP) {
      console.log("Accessed object:", window.WPP);
      createUI();
      setTimeout(() => {
        try {
          const data = {
            number: WPP.conn.getMyDeviceId().user,
          };
          console.log(data);
          window.dispatchEvent(
            new CustomEvent("getPhoneNumber", { detail: data })
          );
        } catch (error) {
          console.log("error in settimeout", error);
        }
      }, 2000);
      // Send a message via a custom event
    }
  } catch (error) {
    console.log("error in createUi", error);
  }
})();
