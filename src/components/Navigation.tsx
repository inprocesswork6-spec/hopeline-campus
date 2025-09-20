import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Menu, User, LogOut } from 'lucide-react';
interface NavigationProps {
  userRole?: 'student' | 'counselor' | 'admin' | null;
  onEmergencyClick: () => void;
  onNavigate?: (view: 'landing' | 'dashboard' | 'forum' | 'resources') => void;
  currentView?: string;
  onLogout?: () => void;
}
const Navigation: React.FC<NavigationProps> = ({
  userRole,
  onEmergencyClick,
  onNavigate,
  currentView,
  onLogout
}) => {
  return <nav className="bg-card soul-shadow-gentle border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate?.('landing')}>
            <div className="w-8 h-8 bg-gradient-to-r from-soul-blue to-soul-mint rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold font-inter bg-gradient-to-r from-soul-blue to-soul-mint bg-clip-text text-transparent mx-[15px] px-0 py-0 my-0">HOPELINE </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => onNavigate?.('landing')} className={`text-foreground hover:text-soul-blue soul-transition ${currentView === 'landing' ? 'text-soul-blue font-semibold' : ''}`}>
              Home
            </button>
            {userRole === 'student' && <>
                <button onClick={() => onNavigate?.('dashboard')} className={`text-foreground hover:text-soul-blue soul-transition ${currentView === 'dashboard' ? 'text-soul-blue font-semibold' : ''}`}>
                  Dashboard
                </button>
                <button onClick={() => onNavigate?.('resources')} className={`text-foreground hover:text-soul-blue soul-transition ${currentView === 'resources' ? 'text-soul-blue font-semibold' : ''}`}>
                  Resources
                </button>
                <button onClick={() => onNavigate?.('forum')} className={`text-foreground hover:text-soul-blue soul-transition ${currentView === 'forum' ? 'text-soul-blue font-semibold' : ''}`}>
                  Forum
                </button>
                <button className="text-foreground hover:text-soul-blue soul-transition">
                  Book Session
                </button>
              </>}
            {userRole === 'counselor' && <>
                <button onClick={() => onNavigate?.('dashboard')} className={`text-foreground hover:text-soul-blue soul-transition ${currentView === 'dashboard' ? 'text-soul-blue font-semibold' : ''}`}>
                  Dashboard
                </button>
                <button className="text-foreground hover:text-soul-blue soul-transition">
                  Appointments
                </button>
              </>}
            {userRole === 'admin' && <button className="text-foreground hover:text-soul-blue soul-transition">
                Admin Dashboard
              </button>}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {/* Emergency Button */}
            <Button onClick={onEmergencyClick} variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground soul-transition">
              <Heart className="w-4 h-4 mr-1" />
              Emergency
            </Button>

            {/* User Menu */}
            {userRole ? <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-1" />
                  {userRole === 'student' ? 'Anonymous' : 'Profile'}
                </Button>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div> : <Button variant="default" size="sm" className="bg-soul-blue hover:bg-soul-blue-dark">
                Get Started
              </Button>}

            {/* Mobile Menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navigation;