import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, ExternalLink, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  title: string;
  technology: string;
  url: string;
  description: string;
  duration: string;
}

const Projects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    technology: "",
    url: "",
    description: "",
    duration: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.technology || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (editingId) {
      setProjects(projects.map(project => 
        project.id === editingId ? { ...formData, id: editingId } : project
      ));
      setEditingId(null);
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
    } else {
      const newProject: Project = {
        ...formData,
        id: Date.now().toString(),
      };
      setProjects([...projects, newProject]);
      toast({
        title: "Success",
        description: "Project added successfully",
      });
    }

    setFormData({
      title: "",
      technology: "",
      url: "",
      description: "",
      duration: "",
    });
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
    toast({
      title: "Success",
      description: "Project deleted successfully",
    });
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Header with Back Button */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              ← Back to Home
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Projects
            </h1>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Add Project Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-primary">
                {editingId ? "Edit Project" : "Add New Project"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter project title"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="technology">Technology Used *</Label>
                    <Input
                      id="technology"
                      value={formData.technology}
                      onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                      placeholder="e.g., React, Node.js, Python"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url">GitHub/Live URL</Label>
                    <Input
                      id="url"
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://github.com/username/project"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      placeholder="e.g., 2 months, 1 week"
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your project, its features, and your role..."
                    className="rounded-lg min-h-[100px]"
                    rows={4}
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="px-8">
                    {editingId ? "Update Project" : "Add Project"}
                  </Button>
                  {editingId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingId(null);
                        setFormData({
                          title: "",
                          technology: "",
                          url: "",
                          description: "",
                          duration: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Projects List */}
          {projects.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary">Your Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-primary leading-tight">
                          {project.title}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(project)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(project.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Technology:</span>
                        <p className="text-sm mt-1">{project.technology}</p>
                      </div>
                      
                      {project.duration && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Duration:</span>
                          <p className="text-sm mt-1">{project.duration}</p>
                        </div>
                      )}
                      
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Description:</span>
                        <p className="text-sm mt-1 line-clamp-3">{project.description}</p>
                      </div>
                      
                      {project.url && isValidUrl(project.url) && (
                        <div className="pt-2">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            {project.url.includes('github.com') ? (
                              <Github className="h-4 w-4" />
                            ) : (
                              <ExternalLink className="h-4 w-4" />
                            )}
                            View Project
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {projects.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground text-lg">
                  No projects added yet. Start by adding your first project above!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;