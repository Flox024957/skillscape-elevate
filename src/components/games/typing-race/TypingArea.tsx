import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TypingAreaProps {
  currentWord: string;
  onType: (word: string) => void;
}

export const TypingArea = ({ currentWord, onType }: TypingAreaProps) => {
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    setShowHint(false);
    
    // Show hint after 3 seconds of inactivity
    const timer = setTimeout(() => {
      if (input === "") {
        setShowHint(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentWord, input]);

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
    setShowHint(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsError(false);
    setShowHint(false);
  };

  const getWordWithHighlight = () => {
    const inputChars = input.split('');
    const wordChars = currentWord.split('');
    
    return wordChars.map((char, index) => {
      let color = "text-muted-foreground";
      if (index < inputChars.length) {
        color = inputChars[index].toLowerCase() === char.toLowerCase() 
          ? "text-green-500" 
          : "text-red-500";
      }
      return (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={color}
        >
          {char}
        </motion.span>
      );
    });
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
            className="text-4xl font-bold tracking-wide font-mono"
          >
            {getWordWithHighlight()}
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence>
          {showHint && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-sm text-muted-foreground"
            >
              Commencez à taper le mot ci-dessus...
            </motion.div>
          )}
        </AnimatePresence>
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
            className={cn(
              "text-xl text-center tracking-wide font-mono",
              "transition-all duration-200",
              "focus:ring-2 focus:ring-offset-2",
              isError 
                ? "border-red-500 focus:ring-red-500" 
                : "focus:ring-primary"
            )}
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