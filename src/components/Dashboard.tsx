import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Plus, 
  Eye, 
  Target,
  Clock,
  Users,
  Settings,
  LogOut,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Play
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data
  const stats = {
    skills: 12,
    projects: 8,
    certifications: 5,
    overallProgress: 75
  };

  const recentActivities = [
    { id: 1, type: 'skill', title: 'Completed React Hooks', date: '2 hours ago' },
    { id: 2, type: 'project', title: 'Added Portfolio Website', date: '1 day ago' },
    { id: 3, type: 'certification', title: 'AWS Cloud Practitioner', date: '3 days ago' },
  ];

  const skills = [
    { name: 'React', level: 85, category: 'Frontend' },
    { name: 'Python', level: 75, category: 'Backend' },
    { name: 'AWS', level: 60, category: 'Cloud' },
    { name: 'TypeScript', level: 70, category: 'Frontend' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-primary">SkillVault</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`font-medium transition-colors ${activeTab === 'overview' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('skills')}
                className={`font-medium transition-colors ${activeTab === 'skills' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Skills
              </button>
              <button 
                onClick={() => setActiveTab('projects')}
                className={`font-medium transition-colors ${activeTab === 'projects' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Projects
              </button>
              <button 
                onClick={() => setActiveTab('certifications')}
                className={`font-medium transition-colors ${activeTab === 'certifications' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Certifications
              </button>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Section with Student Snapshot */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="text-center lg:text-left space-y-4">
                <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
                <p className="text-muted-foreground">Track your learning progress and achieve your goals</p>
              </div>
              
              {/* Student Snapshot Card - Top Right */}
              <Card className="w-full lg:w-80 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Student Snapshot
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                      <User className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg">John Doe</h3>
                    <p className="text-sm text-muted-foreground">Computer Science Student</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 pt-3 border-t">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{stats.skills}</div>
                      <div className="text-xs text-muted-foreground">Skills</div>
                    </div>
                    <div className="text-center border-x">
                      <div className="text-2xl font-bold text-primary">{stats.projects}</div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{stats.certifications}</div>
                      <div className="text-xs text-muted-foreground">Certificates</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Skills</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.skills}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                  <div className="flex justify-between items-center mt-4">
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Projects</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.projects}</div>
                  <p className="text-xs text-muted-foreground">+1 from last week</p>
                  <div className="flex justify-between items-center mt-4">
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Certifications</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.certifications}</div>
                  <p className="text-xs text-muted-foreground">+3 from last month</p>
                  <div className="flex justify-between items-center mt-4">
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Progress</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.overallProgress}%</div>
                  <p className="text-xs text-muted-foreground">Overall completion</p>
                  <Progress value={stats.overallProgress} className="mt-4" />
                </CardContent>
              </Card>
            </div>

            {/* Charts and Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Skills Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Skills Progress
                  </CardTitle>
                  <CardDescription>Your current skill levels across different categories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{skill.category}</Badge>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Recent Activities
                  </CardTitle>
                  <CardDescription>Your latest learning activities and achievements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        {activity.type === 'skill' && <Target className="w-4 h-4 text-primary-foreground" />}
                        {activity.type === 'project' && <BookOpen className="w-4 h-4 text-primary-foreground" />}
                        {activity.type === 'certification' && <Award className="w-4 h-4 text-primary-foreground" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Activities
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Career Gap Filler Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Career Gap Filler Suggestions
                </CardTitle>
                <CardDescription>Personalized recommendations to boost your career prospects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Build a Personal Portfolio Website", duration: "1 Week", description: "Showcase your projects and skills" },
                    { title: "Complete React Certification", duration: "2 Weeks", description: "Industry-recognized frontend certification" },
                    { title: "Contribute to Open Source Project", duration: "3 Days", description: "Gain collaborative development experience" },
                    { title: "Create a Mobile App", duration: "10 Days", description: "Learn cross-platform development" }
                  ].map((suggestion, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{suggestion.title}</h4>
                          <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                          <div className="flex items-center mt-1">
                            <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{suggestion.duration}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <Play className="w-4 h-4 mr-2" />
                        Start Now
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Recommendations */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 mr-2" />
                  Skill Recommendations
                </h2>
                <p className="text-muted-foreground mt-2">Skills that could enhance your career prospects</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { 
                    skill: "Public Speaking", 
                    reason: "Helpful for placement interviews", 
                    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
                    iconColor: "text-blue-600"
                  },
                  { 
                    skill: "Data Analysis", 
                    reason: "High demand in tech industry", 
                    color: "bg-green-50 border-green-200 hover:bg-green-100",
                    iconColor: "text-green-600"
                  },
                  { 
                    skill: "UI/UX Design", 
                    reason: "Complements your development skills", 
                    color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
                    iconColor: "text-purple-600"
                  }
                ].map((recommendation, index) => (
                  <Card key={index} className={`${recommendation.color} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                    <CardContent className="p-6 text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${recommendation.color.replace('50', '100').replace('hover:bg-', 'bg-')}`}>
                        <Lightbulb className={`w-6 h-6 ${recommendation.iconColor}`} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{recommendation.skill}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{recommendation.reason}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Start Learning
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content can be added here */}
        {activeTab !== 'overview' && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground">
              The {activeTab} section is currently under development.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
