import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import LandingPage from '@/components/LandingPage';
import StudentDashboard from '@/components/StudentDashboard';
import PeerForum from '@/components/PeerForum';
import ResourceHub from '@/components/ResourceHub';
import EmergencyModal from '@/components/EmergencyModal';
import FloatingEmergencyButton from '@/components/FloatingEmergencyButton';

const Index = () => {
  const navigate = useNavigate();
  const { user, userRole, signOut, loading } = useAuth();
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'forum' | 'resources'>('landing');
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleLogout = async () => {
    await signOut();
    setCurrentView('landing');
  };

  const handleEmergencyClick = () => {
    setIsEmergencyModalOpen(true);
  };

  const renderCurrentView = () => {
    // Show landing page if not authenticated
    if (!user) {
      return <LandingPage onGetStarted={handleGetStarted} />;
    }

    // Show appropriate view based on authentication and current selection
    switch (currentView) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'forum':
        return <PeerForum />;
      case 'resources':
        return <ResourceHub />;
      default:
        return <StudentDashboard />; // Default to dashboard for authenticated users
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-soul-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        userRole={userRole} 
        onEmergencyClick={handleEmergencyClick}
        onNavigate={setCurrentView}
        currentView={currentView}
        onLogout={handleLogout}
      />
      
      {renderCurrentView()}
      
      <FloatingEmergencyButton onClick={handleEmergencyClick} />
      
      <EmergencyModal 
        isOpen={isEmergencyModalOpen} 
        onClose={() => setIsEmergencyModalOpen(false)} 
      />

      {/* Navigation Helper - Show only for authenticated users */}
      {user && userRole && (
        <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-3 py-2 text-sm rounded-lg soul-transition ${
              currentView === 'dashboard' 
                ? 'bg-soul-blue text-white' 
                : 'bg-white text-soul-blue border border-soul-blue hover:bg-soul-blue/10'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('resources')}
            className={`px-3 py-2 text-sm rounded-lg soul-transition ${
              currentView === 'resources' 
                ? 'bg-soul-blue text-white' 
                : 'bg-white text-soul-blue border border-soul-blue hover:bg-soul-blue/10'
            }`}
          >
            Resources
          </button>
          <button
            onClick={() => setCurrentView('forum')}
            className={`px-3 py-2 text-sm rounded-lg soul-transition ${
              currentView === 'forum' 
                ? 'bg-soul-blue text-white' 
                : 'bg-white text-soul-blue border border-soul-blue hover:bg-soul-blue/10'
            }`}
          >
            Forum
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
