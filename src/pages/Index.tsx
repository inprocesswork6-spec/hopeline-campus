import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import LandingPage from '@/components/LandingPage';
import StudentDashboard from '@/components/StudentDashboard';
import PeerForum from '@/components/PeerForum';
import ResourceHub from '@/components/ResourceHub';
import EmergencyModal from '@/components/EmergencyModal';
import FloatingEmergencyButton from '@/components/FloatingEmergencyButton';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'forum' | 'resources'>('landing');
  const [userRole, setUserRole] = useState<'student' | 'counselor' | 'admin' | null>(null);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  const handleGetStarted = () => {
    // Simulate anonymous authentication
    setUserRole('student');
    setCurrentView('dashboard');
  };

  const handleEmergencyClick = () => {
    setIsEmergencyModalOpen(true);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      case 'dashboard':
        return <StudentDashboard />;
      case 'forum':
        return <PeerForum />;
      case 'resources':
        return <ResourceHub />;
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        userRole={userRole} 
        onEmergencyClick={handleEmergencyClick}
      />
      
      {renderCurrentView()}
      
      <FloatingEmergencyButton onClick={handleEmergencyClick} />
      
      <EmergencyModal 
        isOpen={isEmergencyModalOpen} 
        onClose={() => setIsEmergencyModalOpen(false)} 
      />

      {/* Navigation Helper - In real app this would be proper routing */}
      {userRole === 'student' && (
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
