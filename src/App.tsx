import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, UserMessage } from './types';
import { analyzePatientHistory } from './services/geminiService';
import { ChatMessageComponent } from './components/ChatMessage';
import { ImageUpload } from './components/ImageUpload';
import { BotIcon, SunIcon, MoonIcon } from './components/icons';

const fileToBase64 = (file: File): Promise<{base64: string, mimeType: string}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        const [meta, base64] = result.split(',');
        const mimeType = meta.split(';')[0].split(':')[1];
        resolve({base64, mimeType});
    }
    reader.onerror = error => reject(error);
  });
};

type Theme = 'light' | 'dark';

const ThemeSwitcher: React.FC<{ theme: Theme, toggleTheme: () => void }> = ({ theme, toggleTheme }) => {
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
        </button>
    );
};

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Welcome, Doctor. Please type your notes or upload an image of the patient's history to begin the analysis.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text: string, file: File | null) => {
    if (!text && !file) return;

    setIsLoading(true);

    let imageUrl: string | undefined;
    let imageForApi: { base64: string; mimeType: string } | undefined;

    if (file) {
        const { base64, mimeType } = await fileToBase64(file);
        imageUrl = `data:${mimeType};base64,${base64}`;
        imageForApi = { base64, mimeType };
    }

    const userMessage: UserMessage = { 
        role: 'user', 
        text: text || undefined,
        imageUrl
    };
    const loadingMessage: ChatMessage = { role: 'model', text: '...'};
    setMessages(prev => [...prev, userMessage, loadingMessage]);

    const prompt = text || "Please analyze the attached patient history.";
    const modelResponse = await analyzePatientHistory(prompt, imageForApi);
    
    setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.role === 'model') {
            lastMessage.text = modelResponse;
        }
        return newMessages;
    });

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen font-sans text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 transition-colors">
        <header className="p-4 bg-white/80 dark:bg-gray-800/80 border-b border-black/10 dark:border-white/10 shadow-sm backdrop-blur-lg sticky top-0 z-10">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <BotIcon className="w-8 h-8 text-green-600 dark:text-green-400"/>
                    <h1 className="text-2xl font-bold tracking-tight">HomeopathyAI</h1>
                </div>
                <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
            </div>
        </header>

        <main className="flex-1 overflow-y-auto">
             <div 
                className="absolute inset-0 z-0 bg-fixed"
                style={{
                  backgroundImage: theme === 'light' 
                    ? `radial-gradient(circle at top left, hsla(210, 80%, 98%, 1), hsla(190, 80%, 95%, 1) 50%, hsla(140, 60%, 96%, 1))`
                    : `radial-gradient(circle at top left, hsla(220, 40%, 10%, 1), hsla(220, 30%, 5%, 1))`
                }}
              />
            <div className="max-w-4xl mx-auto py-4 relative z-[1]">
                {messages.map((msg, index) => (
                    <ChatMessageComponent key={index} message={msg} />
                ))}
                <div ref={chatEndRef} />
            </div>
        </main>

        <footer className="sticky bottom-0 z-10">
            <ImageUpload onSend={handleSend} isLoading={isLoading} />
        </footer>
    </div>
  );
};

export default App;
