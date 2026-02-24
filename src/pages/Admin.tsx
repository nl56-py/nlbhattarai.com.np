import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Eye, EyeOff, LogOut, Loader2, Star, StarOff, PhoneCall } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import BlogEditor from "@/components/admin/BlogEditor";
import CaseStudyEditor from "@/components/admin/CaseStudyEditor";
import {
  ADMIN_WRITES_LOCK_REASON,
  adminWritesLocked,
} from "@/lib/maintenance";

interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  og_image_url: string | null;
  og_image_alt: string | null;
  content: string;
  category: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
}

interface MetricItem {
  label: string;
  value: string;
}



type ContactStatus = "recent" | "viewed" | "reached";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  status: ContactStatus;
  created_at: string;
}

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  client_title: string | null;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  og_image_url: string | null;
  og_image_alt: string | null;
  content: string;
  category: string;
  cover_image_url: string | null;
  tags: string[];
  metrics: unknown;
  featured: boolean;
  published: boolean;
  created_at: string;
}


const CONTACT_STATUS_STYLES: Record<ContactStatus, string> = {
  recent: "bg-yellow-500/20 text-yellow-400",
  viewed: "bg-blue-500/20 text-blue-400",
  reached: "bg-green-500/20 text-green-400",
};

const CONTACT_STATUS_LABELS: Record<ContactStatus, string> = {
  recent: "Recent",
  viewed: "Viewed",
  reached: "Reached",
};

const CONTACT_STATUS_ORDER: ContactStatus[] = ["recent", "viewed", "reached"];

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "An unexpected error occurred.";

