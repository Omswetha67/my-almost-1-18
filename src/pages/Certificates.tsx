import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Edit, Trash2, ExternalLink, FileText, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  certificateLink: string;
  fileName?: string;
}

const Certificates = () => {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    certificateLink: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.issuer || !formData.issueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (editingId) {
      setCertificates(certificates.map(cert => 
        cert.id === editingId ? { 
          ...formData, 
          id: editingId,
          fileName: selectedFile?.name || certificates.find(c => c.id === editingId)?.fileName
        } : cert
      ));
      setEditingId(null);
      toast({
        title: "Success",
        description: "Certificate updated successfully",
      });
    } else {
      const newCertificate: Certificate = {
        ...formData,
        id: Date.now().toString(),
        fileName: selectedFile?.name,
      };
      setCertificates([...certificates, newCertificate]);
      toast({
        title: "Success",
        description: "Certificate added successfully",
      });
    }

    setFormData({
      title: "",
      issuer: "",
      issueDate: "",
      certificateLink: "",
    });
    setSelectedFile(null);
  };

  const handleEdit = (certificate: Certificate) => {
    setFormData(certificate);
    setEditingId(certificate.id);
  };

  const handleDelete = (id: string) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
    toast({
      title: "Success",
      description: "Certificate deleted successfully",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Error",
          description: "Please upload only PDF or image files",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size should be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
              My Certifications
            </h1>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Add Certificate Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-primary">
                {editingId ? "Edit Certificate" : "Add New Certificate"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Certificate Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., AWS Cloud Practitioner"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issuer">Issuing Organization *</Label>
                    <Input
                      id="issuer"
                      value={formData.issuer}
                      onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                      placeholder="e.g., Amazon Web Services"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issueDate">Date of Issue *</Label>
                    <Input
                      id="issueDate"
                      type="date"
                      value={formData.issueDate}
                      onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certificateLink">Certificate Link</Label>
                    <Input
                      id="certificateLink"
                      type="url"
                      value={formData.certificateLink}
                      onChange={(e) => setFormData({ ...formData, certificateLink: e.target.value })}
                      placeholder="https://certificate-link.com"
                      className="rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificate-upload">Upload Certificate (PDF/Image, max 5MB)</Label>
                  <Input
                    id="certificate-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="rounded-lg"
                  />
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="px-8">
                    {editingId ? "Update Certificate" : "Add Certificate"}
                  </Button>
                  {editingId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setEditingId(null);
                        setFormData({
                          title: "",
                          issuer: "",
                          issueDate: "",
                          certificateLink: "",
                        });
                        setSelectedFile(null);
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Certificates List */}
          {certificates.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary">Your Certificates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((certificate) => (
                  <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-primary leading-tight">
                          {certificate.title}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(certificate)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(certificate.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Issuer:</span>
                        <p className="text-sm mt-1">{certificate.issuer}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">Issue Date:</span>
                        <p className="text-sm">{formatDate(certificate.issueDate)}</p>
                      </div>
                      
                      {certificate.fileName && (
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {certificate.fileName}
                          </span>
                        </div>
                      )}
                      
                      {certificate.certificateLink && isValidUrl(certificate.certificateLink) && (
                        <div className="pt-2">
                          <a
                            href={certificate.certificateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View Certificate
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {certificates.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground text-lg">
                  No certificates added yet. Start by adding your first certificate above!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificates;