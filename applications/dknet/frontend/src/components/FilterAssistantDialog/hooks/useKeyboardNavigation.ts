import { useEffect } from 'react';
import { KEYBOARD_KEYS } from '../constants';

interface UseKeyboardNavigationProps {
  onNext: () => void;
  isLastQuestion: boolean;
}

export const useKeyboardNavigation = ({ onNext, isLastQuestion }: UseKeyboardNavigationProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === KEYBOARD_KEYS.ENTER) {
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