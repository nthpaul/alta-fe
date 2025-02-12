'use client';

import React, { useState, useRef, useEffect } from 'react';
import TopNavbar from '@/components/layout/top-navbar';
import { AutosizeTextarea } from '@ui';
import { MessageBubble, Message, TypingIndicator } from '@/pages/shop/components';

// Dummy hook for demonstration—replace with your real hook
const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hi there!', isUser: true, timestamp: '10:01:00' },
    { id: '2', text: 'Hello', isUser: false, timestamp: '10:02:00' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate a reply after a delay
    setIsLoading(true);
    setTimeout(() => {
      const reply: Message = {
        id: Date.now().toString(),
        text: 'This is a reply from Claude. This is a reply from Claude.This is a reply from Claude.This is a reply from Claude.This is a reply from Claude.This is a reply from Claude.This is a reply from Claude.This is a reply from Claude.This is a reply from Claude.This is a reply from Claude.This is a reply from Claude.This is a reply from Claude.This is a reply from Claude.',
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, reply]);
      setIsLoading(false);
    }, 1000);
  };

  return { messages, isLoading, sendMessage };
};

const ChatPage = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;
    await sendMessage(inputText);
    setInputText('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent newline insertion
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <TopNavbar title="Chat" />

      {/* Message list area */}
      <div className="flex-1 overflow-y-auto py-3 mt-20 mb-[180px]">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator description="Claude is typing ..." />}
        {/* Dummy element to scroll into view */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
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

