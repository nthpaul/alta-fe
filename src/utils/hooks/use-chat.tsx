import { useState, useEffect } from "react";
import { searchProducts } from "@/utils/api";

export interface Filters {
  brands: string[];
  colors: string[];
  materials: string[];
  types: string[];
}

export interface Product {
  name: string;
  shop: string;
  price: number;
  source_url: string;
  image_url: string;
  products?: Product[];
}

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  products?: Product[];
  filters?: Filters;
}

const STORAGE_KEY = "chatHistory";
const PAIRINGS_KEY = "productPairings";

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pairingsMap, setPairingsMap] = useState<Record<string, Product[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedMessages = localStorage.getItem(STORAGE_KEY);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    const storedPairings = localStorage.getItem(PAIRINGS_KEY);
    if (storedPairings) {
      setPairingsMap(JSON.parse(storedPairings));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (Object.keys(pairingsMap).length > 0) {
      localStorage.setItem(PAIRINGS_KEY, JSON.stringify(pairingsMap));
    }
  }, [pairingsMap]);

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
        products: response?.products,
        filters: response?.filters,
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

  const fetchPairingsForProduct = async (product: Product) => {
    if (pairingsMap[product.source_url]) return pairingsMap[product.source_url];

    setIsLoading(true);
    try {
      const pairings = await searchProducts(product.name, true, 5);
      setPairingsMap((prev) => ({
        ...prev,
        [product.source_url]: pairings,
      }));
      return pairings;
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage, fetchPairingsForProduct };
};

export default useChat;
