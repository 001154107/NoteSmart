"use client";

import { useState, useEffect } from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: string; // For the selection screenshot/preview
};

export default function ChatSidebar() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const handleWandSelection = (event: CustomEvent) => {
      const { selection, image } = event.detail;
      
      // Add user message with selection info
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: `Analyzed selection area: x=${Math.round(selection.x)}, y=${Math.round(selection.y)}, w=${Math.round(selection.w)}, h=${Math.round(selection.h)}`,
        image: image // Optional: if we can capture the image
      };
      
      setMessages(prev => [...prev, userMsg]);

      // Simulate AI response
      setTimeout(() => {
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I've analyzed your selection. It appears to be a section of the document. How can I help you with it?"
        };
        setMessages(prev => [...prev, aiMsg]);
      }, 1500);
    };

    window.addEventListener("wand-selection" as any, handleWandSelection as any);
    return () => {
      window.removeEventListener("wand-selection" as any, handleWandSelection as any);
    };
  }, []);

  return (
    <div className="w-80 h-full bg-white border-l border-gray-200 flex flex-col shadow-lg z-[1000] pointer-events-auto">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="font-semibold text-gray-800">AI Assistant</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            <p>Select an area with the Wand tool to start chatting.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[90%] p-3 rounded-lg text-sm ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.image && (
                    <div className="mb-2 rounded overflow-hidden border border-white/20">
                        <img src={msg.image} alt="Selection" className="max-w-full h-auto" />
                    </div>
                )}
                <p>{msg.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled
        />
        <p className="text-xs text-gray-400 mt-2 text-center">AI processing simulated</p>
      </div>
    </div>
  );
}
