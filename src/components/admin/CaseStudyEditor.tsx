import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, X, Loader2, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Json } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/admin/RichTextEditor";
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

interface MetricItem {
  label: string;
  value: string;
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
}

interface CaseStudyEditorProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  "Healthcare",
  "Finance",
  "Technology",
  "Education",
  "E-commerce",
  "Legal",
  "General",
];

const CaseStudyEditor = ({ caseStudy, isOpen, onClose }: CaseStudyEditorProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientTitle, setClientTitle] = useState("");
  const [description, setDescription] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [ogImageUrl, setOgImageUrl] = useState("");
  const [ogImageAlt, setOgImageAlt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [metrics, setMetrics] = useState<MetricItem[]>([]);
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (caseStudy) {
      setTitle(caseStudy.title);
      setSlug(caseStudy.slug);
      setClientName(caseStudy.client_name);
      setClientTitle(caseStudy.client_title || "");
      setDescription(caseStudy.description || "");
      setSeoTitle(caseStudy.seo_title || "");
      setSeoDescription(caseStudy.seo_description || "");
      setSeoKeywords(caseStudy.seo_keywords || "");
      setOgImageUrl(caseStudy.og_image_url || "");
      setOgImageAlt(caseStudy.og_image_alt || "");
      setContent(caseStudy.content);
      setCategory(caseStudy.category);
      setTags(caseStudy.tags || []);
      const metricsData = caseStudy.metrics as { items?: MetricItem[] } | null;
      setMetrics(metricsData?.items || []);
      setFeatured(caseStudy.featured);
      setPublished(caseStudy.published);
      setCoverImageUrl(caseStudy.cover_image_url);
    } else {
      resetForm();
    }
  }, [caseStudy]);

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setClientName("");
    setClientTitle("");
    setDescription("");
    setSeoTitle("");
    setSeoDescription("");
    setSeoKeywords("");
    setOgImageUrl("");
    setOgImageAlt("");
    setContent("");
    setCategory("General");
    setTags([]);
    setTagInput("");
    setMetrics([]);
    setFeatured(false);
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
    if (!caseStudy) {
      setSlug(generateSlug(value));
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `case-studies/${fileName}`;

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

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const addMetric = () => {
    setMetrics([...metrics, { label: "", value: "" }]);
  };

  const updateMetric = (index: number, field: "label" | "value", value: string) => {
    const updated = [...metrics];
    updated[index][field] = value;
    setMetrics(updated);
  };

  const removeMetric = (index: number) => {
    setMetrics(metrics.filter((_, i) => i !== index));
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

      const caseStudyData = {
        title,
        slug,
        client_name: clientName,
        client_title: clientTitle || null,
        description: description || null,
        seo_title: seoTitle.trim() || null,
        seo_description: seoDescription.trim() || null,
        seo_keywords: seoKeywords.trim() || null,
        og_image_url: ogImageUrl.trim() || null,
        og_image_alt: ogImageAlt.trim() || null,
        content,
        category,
        tags,
        metrics: { items: metrics.filter((m) => m.label && m.value) } as unknown as Json,
        featured,
        published,
        cover_image_url: imageUrl,
        author_id: user?.id,
      };

      if (caseStudy) {
        const { error } = await supabase
          .from("case_studies")
          .update(caseStudyData)
          .eq("id", caseStudy.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("case_studies").insert(caseStudyData);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-case-studies"] });
      queryClient.invalidateQueries({ queryKey: ["published-case-studies"] });
      toast({ title: caseStudy ? "Case study updated successfully" : "Case study created successfully" });
      onClose();
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error saving case study",
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{caseStudy ? "Edit Case Study" : "Create New Case Study"}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate();
          }}
          className="space-y-6"
        >
          {/* Title & Slug Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Case study title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="case-study-url"
                required
              />
            </div>
          </div>

          {/* Client Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Dr. John Smith"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientTitle">Client Title</Label>
              <Input
                id="clientTitle"
                value={clientTitle}
                onChange={(e) => setClientTitle(e.target.value)}
                placeholder="Senior Consultant, ABC Corp"
              />
            </div>
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

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addTag}>
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-accent rounded-full flex items-center gap-1"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of the case study"
              rows={2}
            />
          </div>

          {/* SEO */}
          <div className="space-y-4 rounded-lg border border-border p-4">
            <p className="text-sm font-medium text-foreground">SEO Settings</p>
            <div className="space-y-2">
              <Label htmlFor="seoTitle">SEO Title</Label>
              <Input
                id="seoTitle"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Optional custom title tag"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seoDescription">SEO Description</Label>
              <Textarea
                id="seoDescription"
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Optional custom meta description"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seoKeywords">SEO Keywords</Label>
              <Input
                id="seoKeywords"
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                placeholder="keyword one, keyword two, keyword three"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogImageUrl">Open Graph Image URL</Label>
              <Input
                id="ogImageUrl"
                value={ogImageUrl}
                onChange={(e) => setOgImageUrl(e.target.value)}
                placeholder="Optional social share image URL"
              />
              <p className="text-xs text-muted-foreground">
                Leave blank to use the uploaded cover image.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ogImageAlt">Open Graph Image Alt Text</Label>
              <Input
                id="ogImageAlt"
                value={ogImageAlt}
                onChange={(e) => setOgImageAlt(e.target.value)}
                placeholder="Describe the shared image"
              />
            </div>
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

          {/* Metrics */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Key Metrics</Label>
              <Button type="button" variant="outline" size="sm" onClick={addMetric}>
                <Plus className="w-4 h-4 mr-1" />
                Add Metric
              </Button>
            </div>
            {metrics.length > 0 && (
              <div className="space-y-2">
                {metrics.map((metric, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      value={metric.label}
                      onChange={(e) => updateMetric(index, "label", e.target.value)}
                      placeholder="Label (e.g., Google Ranking)"
                      className="flex-1"
                    />
                    <Input
                      value={metric.value}
                      onChange={(e) => updateMetric(index, "value", e.target.value)}
                      placeholder="Value (e.g., #1)"
                      className="w-32"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMetric(index)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label>Content *</Label>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Write your case study content here. Paste from Google Docs or Word to preserve formatting."
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <Switch
                id="published"
                checked={published}
                onCheckedChange={setPublished}
              />
              <Label htmlFor="published">Published</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="featured"
                checked={featured}
                onCheckedChange={setFeatured}
              />
              <Label htmlFor="featured">Featured</Label>
            </div>
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
              ) : caseStudy ? (
                "Update Case Study"
              ) : (
                "Create Case Study"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyEditor;
