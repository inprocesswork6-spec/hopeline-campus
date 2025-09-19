import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, BookOpen, Users, MessageCircle, Heart, TrendingUp } from 'lucide-react';

const moodOptions = [
  { emoji: '😊', label: 'Great', value: 5, color: 'text-soul-mint' },
  { emoji: '🙂', label: 'Good', value: 4, color: 'text-soul-mint-light' },
  { emoji: '😐', label: 'Okay', value: 3, color: 'text-soul-gray' },
  { emoji: '😟', label: 'Not Great', value: 2, color: 'text-orange-500' },
  { emoji: '😢', label: 'Struggling', value: 1, color: 'text-destructive' },
];

const StudentDashboard: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodSubmitted, setMoodSubmitted] = useState(false);

  const handleMoodSelect = (value: number) => {
    setSelectedMood(value);
    setMoodSubmitted(true);
    // In real app: save to Firebase
    setTimeout(() => setMoodSubmitted(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soul-lavender to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold font-inter mb-2">
            Welcome back, <span className="text-soul-blue">Anonymous Panda</span>
          </h1>
          <p className="text-muted-foreground">How are you feeling today? Your wellbeing matters.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mood Tracker */}
          <Card className="lg:col-span-2 soul-shadow-gentle">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-soul-blue" />
                <span>How are you feeling today?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-3 mb-4">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => handleMoodSelect(mood.value)}
                    className={`
                      p-4 rounded-lg border-2 soul-transition text-center
                      ${selectedMood === mood.value 
                        ? 'border-soul-blue bg-soul-blue/10' 
                        : 'border-border hover:border-soul-blue/50'
                      }
                    `}
                  >
                    <div className="text-3xl mb-2">{mood.emoji}</div>
                    <div className={`text-sm font-medium ${mood.color}`}>
                      {mood.label}
                    </div>
                  </button>
                ))}
              </div>
              {moodSubmitted && (
                <div className="p-3 bg-soul-mint/10 border border-soul-mint/20 rounded-lg">
                  <p className="text-sm text-soul-mint font-medium">
                    ✓ Mood tracked! Thank you for checking in with yourself.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="soul-shadow-gentle">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-soul-mint" />
                <span>Your Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Weekly Check-ins</span>
                    <span className="text-soul-mint font-semibold">5/7</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-to-r from-soul-mint to-soul-blue h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Resources Used</span>
                    <span className="text-soul-blue font-semibold">12</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Forum Posts</span>
                    <span className="text-soul-gray font-semibold">3</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <Card className="soul-shadow-gentle hover:soul-shadow-soft soul-transition cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-soul-blue/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-soul-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Support Chat</h3>
                    <p className="text-sm text-muted-foreground">Get instant guidance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="soul-shadow-gentle hover:soul-shadow-soft soul-transition cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-soul-mint/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-soul-mint" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Book Session</h3>
                    <p className="text-sm text-muted-foreground">Meet with counselor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Appointments */}
          <Card className="soul-shadow-gentle">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-soul-blue" />
                <span>Upcoming Sessions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-soul-blue/5 border border-soul-blue/20 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium text-soul-blue">Dr. Smith</span>
                    <span className="text-xs text-muted-foreground">Tomorrow</span>
                  </div>
                  <p className="text-sm text-muted-foreground">2:00 PM - Individual Session</p>
                </div>
                
                <Button variant="outline" className="w-full">
                  Schedule New Session
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2 soul-shadow-gentle">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-soul-mint" />
                  <span>Community Activity</span>
                </div>
                <Button variant="ghost" size="sm">View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border border-border rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-soul-mint/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-soul-mint">WO</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">WiseOwl</span> shared a helpful tip in 
                        <span className="text-soul-blue"> Managing Exam Stress</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 border border-border rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-soul-blue/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-soul-blue">QP</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold">QuietPanda</span> started a discussion about 
                        <span className="text-soul-blue"> Healthy Sleep Habits</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;