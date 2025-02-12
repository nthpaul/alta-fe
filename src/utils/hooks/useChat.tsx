import { useState, useEffect } from "react";
import { searchProducts } from "@/utils/api";

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  products?: Product[]
  filters?: string[]
}

export type Product = {
  name: string;
  shop: string;
  price: number;
  source_url: string;
  image_url: string;
  products?: Product[]
}

export type Filters = {
  [key: string]: string[] | Number
}

const STORAGE_KEY = "chatHistory";

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch messages from local storage
  useEffect(() => {
    const storedMessages = localStorage.getItem(STORAGE_KEY);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // store messages in local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);


  const sendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsLoading(true);

    try {
      const response = await searchProducts(text);

      const responseMessage: Message = {
        id: Date.now().toString(),
        text: `Here are some products I found:`,
        isUser: false,
        timestamp: new Date().toLocaleTimeString(),
        products: response?.products, // ✅ Products are stored here
        filters: response?.filters
      };

      setMessages((prev) => [...prev, responseMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Error fetching results. Please try again.",
          isUser: false,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage };
};

export default useChat;
