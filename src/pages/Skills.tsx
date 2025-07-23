import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Edit, Trash2, Plus, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  dateAdded: string;
}

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    level: '' as 'Beginner' | 'Intermediate' | 'Advanced' | '',
    description: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.level || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (editingId) {
      // Update existing skill
      setSkills(skills.map(skill => 
        skill.id === editingId 
          ? { ...skill, ...formData, level: formData.level as 'Beginner' | 'Intermediate' | 'Advanced' }
          : skill
      ));
      setEditingId(null);
      toast({
        title: "Success",
        description: "Skill updated successfully"
      });
    } else {
      // Add new skill
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: formData.name,
        level: formData.level as 'Beginner' | 'Intermediate' | 'Advanced',
        description: formData.description,
        dateAdded: new Date().toLocaleDateString()
      };
      setSkills([...skills, newSkill]);
      toast({
        title: "Success",
        description: "Skill added successfully"
      });
    }

    // Reset form
    setFormData({ name: '', level: '', description: '' });
  };

  const handleEdit = (skill: Skill) => {
    setFormData({
      name: skill.name,
      level: skill.level,
      description: skill.description
    });
    setEditingId(skill.id);
  };

  const handleDelete = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
    toast({
      title: "Success",
      description: "Skill deleted successfully"
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', level: '', description: '' });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => window.history.back()}
                className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Skills Management</h1>
                  <p className="text-white/70">Track and manage your professional skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Add/Edit Skill Form */}
        <Card className="shadow-lg border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5 text-primary" />
              <span>{editingId ? 'Edit Skill' : 'Add New Skill'}</span>
            </CardTitle>
            <CardDescription>
              {editingId ? 'Update your skill information' : 'Add a new skill to your portfolio'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Skill Name</label>
                  <Input
                    type="text"
                    placeholder="e.g., React.js, Project Management, Python"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="rounded-xl border-border focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Skill Level</label>
                  <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value as any })}>
                    <SelectTrigger className="rounded-xl border-border focus:border-primary">
                      <SelectValue placeholder="Select your skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea
                  placeholder="Describe your experience with this skill, projects you've worked on, or specific areas of expertise..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="rounded-xl border-border focus:border-primary min-h-[100px]"
                />
              </div>

              <div className="flex space-x-4">
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8"
                >
                  {editingId ? 'Update Skill' : 'Add Skill'}
                </Button>
                {editingId && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={cancelEdit}
                    className="rounded-xl px-8"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Skills List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Your Skills ({skills.length})</h2>
          </div>

          {skills.length === 0 ? (
            <Card className="border-dashed border-2 border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No skills added yet</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Start building your skill portfolio by adding your first skill using the form above.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {skills.map((skill) => (
                <Card key={skill.id} className="shadow-sm hover:shadow-md transition-shadow border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-semibold text-foreground">{skill.name}</h3>
                          <Badge className={`${getLevelColor(skill.level)} font-medium`}>
                            {skill.level}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{skill.description}</p>
                        <p className="text-sm text-muted-foreground">Added on {skill.dateAdded}</p>
                      </div>
                      
                      <div className="flex space-x-2 ml-6">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(skill)}
                          className="rounded-lg"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(skill.id)}
                          className="rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;