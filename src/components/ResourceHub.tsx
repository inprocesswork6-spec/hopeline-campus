import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Video, 
  Headphones, 
  Search, 
  Filter, 
  ExternalLink,
  Clock,
  Star
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'audio';
  category: string;
  duration?: string;
  rating: number;
  url: string;
  isBookmarked: boolean;
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Managing Academic Stress: A Student\'s Guide',
    description: 'Comprehensive strategies for handling academic pressure, time management, and maintaining balance during busy periods.',
    type: 'article',
    category: 'Academic Stress',
    duration: '8 min read',
    rating: 4.8,
    url: '#',
    isBookmarked: false
  },
  {
    id: '2',
    title: 'Deep Breathing for Anxiety Relief',
    description: 'Guided meditation and breathing exercises specifically designed to help students manage anxiety and panic attacks.',
    type: 'audio',
    category: 'Anxiety',
    duration: '15 min',
    rating: 4.9,
    url: '#',
    isBookmarked: true
  },
  {
    id: '3',
    title: 'Sleep Hygiene for Better Mental Health',
    description: 'Expert tips on improving sleep quality to support mental wellness and academic performance.',
    type: 'video',
    category: 'Sleep & Wellness',
    duration: '12 min',
    rating: 4.7,
    url: '#',
    isBookmarked: false
  },
  {
    id: '4',
    title: 'Building Resilience in College',
    description: 'Learn practical skills to bounce back from challenges and build emotional strength during your academic journey.',
    type: 'article',
    category: 'Personal Growth',
    duration: '6 min read',
    rating: 4.6,
    url: '#',
    isBookmarked: false
  },
  {
    id: '5',
    title: 'Mindful Study Techniques',
    description: 'Combine mindfulness practices with effective study methods to reduce stress and improve focus.',
    type: 'video',
    category: 'Academic Stress',
    duration: '18 min',
    rating: 4.8,
    url: '#',
    isBookmarked: true
  },
  {
    id: '6',
    title: 'Progressive Muscle Relaxation',
    description: 'Audio guide for releasing physical tension and calming the mind, perfect for end-of-day wind-down.',
    type: 'audio',
    category: 'Relaxation',
    duration: '20 min',
    rating: 4.9,
    url: '#',
    isBookmarked: false
  }
];

const categories = [
  'All Resources',
  'Academic Stress',
  'Anxiety',
  'Depression',
  'Sleep & Wellness',
  'Personal Growth',
  'Relaxation'
];

const ResourceHub: React.FC = () => {
  const [resources, setResources] = useState(mockResources);
  const [selectedCategory, setSelectedCategory] = useState('All Resources');
  const [selectedType, setSelectedType] = useState<'all' | 'article' | 'video' | 'audio'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleBookmark = (resourceId: string) => {
    setResources(resources.map(resource => 
      resource.id === resourceId 
        ? { ...resource, isBookmarked: !resource.isBookmarked }
        : resource
    ));
  };

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All Resources' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesType && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <BookOpen className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'audio':
        return <Headphones className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'article':
        return 'text-soul-blue';
      case 'video':
        return 'text-soul-mint';
      case 'audio':
        return 'text-purple-600';
      default:
        return 'text-soul-blue';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soul-lavender to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-inter mb-2">
            Resource <span className="text-soul-blue">Hub</span>
          </h1>
          <p className="text-muted-foreground">
            Curated mental health resources designed specifically for students
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search resources..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('all')}
                className={selectedType === 'all' ? 'bg-soul-blue hover:bg-soul-blue-dark' : ''}
              >
                All Types
              </Button>
              <Button
                variant={selectedType === 'article' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('article')}
                className={`${selectedType === 'article' ? 'bg-soul-blue hover:bg-soul-blue-dark' : ''} ${
                  selectedType !== 'article' ? 'hover:bg-soul-blue/10' : ''
                }`}
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Articles
              </Button>
              <Button
                variant={selectedType === 'video' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('video')}
                className={`${selectedType === 'video' ? 'bg-soul-mint hover:bg-soul-mint-light' : ''} ${
                  selectedType !== 'video' ? 'hover:bg-soul-mint/10' : ''
                }`}
              >
                <Video className="w-4 h-4 mr-1" />
                Videos
              </Button>
              <Button
                variant={selectedType === 'audio' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('audio')}
                className={`${selectedType === 'audio' ? 'bg-purple-600 hover:bg-purple-700' : ''} ${
                  selectedType !== 'audio' ? 'hover:bg-purple-100' : ''
                }`}
              >
                <Headphones className="w-4 h-4 mr-1" />
                Audio
              </Button>
            </div>
          </div>

          {/* Category Filter */}
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

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="soul-shadow-gentle hover:soul-shadow-soft soul-transition h-full">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-2 rounded-lg ${getTypeColor(resource.type)} bg-current/10`}>
                    {getTypeIcon(resource.type)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBookmark(resource.id)}
                    className={resource.isBookmarked ? 'text-yellow-500 hover:text-yellow-600' : 'text-muted-foreground'}
                  >
                    <Star className={`w-4 h-4 ${resource.isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                
                <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{resource.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-current text-yellow-500" />
                    <span>{resource.rating}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {resource.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {resource.category}
                  </Badge>
                  
                  <Button 
                    size="sm" 
                    className="bg-soul-blue hover:bg-soul-blue-dark"
                    onClick={() => window.open(resource.url, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No resources found matching your criteria.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSelectedCategory('All Resources');
                setSelectedType('all');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceHub;