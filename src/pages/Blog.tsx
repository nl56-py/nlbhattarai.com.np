import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import SEO, { breadcrumbSchema } from "@/components/SEO";
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

  const featuredPost = blogs?.[0];
  const otherPosts = blogs?.slice(1) || [];

  return (
    <Layout>
      <SEO
        title="Blog — Cybersecurity, Vibe Coding & SEO Insights"
        description="Articles on cybersecurity, vibe coding, and building SEO-safe web systems. Practical observations from real implementation."
        keywords="cybersecurity blog, vibe coding, SEO blog, web development articles, N.L. Bhattarai blog"
        canonical="https://nlbhattarai.com/blog"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: "https://nlbhattarai.com" },
            { name: "Blog", url: "https://nlbhattarai.com/blog" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Blog",
            url: "https://nlbhattarai.com/blog",
            description: "Articles on cybersecurity, vibe coding, and SEO-safe web systems.",
            author: { "@type": "Person", name: "N.L. Bhattarai" },
          },
        ]}
      />
      <div
        className="
          [&_.section]:py-8 md:[&_.section]:py-10
          [&_.section-sm]:py-6 md:[&_.section-sm]:py-8
          [&_.divider]:my-6
        "
      >
        {/* ================= HERO ================= */}
        <section className="section">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
                Writing
              </p>
              <h1 className="text-foreground mb-4">Blog</h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Articles on cybersecurity, vibe coding, and building SEO-safe
                web systems. Practical observations from real implementation—
                not noise.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container-narrow">
          <hr className="divider" />
        </div>

        {/* ================= CONTENT ================= */}

        <section className="section-sm">
          <div className="container-wide">

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="card-elevated p-6">
                    <Skeleton className="h-40 w-full mb-4 rounded-lg" />
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : blogs && blogs.length > 0 ? (
              <>
                {/* ===== FEATURED POST ===== */}
                {featuredPost && (
                  <AnimatedSection className="mb-10">
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className="block card-elevated p-8 group"
                    >
                      {featuredPost.cover_image_url && (
                        <div className="mb-5 rounded-lg overflow-hidden">
                          <img
                            src={featuredPost.cover_image_url}
                            alt={featuredPost.title}
                            className="w-full h-56 md:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                          Featured
                        </span>
                        <span className="px-3 py-1 text-xs bg-accent text-muted-foreground rounded-full">
                          {featuredPost.category}
                        </span>
                      </div>

                      <h2 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>

                      <p className="text-muted-foreground mb-4">
                        {new Date(featuredPost.created_at).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </p>

                      {featuredPost.description && (
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {featuredPost.description}
                        </p>
                      )}

                      <span className="text-primary font-medium">
                        Read article →
                      </span>
                    </Link>
                  </AnimatedSection>
                )}

                {/* ===== OTHER POSTS GRID ===== */}
                {otherPosts.length > 0 && (
                  <AnimatedSection>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {otherPosts.map((post) => (
                        <Link
                          key={post.id}
                          to={`/blog/${post.slug}`}
                          className="card-elevated p-6 group"
                        >
                          {post.cover_image_url && (
                            <div className="mb-4 rounded-lg overflow-hidden">
                              <img
                                src={post.cover_image_url}
                                alt={post.title}
                                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          )}

                          <span className="text-xs bg-accent px-3 py-1 rounded-full text-muted-foreground">
                            {post.category}
                          </span>

                          <h3 className="text-foreground mt-3 mb-2 font-semibold group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-xs text-muted-foreground mb-3">
                            {new Date(post.created_at).toLocaleDateString(
                              "en-US",
                              { year: "numeric", month: "short", day: "numeric" }
                            )}
                          </p>

                          {post.description && (
                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                              {post.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </AnimatedSection>
                )}
              </>
            ) : (
              <AnimatedSection className="text-center py-10">
                <p className="text-muted-foreground text-lg">
                  No published articles yet.
                </p>
              </AnimatedSection>
            )}
          </div>
        </section>

        <div className="container-narrow">
          <hr className="divider" />
        </div>

        {/* Footer CTA */}
        <section className="section-sm">
          <div className="container-narrow text-center">
            <AnimatedSection>
              <p className="text-muted-foreground">
                New articles are added through the admin panel as projects
                progress.
              </p>
              <Link
                to="/contact"
                className="inline-block mt-4 text-primary font-medium"
              >
                Get in touch →
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Blog;
