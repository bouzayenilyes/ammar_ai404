class Chattounsi {
  constructor() {
    this.chatContainer = document.getElementById("chatContainer");
    this.messageInput = document.getElementById("messageInput");
    this.sendButton = document.getElementById("sendButton");

    // Replace with your actual Gemini API key
    this.apiKey = "your api key please";
    this.apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    this.init();
  }

  init() {
    this.sendButton.addEventListener("click", () => this.sendMessage());
    this.messageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    this.messageInput.addEventListener("input", () => {
      this.adjustTextareaHeight();
      this.updateSendButton();
    });

    this.updateSendButton();
  }

  adjustTextareaHeight() {
    this.messageInput.style.height = "auto";
    this.messageInput.style.height = this.messageInput.scrollHeight + "px";
  }

  updateSendButton() {
    const hasText = this.messageInput.value.trim().length > 0;
    this.sendButton.classList.toggle("active", hasText);
    this.sendButton.disabled = !hasText;
  }

  async sendMessage() {
    const message = this.messageInput.value.trim();
    if (!message) return;

    // Clear input
    this.messageInput.value = "";
    this.adjustTextareaHeight();
    this.updateSendButton();

    // Remove welcome message if it exists
    const welcomeMessage = this.chatContainer.querySelector(".welcome-message");
    if (welcomeMessage) {
      welcomeMessage.remove();
    }

    // Add user message
    this.addMessage(message, "user");

    // Show typing indicator
    const typingIndicator = this.showTypingIndicator();

    // Simulate AI response
    await this.simulateAIResponse(message, typingIndicator);
  }

  addMessage(content, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}-message`;

    const avatar = sender === "user" ? "You" : "G";
    const avatarClass = sender === "user" ? "user-avatar" : "ai-avatar";

    messageDiv.innerHTML = `
            <div class="message-header">
                <div class="avatar ${avatarClass}">${avatar}</div>
            </div>
            <div class="message-content">${this.formatMessage(content)}</div>
        `;

    this.chatContainer.appendChild(messageDiv);
    this.scrollToBottom();
  }

  showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.className = "message ai-message typing-message";
    typingDiv.innerHTML = `
            <div class="message-header">
                <div class="avatar ai-avatar">G</div>
            </div>
            <div class="typing-indicator">
                Thinking
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;

    this.chatContainer.appendChild(typingDiv);
    this.scrollToBottom();
    return typingDiv;
  }

  async simulateAIResponse(userMessage, typingIndicator) {
    try {
      // Call Gemini API
      const response = await this.callGeminiAPI(userMessage);

      // Remove typing indicator
      typingIndicator.remove();

      // Add AI response with typing effect
      await this.addTypingMessage(response, "ai");
    } catch (error) {
      console.error("Error calling Gemini API:", error);

      // Remove typing indicator
      typingIndicator.remove();

      // Show error message
      const errorMessage =
        this.apiKey === "YOUR_GEMINI_API_KEY_HERE"
          ? "Please add your Gemini API key to use this feature. You can get one from Google AI Studio."
          : "samehny sahby raw eendi moushkla tawa erja3ly ghodwa";

      await this.addTypingMessage(errorMessage, "ai");
    }
  }

  async addTypingMessage(content, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}-message`;

    const avatar = sender === "user" ? "You" : "G";
    const avatarClass = sender === "user" ? "user-avatar" : "ai-avatar";

    messageDiv.innerHTML = `
            <div class="message-header">
                <div class="avatar ${avatarClass}">${avatar}</div>
            </div>
            <div class="message-content"></div>
        `;

    this.chatContainer.appendChild(messageDiv);

    const contentDiv = messageDiv.querySelector(".message-content");

    // Type out the message
    await this.typeMessage(contentDiv, content);
    this.scrollToBottom();
  }

  async typeMessage(element, text) {
    const formattedText = this.formatMessage(text);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = formattedText;
    const plainText = tempDiv.textContent || tempDiv.innerText || "";

    element.innerHTML = "";

    for (let i = 0; i < plainText.length; i++) {
      element.textContent += plainText[i];
      await this.delay(20 + Math.random() * 30);
      this.scrollToBottom();
    }

    // Replace with formatted version
    element.innerHTML = formattedText;
  }

  async callGeminiAPI(message) {
    console.log("Calling Gemini API with message:", message);
    console.log("API URL:", this.apiUrl);

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    };

    console.log("Request body:", JSON.stringify(requestBody, null, 2));

    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": this.apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", response.status);
            console.log("Response headers:", response.headers);
            
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        console.error("Unexpected response structure:", data);
        throw new Error("No response generated");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
  formatMessage(message) {
    // Enhanced formatting for markdown-like content
    let formatted = message
      .replace(/\n/g, "<br>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, "<code>$1</code>");

    return formatted;
  }

  scrollToBottom() {
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Chattounsi();
});
