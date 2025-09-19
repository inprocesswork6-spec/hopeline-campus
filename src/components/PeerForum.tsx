import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageCircle, 
  UserPlus, 
  Plus, 
  Search, 
  Filter,
  Clock,
  TrendingUp
} from 'lucide-react';

interface ForumPost {
  id: string;
  author: string;
  authorAvatar: string;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: string;
  isLiked: boolean;
  isFollowing: boolean;
}

const mockPosts: ForumPost[] = [
  {
    id: '1',
    author: 'QuietPanda',
    authorAvatar: 'QP',
    title: 'Dealing with exam anxiety - what works for you?',
    content: 'Finals are coming up and I\'m feeling overwhelmed. I\'ve tried meditation but my mind keeps racing. Has anyone found techniques that actually help during high-stress periods?',
    timestamp: '2 hours ago',
    likes: 12,
    comments: 8,
    category: 'Academic Stress',
    isLiked: false,
    isFollowing: false
  },
  {
    id: '2',
    author: 'WiseOwl',
    authorAvatar: 'WO',
    title: 'Small wins matter - celebrating progress',
    content: 'Just wanted to share that I made it to all my classes this week after struggling with depression. It might seem small but it feels huge to me. Remember to celebrate your wins, no matter how small! 💙',
    timestamp: '5 hours ago',
    likes: 24,
    comments: 15,
    category: 'Depression',
    isLiked: true,
    isFollowing: true
  },
  {
    id: '3',
    author: 'CalmWaves',
    authorAvatar: 'CW',
    title: 'Sleep schedule tips for better mental health',
    content: 'I\'ve been working on fixing my sleep schedule and wanted to share what\'s been helping me. Consistent bedtime, no screens 1 hour before bed, and a short gratitude practice. What are your sleep hygiene tips?',
    timestamp: '1 day ago',
    likes: 18,
    comments: 12,
    category: 'Sleep & Wellness',
    isLiked: false,
    isFollowing: false
  }
];

const categories = [
  'All Topics',
  'Academic Stress', 
  'Anxiety',
  'Depression',
  'Sleep & Wellness',
  'Relationships',
  'Self-Care'
];

const PeerForum: React.FC = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Academic Stress');

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleFollow = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isFollowing: !post.isFollowing }
        : post
    ));
  };

  const filteredPosts = selectedCategory === 'All Topics' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-soul-lavender to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold font-inter mb-2">
              Peer Support <span className="text-soul-blue">Forum</span>
            </h1>
            <p className="text-muted-foreground">
              Connect with fellow students in a safe, anonymous space
            </p>
          </div>
          
          <Button 
            onClick={() => setShowNewPost(true)}
            className="mt-4 md:mt-0 bg-soul-blue hover:bg-soul-blue-dark soul-transition"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search posts..." 
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer soul-transition ${
                  selectedCategory === category 
                    ? 'bg-soul-blue hover:bg-soul-blue-dark' 
                    : 'hover:bg-soul-blue/10 hover:text-soul-blue'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Forum Posts */}
          <div className="lg:col-span-3 space-y-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="soul-shadow-gentle hover:soul-shadow-soft soul-transition">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-soul-blue/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-soul-blue">
                          {post.authorAvatar}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">{post.author}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFollow(post.id)}
                      className={post.isFollowing ? 'text-soul-blue' : ''}
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      {post.isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  </div>
                  
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <Badge variant="outline" className="w-fit">
                    {post.category}
                  </Badge>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={`soul-transition ${
                          post.isLiked ? 'text-destructive hover:text-destructive/80' : ''
                        }`}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                        {post.likes}
                      </Button>
                      
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Guidelines */}
            <Card className="soul-shadow-gentle">
              <CardHeader>
                <CardTitle className="text-lg">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Be kind and supportive</li>
                  <li>• Respect anonymity</li>
                  <li>• No personal information</li>
                  <li>• Crisis? Use emergency support</li>
                  <li>• Report inappropriate content</li>
                </ul>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="soul-shadow-gentle">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-soul-mint" />
                  <span className="text-lg">Trending</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">#ExamStress</span>
                    <span className="text-muted-foreground ml-2">42 posts</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">#SelfCare</span>
                    <span className="text-muted-foreground ml-2">28 posts</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">#Sleep</span>
                    <span className="text-muted-foreground ml-2">21 posts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* New Post Modal */}
        {showNewPost && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl soul-shadow-floating">
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Post title..."
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                  
                  <select 
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  <Textarea
                    placeholder="Share your thoughts, ask for support, or offer encouragement..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={6}
                  />
                  
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setShowNewPost(false)}>
                      Cancel
                    </Button>
                    <Button 
                      className="bg-soul-blue hover:bg-soul-blue-dark"
                      onClick={() => {
                        // In real app: save to Firebase
                        setShowNewPost(false);
                        setNewPostTitle('');
                        setNewPostContent('');
                      }}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeerForum;