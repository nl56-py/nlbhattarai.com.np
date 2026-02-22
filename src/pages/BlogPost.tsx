import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import SEO, { articleSchema, breadcrumbSchema, webpageSchema } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

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
  created_at: string;
  updated_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: blog, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) throw error;
      return data as Blog;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Layout>
        <section className="section">
          <div className="container-narrow">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-48 mb-8" />
            <Skeleton className="h-64 w-full mb-8 rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (error || !blog) {
    return (
      <Layout>
        <section className="section">
          <div className="container-narrow text-center">
            <h1 className="text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blog" className="link-primary">
              ← Back to Blog
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const seoTitle = blog.seo_title?.trim() || blog.title;
  const seoDescription =
    blog.seo_description?.trim() ||
    blog.description ||
    `Read "${blog.title}" on N.L. Bhattarai's blog.`;
  const seoKeywords =
    blog.seo_keywords?.trim() ||
    `${blog.category}, blog, N.L. Bhattarai, ${blog.title}`;
  const ogImage = blog.og_image_url || blog.cover_image_url || undefined;
  const ogImageAlt = blog.og_image_alt || blog.title;
  const keywordTags = seoKeywords
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  return (
    <Layout>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonical={`https://nlbhattarai.com/blog/${blog.slug}`}
        ogType="article"
        ogImage={ogImage}
        ogImageAlt={ogImageAlt}
        article={{
          publishedTime: blog.created_at,
          modifiedTime: blog.updated_at || blog.created_at,
          author: "N.L. Bhattarai",
          section: blog.category,
          tags: keywordTags.length > 0 ? keywordTags : [blog.category],
        }}
        jsonLd={[
          webpageSchema({
            title: seoTitle,
            description: seoDescription,
            url: `https://nlbhattarai.com/blog/${blog.slug}`,
          }),
          articleSchema({
            title: seoTitle,
            description: seoDescription,
            url: `https://nlbhattarai.com/blog/${blog.slug}`,
            image: ogImage,
            datePublished: blog.created_at,
            dateModified: blog.updated_at || blog.created_at,
            category: blog.category,
            keywords: seoKeywords,
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://nlbhattarai.com" },
            { name: "Blog", url: "https://nlbhattarai.com/blog" },
            { name: blog.title, url: `https://nlbhattarai.com/blog/${blog.slug}` },
          ]),
        ]}
      />
      <article className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2 py-0.5 text-xs font-medium bg-accent text-muted-foreground rounded">
                {blog.category}
              </span>
              <span className="text-sm text-muted-foreground/60">
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-foreground mb-6">{blog.title}</h1>

            {blog.description && (
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {blog.description}
              </p>
            )}
          </motion.div>

          {blog.cover_image_url && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-10 rounded-lg overflow-hidden"
            >
              <img
                src={blog.cover_image_url}
                alt={blog.title}
                className="w-full h-auto max-h-96 object-cover"
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      <section className="section-sm">
        <div className="container-narrow text-center">
          <Link to="/blog" className="link-primary">
            ← Back to all posts
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
