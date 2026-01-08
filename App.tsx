import React, { useState, useRef, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Send, Sparkles, MessageSquare } from 'lucide-react';

import { Message, ChatStatus } from './types';
import { QUICK_REPLIES, INSTITUTE_NAME } from './constants';
import { findRuleBasedAnswer } from './services/ruleEngine';
import { getGeminiResponse } from './services/geminiService';

import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'bot',
      content: `Welcome to ${INSTITUTE_NAME}! 👋 I can help you with course details, fees, timings, and more.`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<ChatStatus>(ChatStatus.IDLE);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // 1. Add User Message
    const userMsg: Message = {
      id: uuidv4(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setStatus(ChatStatus.THINKING);

    // 2. Determine Response Strategy
    // Strategy A: Rule-Based (Instant)
    const ruleAnswer = findRuleBasedAnswer(content);

    if (ruleAnswer) {
      // Simulate a small "human-like" delay for reading
      setTimeout(() => {
        const botMsg: Message = {
          id: uuidv4(),
          role: 'bot',
          content: ruleAnswer,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMsg]);
        setStatus(ChatStatus.IDLE);
      }, 600);
      return;
    }

    // Strategy B: Gemini Fallback (Smart)
    // If no rule matches, we use the LLM
    try {
      const geminiAnswer = await getGeminiResponse(content);
      const botMsg: Message = {
        id: uuidv4(),
        role: 'bot',
        content: geminiAnswer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
       // Fallback for fallback
       const errorMsg: Message = {
        id: uuidv4(),
        role: 'bot',
        content: "I'm having trouble connecting to my knowledge base right now. Please try asking about 'fees' or 'courses'.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setStatus(ChatStatus.IDLE);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <MessageSquare size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-gray-800">{INSTITUTE_NAME}</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-gray-500 font-medium">Online Support</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
           <Sparkles size={14} />
           <span>AI Enhanced</span>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50 scroll-smooth">
        <div className="max-w-3xl mx-auto flex flex-col min-h-full justify-end">
           {/* Intro Hint */}
           <div className="text-center py-6">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">Today</p>
           </div>

           {messages.map(msg => (
             <ChatMessage key={msg.id} message={msg} />
           ))}
           
           {status === ChatStatus.THINKING && <TypingIndicator />}
           
           <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="bg-white border-t border-gray-200 p-4 sticky bottom-0 z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* Quick Replies */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-1 no-scrollbar mask-fade-right">
             {QUICK_REPLIES.map((reply, idx) => (
               <button
                 key={idx}
                 onClick={() => handleSendMessage(reply)}
                 disabled={status === ChatStatus.THINKING}
                 className="whitespace-nowrap px-4 py-2 bg-gray-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-transparent rounded-full text-sm text-gray-600 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {reply}
               </button>
             ))}
          </div>

          {/* Input Field */}
          <div className="relative flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={status === ChatStatus.THINKING}
              placeholder="Type your question..."
              className="w-full bg-gray-100 text-gray-900 placeholder-gray-500 border-0 rounded-full py-3.5 pl-5 pr-12 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || status === ChatStatus.THINKING}
              className="absolute right-2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:bg-gray-400 transition-colors shadow-sm"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="text-center mt-2">
             <p className="text-[10px] text-gray-400">
               Bot uses rule-based matching. Complex queries are handled by Gemini AI.
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
