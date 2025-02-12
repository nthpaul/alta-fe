import { useState } from "react";
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
}

export type Filters = {
  [key: string]: string[] | Number
}

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
