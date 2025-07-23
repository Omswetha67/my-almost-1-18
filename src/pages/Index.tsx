import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, User, Target, TrendingUp, Award, Users, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthModals } from '@/components/AuthModals';
import { Dashboard } from '@/components/Dashboard';
import collegeStudentsImage from '@/assets/college-students.jpg';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [triggerSignup, setTriggerSignup] = useState(false);

  const handleGetStarted = () => {
    setTriggerSignup(true);
    // Reset after a brief moment to allow the modal to open
    setTimeout(() => setTriggerSignup(false), 100);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        <div className="absolute -bottom-8 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-1000"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-float-delayed opacity-80"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-float opacity-70"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-float-delayed opacity-60"></div>
      </div>
      
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 backdrop-blur-[1px] bg-black/5"></div>
      {/* Header with Student Profile and Login */}
      <header className="relative bg-white/10 backdrop-blur-md border-b border-white/20 shadow-2xl z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Student Profile - Top Left */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="font-medium">Student Profile</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center text-xl">
                    <User className="w-6 h-6 mr-2" />
                    Student Profile
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  {/* Profile Header */}
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold">John Doe</h2>
                      <p className="text-muted-foreground text-sm">Computer Science Student</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">3rd Year</Badge>
                        <Badge variant="outline" className="text-xs">Full-time</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <Card className="bg-gradient-to-br from-card to-muted/30 border-primary/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="w-3 h-3 text-primary" />
                        <span>john.doe@university.edu</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="w-3 h-3 text-primary" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-3 h-3 text-primary" />
                        <span>Campus, Room 123</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-3 h-3 text-primary" />
                        <span>Graduation: May 2025</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Academic Progress */}
                  <div className="grid grid-cols-3 gap-3">
                    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                      <CardContent className="p-3 text-center">
                        <div className="text-xl font-bold text-primary">3.8</div>
                        <div className="text-xs text-muted-foreground">GPA</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
                      <CardContent className="p-3 text-center">
                        <div className="text-xl font-bold text-accent">92</div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/40">
                      <CardContent className="p-3 text-center">
                        <div className="text-xl font-bold text-secondary-foreground">128</div>
                        <div className="text-xs text-muted-foreground">Required</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Skills & Achievements Summary */}
                  <div className="space-y-3">
                    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          <Target className="w-3 h-3 mr-1" />
                          Skills Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-xs">Programming</span>
                          <Badge variant="secondary" className="text-xs px-2 py-0.5">Advanced</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs">Web Development</span>
                          <Badge variant="secondary" className="text-xs px-2 py-0.5">Intermediate</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs">Data Analysis</span>
                          <Badge variant="secondary" className="text-xs px-2 py-0.5">Beginner</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          <Award className="w-3 h-3 mr-1" />
                          Recent Achievements
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-1">
                        <div className="text-xs flex items-center"><span className="text-green-500 mr-1">✅</span> React Certification</div>
                        <div className="text-xs flex items-center"><span className="text-green-500 mr-1">✅</span> Portfolio Project</div>
                        <div className="text-xs flex items-center"><span className="text-green-500 mr-1">✅</span> Dean's List - Fall 2024</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Login Button - Top Right */}
            <AuthModals onLoginSuccess={handleLoginSuccess} triggerSignup={triggerSignup} />
          </div>
        </div>
      </header>

      {/* Navigation Bar - Behind Progress */}
      <nav className="bg-white/5 backdrop-blur-xl border-b border-white/10 relative z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-12">
            <Link to="/" className="text-white/70 hover:text-white transition-all duration-300 font-medium text-lg hover:scale-105 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/skills" className="text-white/70 hover:text-white transition-all duration-300 font-medium text-lg hover:scale-105 relative group">
              Skills
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/projects" className="text-white/70 hover:text-white transition-all duration-300 font-medium text-lg hover:scale-105 relative group">
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/certificates" className="text-white/70 hover:text-white transition-all duration-300 font-medium text-lg hover:scale-105 relative group">
              Certificates
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/progress" className="text-white/70 hover:text-white transition-all duration-300 font-medium text-lg hover:scale-105 relative group">
              Progress
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
          {/* Welcome Content */}
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Brand Logo */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-2xl animate-pulse">
                <BookOpen className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                SkillVault
              </span>
            </div>

            {/* Welcome to SkillVault - Center of the page */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-white">Welcome to</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  SkillVault
                </span>
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed">
                Your comprehensive platform for tracking skills, managing projects, earning certifications, 
                and monitoring your learning progress. Build your future, one skill at a time.
              </p>
            </div>


            {/* Call to Action */}
            <div className="flex justify-center pt-8">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                Get Started Free
              </Button>
            </div>
          </div>

        </div>

        {/* Additional Features Section */}
        <section className="py-20 border-t border-border mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed specifically for students to track, manage, and showcase their academic and professional development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Smart Goal Setting</h3>
              <p className="text-muted-foreground leading-relaxed">
                Set SMART goals for your skills and track your progress with detailed analytics and milestone tracking.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Collaborative Learning</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with peers, share projects, and learn together in a supportive community environment.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Career Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get personalized recommendations and insights to accelerate your career growth and opportunities.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-primary">SkillVault</span>
            </div>
            <p className="text-muted-foreground mb-8">
              Empowering students to build, track, and showcase their skills for a successful future.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
              <a href="#" className="hover:text-primary transition-colors">Help Center</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;