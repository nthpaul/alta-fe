import dayjs from "dayjs";
import React from "react";

export type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
};

export const MessageBubble = ({ message }: { message: Message }) => {
  return (
    <div className="mb-3 flex">
      <div className={`${message.isUser ? 'self-end ml-auto max-w-[50%]' : 'self-start'}`}>
        {!message.isUser && (
          <div className="flex items-center mb-1 ml-1 space-x-2">
          </div>
        )}
        <div
          className={`p-3.5 rounded-2xl flex justify-center ${message.isUser
            ? 'bg-alta-gray-100 dark:bg-alta-gray-900'
            : ''
            }`}
        >
          <p className={`text-[15px] leading-[22px] break-all ${!message.isUser && 'text-alta-gray-600 dark:text-alta-gray-500'}`}>
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
