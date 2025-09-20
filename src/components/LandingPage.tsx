import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield, Users, Brain, BookOpen, MessageCircle, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const navigate = useNavigate();

  const handleAuthRedirect = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-soul-lavender via-background to-soul-blue/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-soul-blue/10 border border-soul-blue/20 rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-soul-blue" />
              <span className="text-sm font-medium text-soul-blue">
                Confidential • Anonymous • Safe
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold font-inter mb-6 leading-tight">
              Your Mental Health
              <span className="block bg-gradient-to-r from-soul-blue to-soul-mint bg-clip-text text-transparent">
                Matters
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              A safe, anonymous space for students to access mental health resources, 
              connect with peers, and find professional support when needed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={handleAuthRedirect}
                className="bg-soul-blue hover:bg-soul-blue-dark text-lg px-8 py-6 soul-shadow-soft hover:soul-shadow-floating soul-transition-bounce"
              >
                <Heart className="w-5 h-5 mr-2" />
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 border-soul-blue text-soul-blue hover:bg-soul-blue hover:text-white soul-transition"
              >
                Learn More
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-soul-mint" />
                <span>100% Anonymous</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-soul-blue" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-soul-mint" />
                <span>Peer Community</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-inter mb-4">
              Everything You Need for 
              <span className="text-soul-blue"> Mental Wellness</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support designed specifically for students in higher education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Support */}
            <Card className="soul-shadow-gentle hover:soul-shadow-soft soul-transition">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-soul-blue to-soul-mint rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle>AI-Guided Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get immediate, personalized guidance and coping strategies through our AI-powered chatbot, available 24/7.
                </p>
              </CardContent>
            </Card>

            {/* Peer Support */}
            <Card className="soul-shadow-gentle hover:soul-shadow-soft soul-transition">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-soul-mint to-soul-blue rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Peer Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with fellow students anonymously in our supportive forum. Share experiences and find solidarity.
                </p>
              </CardContent>
            </Card>

            {/* Professional Help */}
            <Card className="soul-shadow-gentle hover:soul-shadow-soft soul-transition">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-soul-blue to-soul-mint rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Professional Counseling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Book confidential sessions with licensed mental health professionals who understand student life.
                </p>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="soul-shadow-gentle hover:soul-shadow-soft soul-transition">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-soul-mint to-soul-blue rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Resource Library</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access curated articles, videos, and audio guides on topics like stress, anxiety, and academic pressure.
                </p>
              </CardContent>
            </Card>

            {/* Anonymous Access */}
            <Card className="soul-shadow-gentle hover:soul-shadow-soft soul-transition">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-soul-blue to-soul-mint rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Complete Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No personal information required. Access all features anonymously while maintaining your privacy and security.
                </p>
              </CardContent>
            </Card>

            {/* Crisis Support */}
            <Card className="soul-shadow-gentle hover:soul-shadow-soft soul-transition border-destructive/20">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-destructive to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Emergency Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Immediate access to crisis hotlines and emergency counseling when you need help right away.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-soul-blue to-soul-mint">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6 font-inter">
              Ready to prioritize your mental health?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of students who have found support, connection, and healing through Soul Sync.
            </p>
            <Button 
              size="lg"
              onClick={handleAuthRedirect}
              className="bg-white text-soul-blue hover:bg-gray-100 text-lg px-8 py-6 soul-shadow-floating hover:soul-shadow-soft soul-transition-bounce"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;