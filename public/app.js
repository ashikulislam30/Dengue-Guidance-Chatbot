// app.js

const messagesEl = document.getElementById("messages");
const formEl = document.getElementById("chat-form");
const inputEl = document.getElementById("user-input");
const newChatBtn = document.getElementById("new-chat-btn");

// Conversation history (user + assistant messages)
let conversation = [];

// Auto-resize textarea
inputEl.addEventListener("input", () => {
  inputEl.style.height = "auto";
  inputEl.style.height = inputEl.scrollHeight + "px";
});

// New chat: clear messages and history
newChatBtn.addEventListener("click", () => {
  conversation = [];
  messagesEl.innerHTML = `
    
  `;
  scrollToBottom();
});

// Utility: scroll to bottom
function scrollToBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Utility: render a message in the UI
// Returns the DOM element for the bubble, so we can edit it later
function addMessage(role, text, isTyping = false) {
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = role === "user" ? "User" : "Dengue Bot";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  if (isTyping) bubble.classList.add("typing");
  bubble.textContent = text;

  msgDiv.appendChild(avatar);
  msgDiv.appendChild(bubble);
  messagesEl.appendChild(msgDiv);

  scrollToBottom();
  return bubble;
}

// Mark the form submit event listener as async
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = inputEl.value.trim();
  if (!text) return;

  // Hide the default assistant message
  const defaultMessage = document.querySelector(".message.assistant");
  if (defaultMessage) {
    defaultMessage.style.display = "none";
  }

  // Add user message to UI and history
  addMessage("user", text);
  conversation.push({ role: "user", content: text });

  // Clear input
  inputEl.value = "";
  inputEl.style.height = "auto";

  // Add assistant "typing..." bubble
  const typingBubble = addMessage("assistant", "Thinking...", true);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: conversation }),
    });

    if (!response.ok) {
      typingBubble.classList.remove("typing");
      typingBubble.textContent =
        "Error: failed to connect to the dengue assistant.";
      return;
    }

    const data = await response.json();
    const replyText =
      data.reply ||
      "Sorry, I could not generate a response at the moment.";

    typingBubble.classList.remove("typing");
    typingBubble.textContent = replyText;

    // Add to history
    conversation.push({ role: "assistant", content: replyText });
  } catch (err) {
    console.error(err);
    typingBubble.classList.remove("typing");
    typingBubble.textContent =
      "Error: something went wrong. Please check that LM Studio is running.";
  }
});
