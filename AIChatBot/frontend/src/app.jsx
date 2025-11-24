import { useState } from "react";
import axios from "axios";
import ChatBubble from "./ChatBubble";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const res = await axios.post("http://localhost:8000/chat", {
      message: input,
    });

    const botMessage = { sender: "bot", text: res.data.reply };
    setMessages((prev) => [...prev, botMessage]);

    setInput("");
  };

  return (
    <div className="chat-container">
      <h2>AI Chatbot</h2>

      <div className="chat-box">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      <div className="input-area">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
