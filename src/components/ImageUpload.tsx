import React, { useState, useRef, useEffect } from 'react';
import { UploadIcon, SendIcon } from './icons';

interface ImageUploadProps {
  onSend: (text: string, file: File | null) => void;
  isLoading: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onSend, isLoading }) => {
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
        const scrollHeight = textAreaRef.current.scrollHeight;
        // Max height for 5 rows, approximately
        textAreaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = () => {
    if ((text.trim() || selectedFile) && !isLoading) {
      onSend(text.trim(), selectedFile);
      setText('');
      setSelectedFile(null);
      setPreviewUrl(null);
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
    }
  };
  
  const triggerFileSelect = () => fileInputRef.current?.click();
  const canSend = (text.trim().length > 0 || !!selectedFile) && !isLoading;

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 p-4 border-t border-black/10 dark:border-white/10 backdrop-blur-lg">
      <div className="max-w-4xl mx-auto flex items-end gap-4">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />
        <button
          onClick={triggerFileSelect}
          disabled={isLoading}
          className="p-3 self-center rounded-full text-gray-600 dark:text-gray-300 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 disabled:opacity-50 transition-colors"
          aria-label="Upload Image"
        >
          <UploadIcon className="w-6 h-6" />
        </button>
        <div className="flex-grow p-1 bg-gray-100 dark:bg-gray-700/60 rounded-2xl flex flex-col text-sm border border-black/10 dark:border-white/10">
            {previewUrl && (
                <div className="p-2 flex items-center gap-2 border-b border-gray-200 dark:border-gray-600">
                    <img src={previewUrl} alt="Preview" className="h-10 w-10 object-cover rounded" />
                    <span className="text-gray-700 dark:text-gray-300 truncate">{selectedFile?.name}</span>
                </div>
            )}
            <textarea
                ref={textAreaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message or patient notes..."
                className="w-full bg-transparent p-2 resize-none focus:outline-none dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                rows={1}
                disabled={isLoading}
            />
        </div>
        <button
          onClick={handleSend}
          disabled={!canSend}
          className="p-3 self-center rounded-full bg-green-600 text-white disabled:bg-gray-300 dark:disabled:bg-gray-600 hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          aria-label="Send Message"
        >
          <SendIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
