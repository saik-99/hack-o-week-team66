import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex w-full mb-4 justify-start animate-fade-in">
      <div className="flex max-w-[85%] flex-row items-end gap-2">
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-xs font-bold text-white shadow-sm">
          AI
        </div>
        <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex gap-1 items-center h-[46px]">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
