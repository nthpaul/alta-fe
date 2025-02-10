'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import TopNavbar from '@/components/layout/top-navbar';
import { AutosizeTextarea } from '@ui';
import dayjs from 'dayjs';

// Define the Message type
type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
};

// Dummy hook for demonstration—replace with your real hook
const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello', isUser: false, timestamp: '10:00:00' },
    { id: '2', text: 'Hi there!', isUser: true, timestamp: '10:01:00' },
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

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Component to render each message bubble
  const MessageBubble = ({ message }: { message: Message }) => {
    console.log(message);
    return (
      <div className="mb-3 flex">
        <div className={`max-w-[85%] ${message.isUser ? 'self-end ml-auto' : 'self-start'}`}>
          {!message.isUser && (
            <div className="flex items-center mb-1 ml-1 space-x-2">
            </div>
          )}
          <div
            className={`p-3.5 rounded-2xl ${message.isUser
              ? 'bg-white dark:bg-alta-gray-900'
              : ''
              }`}
          >
            <p className={`text-[15px] leading-[22px] ${!message.isUser && 'text-alta-gray-600 dark:text-alta-gray-500'}`}>
              {message.text}
            </p>
          </div>
          {message.isUser && <span className={`text-alta-gray-300 dark:text-alta-gray-900 text-xs mt-1 block ${message.isUser ? 'text-right mr-1' : 'ml-1'}`}>
            {dayjs(`2000-01-01 ${message.timestamp}`).format('h:mm A')}
          </span>}
        </div>
      </div>
    );
  };

  // Typing indicator component
  const TypingIndicator = () => (
    <div className="flex items-center space-x-1 ml-1 mb-3">
      <div className="w-6 h-6 rounded-full flex items-center justify-center mb-1">
        {/* A simple spinner using Tailwind animation */}
        <div className="w-4 h-4 border-4 border-t-transparent border-alta-gray-500 rounded-full animate-spin"></div>
      </div>
      <span className="text-xs text-zinc-400">Claude is typing...</span>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <TopNavbar title="Chat" />

      {/* Message list area */}
      <div className="flex-1 overflow-y-auto py-3 mt-12">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && <TypingIndicator />}
        {/* Dummy element to scroll into view */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="fixed bottom-[90px] bg-alta-white dark:bg-alta-black w-screen max-w-3xl left-1/2 transform -translate-x-1/2 p-4 pt-0">
        <div className="flex items-center bg-white dark:bg-alta-gray-900 rounded-2xl py-2">
          <AutosizeTextarea
            className="flex-1 min-h-[40px] resize-none"
            disabled={isLoading}
            placeholder="Find anything"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={`pr-4 ${(!inputText.trim() || isLoading) && 'opacity-40 cursor-not-allowed'}`}
            disabled={!inputText.trim() || isLoading}
            onClick={handleSend}
          >
            <Send size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

