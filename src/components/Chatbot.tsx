import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Bonjour! Comment puis-je vous aider?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    const userInput = input.trim();
    if (!userInput) return;

    const userMessage: Message = {
      id: Date.now(),
      text: userInput,
      sender: 'user'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const botResponse = getBotResponse(userInput);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot'
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const getBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('bonjour') || lowerInput.includes('hello') || lowerInput.includes('salut')) {
      return 'Bonjour! Comment allez-vous?';
    }

    if (lowerInput.includes('aide') || lowerInput.includes('help') || lowerInput.includes('support')) {
      return 'Je suis là pour vous aider. Dites-moi ce que vous cherchez sur le site.';
    }

    if (lowerInput.includes('site') || lowerInput.includes('janjam') || lowerInput.includes('dakar')) {
      return 'Ce site présente les épreuves du Janjam Joj Dakar. Vous pouvez explorer Cosaan, Jambaar, Xibaar et Yoonwi.';
    }

    if (lowerInput.includes('cosaan')) {
      return 'La section Cosaan montre des plats, des lieux et des artisanats. Voulez-vous en savoir plus sur un détail?';
    }

    if (lowerInput.includes('jambaar')) {
      return 'La section Jambaar présente des missions, un fil d\'actualité et du classement. Vous pouvez demander des détails sur les missions.';
    }

    if (lowerInput.includes('xibaar')) {
      return 'Xibaar contient des épreuves, des athlètes et des actualités. Posez-moi une question sur une épreuve ou un athlète.';
    }

    if (lowerInput.includes('yoonwi')) {
      return 'YoonWi est la section dédiée aux journées et au contenu communautaire. Vous pouvez demander comment participer.';
    }

    if (lowerInput.includes('?')) {
      return 'C\'est une bonne question! Je suis en apprentissage, mais je peux vous diriger vers les bonnes sections.';
    }

    return 'Désolé, je ne comprends pas bien. Essayez de demander "aide" ou de nommer une section comme Cosaan, Jambaar, Xibaar ou YoonWi.';
  };

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 md:bottom-4 md:right-4 z-50 rounded-full w-12 h-12 bg-primary hover:bg-primary/90 shadow-lg"
      >
        💬
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-36 right-4 md:bottom-20 md:right-4 z-50 w-80 h-96 flex flex-col shadow-2xl">
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`p-2 rounded ${msg.sender === 'user' ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <form
            className="p-4 border-t flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              handleSend();
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tapez votre message..."
            />
            <Button type="submit">Envoyer</Button>
          </form>
        </Card>
      )}
    </>
  );
};