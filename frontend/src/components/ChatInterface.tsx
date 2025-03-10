
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Edit3, Wallet } from "lucide-react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { ConnectYourWallet } from "./ConnectYourWallet";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatInterfaceProps {
  agentName?: string;
  onGenerate?: (content: string) => void;
}

const ChatInterface = ({ agentName = "AgentX", onGenerate }: ChatInterfaceProps) => {
  const { connected } = useWallet();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hi there! I'm ${agentName}. How can I help you create Twitter content today?`,
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "I can help you craft a tweet about that. Would you like it to be informative, humorous, or thought-provoking?",
        "I've analyzed trending topics related to your request. How about we focus on the engagement aspect?",
        "That's an interesting topic! I can generate a few variations for you to choose from.",
        "Based on your previous successful tweets, I recommend taking a conversational approach to this topic.",
        onGenerate ? "I've created some content based on our conversation. Would you like to review it in the content editor?" : "Let me draft something for you based on what we've discussed."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
      
      // If there's a generate function and it's an appropriate response, call it
      if (onGenerate && randomResponse.includes("content editor")) {
        setTimeout(() => {
          onGenerate("Here's a draft tweet based on our conversation. This combines the key points we discussed with an engaging format optimized for Twitter.");
        }, 1000);
      }
    }, 1500);
  };

  const handleAddToGenerator = (content: string) => {
    if (onGenerate) {
      onGenerate(content);
    }
  };

  if (!connected) {
    return (
      <ConnectYourWallet 
        title="Connect to Chat"
        description="Please connect your wallet to access the AI Agent"
      />
    );
  }

  return (
    <div className="flex flex-col h-full rounded-2xl glass-card overflow-hidden animate-fade-in shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="p-4 border-b flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="font-medium">{agentName}</h3>
          <p className="text-xs text-muted-foreground">AI Twitter Assistant</p>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-bubble ${
              message.sender === "user" ? "chat-bubble-user" : "chat-bubble-ai"
            } animate-slide-up`}
          >
            <div className="flex items-start gap-2">
              {message.sender === "ai" ? (
                <Bot className="w-4 h-4 mt-1 shrink-0" />
              ) : (
                <User className="w-4 h-4 mt-1 shrink-0" />
              )}
              <div className="w-full">
                <p>{message.content}</p>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  
                  {message.sender === "ai" && onGenerate && (
                    <button 
                      onClick={() => handleAddToGenerator(message.content)}
                      className="flex items-center gap-1 text-xs bg-primary/20 hover:bg-primary/30 text-primary rounded-full px-2 py-1 transition-colors duration-300"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Add to Generator</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="chat-bubble chat-bubble-ai animate-pulse">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-current"></div>
              <div className="w-2 h-2 rounded-full bg-current"></div>
              <div className="w-2 h-2 rounded-full bg-current"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="input-field flex-grow transition-all duration-300 focus:ring-2"
            disabled={isTyping}
          />
          <button
            type="submit"
            className="button-primary p-2 rounded-xl transition-transform duration-300 hover:scale-105"
            disabled={!inputValue.trim() || isTyping}
          >
            {isTyping ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;