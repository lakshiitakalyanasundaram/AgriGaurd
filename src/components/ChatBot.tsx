import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI('AIzaSyAw9P-7bn0-FBkS7Bdx7MkBZhCV-YRxV5I');
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const formatMessage = (content: string) => {
    // Split content into sections
    const sections = content.split('\n\n');
    
    return sections.map((section, index) => {
      // Handle introductory text
      if (index === 0 && !section.includes('*')) {
        return (
          <div key={index} className="mb-4 text-gray-700">
            {section}
          </div>
        );
      }

      // Handle list sections
      if (section.includes('*')) {
        const items = section.split('\n').filter(item => item.trim());
        return (
          <div key={index} className="space-y-3">
            {items.map((item, i) => {
              // Extract the heading and content
              const match = item.match(/\*\*(.*?)\*\*(.*)/);
              if (match) {
                const [, heading, content] = match;
                // Split content by question marks for better sentence separation
                const points = content.split('?')
                  .map(point => point.trim())
                  .filter(point => point.length > 0)
                  .map(point => point + (point.endsWith('?') ? '' : '?'));

                return (
                  <div key={i} className="space-y-2">
                    <h4 className="font-semibold text-[#8bc34a] text-lg">{heading}</h4>
                    <div className="pl-4 space-y-2">
                      {points.map((point, j) => (
                        <div key={j} className="flex items-start space-x-2">
                          <span className="text-[#8bc34a] mt-1.5">•</span>
                          <span className="text-gray-700 flex-1">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              // Handle regular list items
              if (item.trim().length > 0) {
                return (
                  <div key={i} className="flex items-start space-x-2">
                    <span className="text-[#8bc34a] mt-1.5">•</span>
                    <span className="text-gray-700 flex-1">{item.replace(/^\*\s*/, '')}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        );
      }

      // Handle regular paragraphs
      return (
        <div key={index} className="mb-3 text-gray-700">
          {section}
        </div>
      );
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const result = await model.generateContent(userMessage);
      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Plant Care Assistant</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-[#8bc34a] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div className="space-y-4">
                      {formatMessage(message.content)}
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about plant care..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc34a]"
              />
              <Button
                onClick={handleSend}
                className="bg-[#8bc34a] text-white hover:bg-[#7cb342]"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[#8bc34a] text-white hover:bg-[#7cb342] shadow-lg flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </Button>
    </div>
  );
};

export default ChatBot; 