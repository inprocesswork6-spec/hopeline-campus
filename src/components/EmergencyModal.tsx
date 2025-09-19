import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, Heart, AlertTriangle } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md soul-shadow-floating">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-destructive to-orange-500 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-semibold">
            Emergency Support
          </DialogTitle>
          <DialogDescription className="text-base">
            If you're experiencing a mental health crisis, immediate help is available.
            You're not alone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Crisis Hotline */}
          <div className="p-4 bg-gradient-to-r from-destructive/10 to-orange-50 rounded-lg border border-destructive/20">
            <div className="flex items-center space-x-3 mb-2">
              <Phone className="w-5 h-5 text-destructive" />
              <h3 className="font-semibold text-destructive">Crisis Hotline</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              24/7 crisis support and suicide prevention
            </p>
            <Button 
              variant="destructive" 
              className="w-full soul-transition-bounce"
              onClick={() => window.open('tel:988', '_blank')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call 988
            </Button>
          </div>

          {/* Campus Counseling */}
          <div className="p-4 soul-card border border-soul-blue/20">
            <div className="flex items-center space-x-3 mb-2">
              <Heart className="w-5 h-5 text-soul-blue" />
              <h3 className="font-semibold text-soul-blue">Campus Counseling</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Connect with a campus counselor immediately
            </p>
            <Button 
              variant="default" 
              className="w-full bg-soul-blue hover:bg-soul-blue-dark soul-transition"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Emergency Chat
            </Button>
          </div>

          {/* Text Support */}
          <div className="p-4 bg-gradient-to-r from-soul-mint/10 to-soul-lavender rounded-lg border border-soul-mint/20">
            <div className="flex items-center space-x-3 mb-2">
              <MessageCircle className="w-5 h-5 text-soul-mint" />
              <h3 className="font-semibold text-soul-mint">Text Support</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Text with a crisis counselor
            </p>
            <Button 
              variant="outline" 
              className="w-full border-soul-mint text-soul-mint hover:bg-soul-mint hover:text-white soul-transition"
              onClick={() => window.open('sms:741741', '_blank')}
            >
              Text HOME to 741741
            </Button>
          </div>
        </div>

        <div className="pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Remember: Seeking help is a sign of strength, not weakness.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyModal;