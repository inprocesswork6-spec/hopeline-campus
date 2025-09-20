import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import LandingPage from '@/components/LandingPage';
import StudentDashboard from '@/components/StudentDashboard';
import PeerForum from '@/components/PeerForum';
import ResourceHub from '@/components/ResourceHub';
import EmergencyModal from '@/components/EmergencyModal';
import FloatingEmergencyButton from '@/components/FloatingEmergencyButton';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'forum' | 'resources'>('landing');
  const [userRole, setUserRole] = useState<'student' | 'counselor' | 'admin' | null>(null);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Set user role based on metadata or default to student
          const role = session.user.user_metadata?.role || 'student';
          setUserRole(role);
          setCurrentView('dashboard');
        } else {
          setUserRole(null);
          setCurrentView('landing');
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const role = session.user.user_metadata?.role || 'student';
        setUserRole(role);
        setCurrentView('dashboard');
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-soul-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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

      {/* Navigation Helper - In real app this would be proper routing */}
      {userRole && (
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
          <button
            onClick={() => navigate('/chatbot')}
            className="px-3 py-2 text-sm rounded-lg soul-transition bg-soul-mint text-white hover:bg-soul-mint-light"
          >
            AI Chat
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
