"use client";

import React, { useState, useRef, useEffect } from "react";
import TopNavbar from "@/components/layout/top-navbar";
import { AutosizeTextarea } from "@ui";
import { MessageBubble, TypingIndicator } from "@/pages/shop/components";
import useChat from "@/utils/hooks/useChat";

const ChatPage = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    await sendMessage(inputText);
    setInputText("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <TopNavbar title="Chat" />

      <div className="flex-1 overflow-y-auto py-3 mt-20 mb-[180px]">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator description="Fetching products..." />}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-[90px] bg-white dark:bg-alta-black w-screen max-w-3xl left-1/2 transform -translate-x-1/2 pb-4 md:px-0 px-4 pt-0">
        <div className="flex items-center bg-alta-gray-100 dark:bg-alta-gray-900 rounded-3xl">
          <AutosizeTextarea
            className="flex-1 min-h-[40px] resize-none"
            disabled={isLoading}
            handleSend={handleSend}
            placeholder="Find anything"
            showSendButton
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
