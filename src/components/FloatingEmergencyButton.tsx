import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface FloatingEmergencyButtonProps {
  onClick: () => void;
}

const FloatingEmergencyButton: React.FC<FloatingEmergencyButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-destructive to-orange-500 hover:from-destructive hover:to-red-600 text-white border-0 soul-shadow-floating hover:soul-shadow-soft soul-transition-bounce"
    >
      <Heart className="w-6 h-6" />
      <span className="sr-only">Emergency Support</span>
    </Button>
  );
};

export default FloatingEmergencyButton;