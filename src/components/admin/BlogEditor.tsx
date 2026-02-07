import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string;
  category: string;
  cover_image_url: string | null;
  published: boolean;
}

interface BlogEditorProps {
  blog: Blog | null;
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  "Strategy",
  "SEO",
  "Healthcare",
  "Content",
  "Reputation",
  "General",
];

const BlogEditor = ({ blog, isOpen, onClose }: BlogEditorProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [published, setPublished] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setSlug(blog.slug);
      setDescription(blog.description || "");
      setContent(blog.content);
      setCategory(blog.category);
      setPublished(blog.published);
      setCoverImageUrl(blog.cover_image_url);
    } else {
      resetForm();
    }
  }, [blog]);

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setDescription("");
    setContent("");
    setCategory("General");
    setPublished(false);
    setCoverImage(null);
    setCoverImageUrl(null);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!blog) {
      setSlug(generateSlug(value));
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `covers/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      let imageUrl = coverImageUrl;

      if (coverImage) {
        setIsUploading(true);
        try {
          imageUrl = await uploadImage(coverImage);
        } catch (error) {
          throw new Error("Failed to upload image");
        } finally {
          setIsUploading(false);
        }
      }

      const blogData = {
        title,
        slug,
        description: description || null,
        content,
        category,
        published,
        cover_image_url: imageUrl,
        author_id: user?.id,
      };

      if (blog) {
        const { error } = await supabase
          .from("blogs")
          .update(blogData)
          .eq("id", blog.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blogs").insert(blogData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["published-blogs"] });
      toast({ title: blog ? "Blog updated successfully" : "Blog created successfully" });
      onClose();
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error saving blog",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      setCoverImage(file);
      setCoverImageUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setCoverImage(null);
    setCoverImageUrl(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{blog ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate();
          }}
          className="space-y-6"
        >
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="blog-post-url"
              required
            />
            <p className="text-xs text-muted-foreground">
              URL: /blog/{slug || "your-slug-here"}
            </p>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of the post"
              rows={2}
            />
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <Label>Cover Image</Label>
            {coverImageUrl ? (
              <div className="relative inline-block">
                <img
                  src={coverImageUrl}
                  alt="Cover preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-background transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  Click to upload cover image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content * (HTML supported)</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here. HTML tags are supported."
              rows={12}
              required
            />
          </div>

          {/* Published Toggle */}
          <div className="flex items-center gap-3">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
            <Label htmlFor="published">Publish immediately</Label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saveMutation.isPending || isUploading}
            >
              {saveMutation.isPending || isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : blog ? (
                "Update Post"
              ) : (
                "Create Post"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogEditor;
