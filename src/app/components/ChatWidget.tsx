import { useState } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you learn more about ESG evaluation today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! Our team will get back to you shortly.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#2d6a4f] text-white rounded-full shadow-lg hover:bg-[#1b4d37] transition-all flex items-center justify-center z-50"
          aria-label="Open chat"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-[#e5e5e5]">
          {/* Chat Header */}
          <div className="bg-[#2d6a4f] text-white px-5 py-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3
                className="text-[1rem] font-bold"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                GreenGauge Support
              </h3>
              <p
                className="text-[0.75rem] opacity-90"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                We typically reply in a few minutes
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-80 transition-opacity"
              aria-label="Close chat"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-[#2d6a4f] text-white'
                      : 'bg-[#f0f0f0] text-[#333]'
                  }`}
                >
                  <p
                    className="text-[0.85rem] leading-[1.5]"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {message.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-[#e5e5e5]">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-[#ccc] rounded-[3px] text-[0.85rem] focus:outline-none focus:border-[#2d6a4f] transition-colors"
                style={{ fontFamily: 'Arial, sans-serif' }}
              />
              <button
                type="submit"
                className="bg-[#2d6a4f] text-white px-4 py-2 rounded-[3px] hover:bg-[#1b4d37] transition-colors"
                aria-label="Send message"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Responsive Styles */}
      <style>{`
        @media(max-width: 640px) {
          .fixed.bottom-6.right-6.w-\\[380px\\] {
            width: calc(100vw - 32px);
            right: 16px;
            left: 16px;
            max-width: 380px;
          }
        }
      `}</style>
    </>
  );
}
