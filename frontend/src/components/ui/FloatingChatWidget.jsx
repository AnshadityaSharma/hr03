import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const FloatingChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I\'m your HR assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const cannedResponses = {
    'leave': "For leave requests, please visit the Leave Management section. You can submit new requests, check balances, and track approval status there.",
    'policy': "You can find all company policies in the Policy Center. Use the search function to quickly locate specific policies or procedures.",
    'asset': "For asset-related queries, check the Asset Management section. You can request new equipment, report issues, or track your current assignments.",
    'onboarding': "New employee tasks and onboarding information can be found in the Onboarding Tasks section. Track your progress and complete required items there.",
    'help': "I can help you with questions about leave requests, company policies, asset management, and onboarding tasks. What specific area would you like assistance with?",
    'default': "I understand you need help. For specific assistance, please visit the relevant section: Leave Management for time off, Policy Center for company guidelines, Asset Management for equipment, or Onboarding Tasks for new employee requirements."
  };

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue?.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (input) => {
    const lowerInput = input?.toLowerCase();
    
    if (lowerInput?.includes('leave') || lowerInput?.includes('vacation') || lowerInput?.includes('time off')) {
      return cannedResponses?.leave;
    } else if (lowerInput?.includes('policy') || lowerInput?.includes('procedure') || lowerInput?.includes('guideline')) {
      return cannedResponses?.policy;
    } else if (lowerInput?.includes('asset') || lowerInput?.includes('equipment') || lowerInput?.includes('laptop')) {
      return cannedResponses?.asset;
    } else if (lowerInput?.includes('onboarding') || lowerInput?.includes('new employee') || lowerInput?.includes('task')) {
      return cannedResponses?.onboarding;
    } else if (lowerInput?.includes('help') || lowerInput?.includes('support')) {
      return cannedResponses?.help;
    } else {
      return cannedResponses?.default;
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-30">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white rounded-lg shadow-elevation-3 border border-slate-200 flex flex-col animate-slide-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-primary text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="MessageCircle" size={16} color="white" />
              </div>
              <div>
                <h3 className="font-medium text-sm">HR Assistant</h3>
                <p className="text-xs text-blue-100">Online</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              iconName="X"
              iconSize={16}
              className="text-white hover:bg-white/20 h-8 w-8"
            />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message?.sender === 'user' ?'bg-primary text-white' :'bg-slate-100 text-slate-900'
                  }`}
                >
                  <p>{message?.text}</p>
                  <p className={`text-xs mt-1 ${
                    message?.sender === 'user' ? 'text-blue-100' : 'text-slate-500'
                  }`}>
                    {formatTime(message?.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e?.target?.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button
                variant="default"
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue?.trim()}
                iconName="Send"
                iconSize={16}
                className="h-10 w-10"
              />
            </div>
          </div>
        </div>
      )}
      {/* Chat Toggle Button */}
      <Button
        variant="default"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        iconName={isOpen ? "X" : "MessageCircle"}
        iconSize={20}
        className="h-12 w-12 rounded-full shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200"
      />
    </div>
  );
};

export default FloatingChatWidget;