const Admin = () => {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const writesLocked = adminWritesLocked;
  
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isBlogEditorOpen, setIsBlogEditorOpen] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);
  const [isCaseStudyEditorOpen, setIsCaseStudyEditorOpen] = useState(false);

  const showWritesLockedToast = () => {
    toast({
      title: "Admin writes are locked",
      description: ADMIN_WRITES_LOCK_REASON,
      variant: "destructive",
    });
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Blog queries
  const { data: blogs, isLoading: blogsLoading } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Blog[];
    },
    enabled: !!user && isAdmin,
  });

  // Case study queries
  const { data: caseStudies, isLoading: caseStudiesLoading } = useQuery({
    queryKey: ["admin-case-studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as CaseStudy[];
    },
    enabled: !!user && isAdmin,
  });

  // Contact message queries
  const { data: contactMessages, isLoading: contactsLoading } = useQuery({
    queryKey: ["admin-contact-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ContactMessage[];
    },
    enabled: !!user && isAdmin,
  });


  // Blog mutations
  const deleteBlogMutation = useMutation({
    mutationFn: async (id: string) => {
      if (writesLocked) {
        throw new Error(ADMIN_WRITES_LOCK_REASON);
      }
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      toast({ title: "Blog deleted successfully" });
    },
    onError: (error: unknown) => {
      toast({ title: "Error deleting blog", description: getErrorMessage(error), variant: "destructive" });
    },
  });

  const toggleBlogPublishMutation = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      if (writesLocked) {
        throw new Error(ADMIN_WRITES_LOCK_REASON);
      }
      const { error } = await supabase.from("blogs").update({ published }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      toast({ title: "Blog status updated" });
    },
    onError: (error: unknown) => {
      toast({ title: "Error updating blog", description: getErrorMessage(error), variant: "destructive" });
    },
  });

  // Case study mutations
  const deleteCaseStudyMutation = useMutation({
    mutationFn: async (id: string) => {
      if (writesLocked) {
        throw new Error(ADMIN_WRITES_LOCK_REASON);
      }
      const { error } = await supabase.from("case_studies").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
      toast({ title: "Case study deleted successfully" });
    },
    onError: (error: unknown) => {
      toast({ title: "Error deleting case study", description: getErrorMessage(error), variant: "destructive" });
    },
  });

  const toggleCaseStudyPublishMutation = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      if (writesLocked) {
        throw new Error(ADMIN_WRITES_LOCK_REASON);
      }
      const { error } = await supabase.from("case_studies").update({ published }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
      toast({ title: "Case study status updated" });
    },
    onError: (error: unknown) => {
      toast({ title: "Error updating case study", description: getErrorMessage(error), variant: "destructive" });
    },
  });

  const toggleCaseStudyFeatureMutation = useMutation({
    mutationFn: async ({ id, featured }: { id: string; featured: boolean }) => {
      if (writesLocked) {
        throw new Error(ADMIN_WRITES_LOCK_REASON);
      }
      const { error } = await supabase.from("case_studies").update({ featured }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
      toast({ title: "Case study feature status updated" });
    },
    onError: (error: unknown) => {
      toast({ title: "Error updating case study", description: getErrorMessage(error), variant: "destructive" });
    },
  });

  const updateContactStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ContactStatus }) => {
      if (writesLocked) {
        throw new Error(ADMIN_WRITES_LOCK_REASON);
      }
      const { error } = await supabase
        .from("contact_messages")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-contact-messages"] });
      toast({ title: "Contact status updated" });
    },
    onError: (error: unknown) => {
      toast({ title: "Error updating contact status", description: getErrorMessage(error), variant: "destructive" });
    },
  });

  const contactsByStatus = CONTACT_STATUS_ORDER.reduce<Record<ContactStatus, ContactMessage[]>>(
    (acc, status) => {
      acc[status] = (contactMessages || []).filter((contact) => contact.status === status);
      return acc;
    },
    { recent: [], viewed: [], reached: [] }
  );

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleDeniedSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access the admin panel.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" onClick={handleDeniedSignOut}>Sign Out</Button>
            <Button onClick={() => navigate("/")}>Go Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50">
        <div className="container-wide py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl text-foreground">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container-wide py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {writesLocked && (
            <div className="mb-4 rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-3 text-sm text-yellow-300">
              Maintenance mode is enabled. Admin write actions are currently disabled.
            </div>
          )}
          <Tabs defaultValue="blogs" className="space-y-6">
            <TabsList>
              <TabsTrigger value="blogs">Blog Posts</TabsTrigger>
              <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
            </TabsList>

            {/* Blog Posts Tab */}
            <TabsContent value="blogs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-medium text-foreground">Blog Posts</h2>
                  <p className="text-muted-foreground text-sm">Manage your blog content</p>
                </div>
                <Button
                  disabled={writesLocked}
                  onClick={() => {
                    if (writesLocked) {
                      showWritesLockedToast();
                      return;
                    }
                    setEditingBlog(null);
                    setIsBlogEditorOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </div>

              {blogsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : blogs && blogs.length > 0 ? (
                <div className="border border-border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blogs.map((blog) => (
                        <TableRow key={blog.id}>
                          <TableCell className="font-medium">{blog.title}</TableCell>
                          <TableCell>
                            <span className="px-2 py-0.5 text-xs bg-accent rounded">{blog.category}</span>
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-0.5 text-xs rounded ${blog.published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                              {blog.published ? "Published" : "Draft"}
                            </span>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {new Date(blog.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={writesLocked || toggleBlogPublishMutation.isPending}
                                onClick={() => {
                                  if (writesLocked) {
                                    showWritesLockedToast();
                                    return;
                                  }
                                  toggleBlogPublishMutation.mutate({
                                    id: blog.id,
                                    published: !blog.published,
                                  });
                                }}
                                title={blog.published ? "Unpublish" : "Publish"}
                              >
                                {blog.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={writesLocked}
                                onClick={() => {
                                  if (writesLocked) {
                                    showWritesLockedToast();
                                    return;
                                  }
                                  setEditingBlog(blog);
                                  setIsBlogEditorOpen(true);
                                }}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" disabled={writesLocked}>
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                                    <AlertDialogDescription>Are you sure you want to delete "{blog.title}"? This action cannot be undone.</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      disabled={writesLocked || deleteBlogMutation.isPending}
                                      onClick={() => {
                                        if (writesLocked) {
                                          showWritesLockedToast();
                                          return;
                                        }
                                        deleteBlogMutation.mutate(blog.id);
                                      }}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12 border border-border rounded-lg">
                  <p className="text-muted-foreground mb-4">No blog posts yet</p>
                  <Button
                    disabled={writesLocked}
                    onClick={() => {
                      if (writesLocked) {
                        showWritesLockedToast();
                        return;
                      }
                      setEditingBlog(null);
                      setIsBlogEditorOpen(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create your first post
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Case Studies Tab */}
            <TabsContent value="case-studies">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-medium text-foreground">Case Studies</h2>
                  <p className="text-muted-foreground text-sm">Manage your portfolio case studies</p>
                </div>
                <Button
                  disabled={writesLocked}
                  onClick={() => {
                    if (writesLocked) {
                      showWritesLockedToast();
                      return;
                    }
                    setEditingCaseStudy(null);
                    setIsCaseStudyEditorOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Case Study
                </Button>
              </div>

              {caseStudiesLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : caseStudies && caseStudies.length > 0 ? (
                <div className="border border-border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {caseStudies.map((cs) => (
                        <TableRow key={cs.id}>
                          <TableCell className="font-medium">{cs.title}</TableCell>
                          <TableCell className="text-muted-foreground">{cs.client_name}</TableCell>
                          <TableCell>
                            <span className="px-2 py-0.5 text-xs bg-accent rounded">{cs.category}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 text-xs rounded ${cs.published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                                {cs.published ? "Published" : "Draft"}
                              </span>
                              {cs.featured && (
                                <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded">Featured</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {new Date(cs.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={writesLocked || toggleCaseStudyFeatureMutation.isPending}
                                onClick={() => {
                                  if (writesLocked) {
                                    showWritesLockedToast();
                                    return;
                                  }
                                  toggleCaseStudyFeatureMutation.mutate({
                                    id: cs.id,
                                    featured: !cs.featured,
                                  });
                                }}
                                title={cs.featured ? "Unfeature" : "Feature"}
                              >
                                {cs.featured ? <StarOff className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={writesLocked || toggleCaseStudyPublishMutation.isPending}
                                onClick={() => {
                                  if (writesLocked) {
                                    showWritesLockedToast();
                                    return;
                                  }
                                  toggleCaseStudyPublishMutation.mutate({
                                    id: cs.id,
                                    published: !cs.published,
                                  });
                                }}
                                title={cs.published ? "Unpublish" : "Publish"}
                              >
                                {cs.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                disabled={writesLocked}
                                onClick={() => {
                                  if (writesLocked) {
                                    showWritesLockedToast();
                                    return;
                                  }
                                  setEditingCaseStudy(cs);
                                  setIsCaseStudyEditorOpen(true);
                                }}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" disabled={writesLocked}>
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Case Study</AlertDialogTitle>
                                    <AlertDialogDescription>Are you sure you want to delete "{cs.title}"? This action cannot be undone.</AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      disabled={writesLocked || deleteCaseStudyMutation.isPending}
                                      onClick={() => {
                                        if (writesLocked) {
                                          showWritesLockedToast();
                                          return;
                                        }
                                        deleteCaseStudyMutation.mutate(cs.id);
                                      }}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12 border border-border rounded-lg">
                  <p className="text-muted-foreground mb-4">No case studies yet</p>
                  <Button
                    disabled={writesLocked}
                    onClick={() => {
                      if (writesLocked) {
                        showWritesLockedToast();
                        return;
                      }
                      setEditingCaseStudy(null);
                      setIsCaseStudyEditorOpen(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create your first case study
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Contacts Tab */}
            <TabsContent value="contacts" className="space-y-5">
              <div>
                <h2 className="text-xl font-medium text-foreground">Contact Messages</h2>
                <p className="text-muted-foreground text-sm">Track inquiries by follow-up status</p>
              </div>

              {contactsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : (contactMessages?.length ?? 0) > 0 ? (
                <div className="grid gap-6 lg:grid-cols-3">
                  {CONTACT_STATUS_ORDER.map((status) => (
                    <div key={status} className="border border-border rounded-lg bg-card/50 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-foreground">{CONTACT_STATUS_LABELS[status]}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs ${CONTACT_STATUS_STYLES[status]}`}>
                          {contactsByStatus[status].length}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {contactsByStatus[status].length === 0 ? (
                          <p className="text-muted-foreground text-sm">No messages in this column.</p>
                        ) : (
                          contactsByStatus[status].map((contact) => (
                            <div key={contact.id} className="rounded-md border border-border bg-background p-3 space-y-3">
                              <div className="space-y-1">
                                <p className="font-medium text-foreground text-sm">{contact.name}</p>
                                <p className="text-xs text-muted-foreground">{contact.email}</p>
                                <p className="text-xs text-muted-foreground">{contact.phone}</p>
                              </div>

                              <p className="text-sm text-foreground/90">{contact.subject}</p>

                              <p className="text-xs text-muted-foreground">
                                {new Date(contact.created_at).toLocaleString()}
                              </p>

                              <div className="flex items-center gap-2 flex-wrap">
                                {CONTACT_STATUS_ORDER.map((nextStatus) => (
                                  <Button
                                    key={nextStatus}
                                    variant={nextStatus === contact.status ? "default" : "outline"}
                                    size="sm"
                                    disabled={
                                      writesLocked ||
                                      nextStatus === contact.status ||
                                      updateContactStatusMutation.isPending
                                    }
                                    onClick={() =>
                                      writesLocked
                                        ? showWritesLockedToast()
                                        : updateContactStatusMutation.mutate({
                                            id: contact.id,
                                            status: nextStatus,
                                          })
                                    }
                                  >
                                    {nextStatus === "reached" && <PhoneCall className="w-3 h-3 mr-1" />}
                                    {CONTACT_STATUS_LABELS[nextStatus]}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-border rounded-lg">
                  <p className="text-muted-foreground">No contact messages yet.</p>
                </div>
              )}
            </TabsContent>

          </Tabs>
        </motion.div>
      </main>

      {/* Editors */}
      <BlogEditor
        blog={editingBlog}
        isOpen={isBlogEditorOpen}
        writesLocked={writesLocked}
        onClose={() => {
          setIsBlogEditorOpen(false);
          setEditingBlog(null);
        }}
      />
      <CaseStudyEditor
        caseStudy={editingCaseStudy}
        isOpen={isCaseStudyEditorOpen}
        writesLocked={writesLocked}
        onClose={() => {
          setIsCaseStudyEditorOpen(false);
          setEditingCaseStudy(null);
        }}
      />
    </div>
  );
};

export default Admin;
