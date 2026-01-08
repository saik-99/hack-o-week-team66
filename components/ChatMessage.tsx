import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.role === 'bot';

  return (
    <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] md:max-w-[70%] ${isBot ? 'flex-row' : 'flex-row-reverse'} items-end gap-2`}>
        
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white shadow-sm
          ${isBot ? 'bg-indigo-600' : 'bg-gray-500'}`}>
          {isBot ? 'AI' : 'ME'}
        </div>

        {/* Bubble */}
        <div className={`
          relative px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
          ${isBot 
            ? 'bg-white text-gray-800 rounded-bl-none border border-gray-100' 
            : 'bg-indigo-600 text-white rounded-br-none'}
        `}>
          {message.content}
          <div className={`text-[10px] mt-1 opacity-60 ${isBot ? 'text-gray-400' : 'text-indigo-200'} text-right`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
