import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  cover_image_url: string | null;
  created_at: string;
}

const Blog = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["published-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, slug, description, category, cover_image_url, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Blog[];
    },
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="text-primary font-medium mb-4 tracking-wide text-sm uppercase">
              Thoughts & Insights
            </p>
            <h1 className="mb-8 text-foreground">Blog</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="prose-custom"
          >
            <p className="text-lg md:text-xl">
              Notes on building digital systems, preserving trust, and avoiding
              common mistakes. These aren't tutorials or step-by-step guides—they're
              observations from working with professionals who care about getting
              things right.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* Blog Posts */}
      <section className="section-sm">
        <div className="container-narrow">
          {isLoading ? (
            <div className="space-y-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-l-2 border-border pl-6 py-4">
                  <Skeleton className="h-6 w-24 mb-3" />
                  <Skeleton className="h-8 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : blogs && blogs.length > 0 ? (
            <div className="space-y-12">
              {blogs.map((post, index) => (
                <AnimatedSection
                  key={post.id}
                  delay={index * 0.1}
                  className="group"
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="block border-l-2 border-border hover:border-primary pl-6 py-4 transition-all duration-300"
                  >
                    {post.cover_image_url && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-0.5 text-xs font-medium bg-accent text-muted-foreground rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground/60">
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {post.description}
                      </p>
                    )}
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No blog posts yet. Check back soon for new content.
              </p>
            </AnimatedSection>
          )}
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* Footer Note */}
      <section className="section-sm">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <p className="text-muted-foreground">
              More articles coming as projects progress. Subscribe to updates by{" "}
              <Link to="/contact" className="link-primary">
                getting in touch
              </Link>
              .
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
