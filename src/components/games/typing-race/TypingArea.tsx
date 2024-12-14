import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

interface TypingAreaProps {
  currentWord: string;
  onType: (word: string) => void;
}

export const TypingArea = ({ currentWord, onType }: TypingAreaProps) => {
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentWord]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    
    if (trimmedInput.toLowerCase() !== currentWord.toLowerCase()) {
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
    } else {
      setIsError(false);
    }
    
    onType(trimmedInput);
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsError(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary-foreground tracking-wide"
          >
            {currentWord}
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Tapez le mot ci-dessus et appuyez sur Entrée
        </motion.div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <motion.div
          animate={isError ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            className={`text-xl text-center tracking-wide ${
              isError ? "border-red-500" : ""
            }`}
            placeholder="Tapez le mot ici..."
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </motion.div>
      </form>
    </motion.div>
  );
};