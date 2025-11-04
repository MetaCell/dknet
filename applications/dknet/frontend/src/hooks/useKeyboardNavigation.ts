import { useEffect } from 'react';

interface UseKeyboardNavigationProps {
  onNext: () => void;
  isLastQuestion: boolean;
}

export const useKeyboardNavigation = ({ onNext, isLastQuestion }: UseKeyboardNavigationProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (!isLastQuestion) {
          onNext();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onNext, isLastQuestion]);
};