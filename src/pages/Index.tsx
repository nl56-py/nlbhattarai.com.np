import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import SEO, { personSchema, websiteSchema, webpageSchema } from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import profileImage from "@/assets/profile-image.png";

const philosophyItems = [
  {
    title: "Clarity over noise",
    description:
      "Clear structure and calm messaging outperform marketing hype.",
    icon: "◯",
  },
  {
    title: "Systems over tactics",
    description:
      "Long-term systems beat short-term tricks. Stability compounds.",
    icon: "△",
  },
  {
    title: "Trust before growth",
    description:
      "Authority grows when credibility comes first—not traffic.",
    icon: "□",
  },
];

const Index = () => {
  const { data: recentBlogs, isLoading: blogsLoading } = useQuery({
    queryKey: ["recent-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, slug, description, category, cover_image_url, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  const { data: recentCaseStudies, isLoading: casesLoading } = useQuery({
    queryKey: ["recent-case-studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("id, title, slug, description, category, cover_image_url, client_name, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(2);
      if (error) throw error;
      return data;
    },
  });

  return (
    <Layout>
      <SEO
        title="N.L. Bhattarai — Websites, Software & Digital Systems"
        description="I design secure websites, custom software, and SEO-safe digital systems that turn real expertise into scalable digital authority."
        keywords="software development Nepal, digital systems architect, website and app development, SEO strategy, workflow automation, cybersecurity"
        canonical="https://nlbhattarai.com"
        jsonLd={[
          personSchema(),
          websiteSchema(),
          webpageSchema({
            title: "N.L. Bhattarai - Websites, Software and Digital Systems",
            description:
              "I design secure websites, custom software, and SEO-safe digital systems that turn real expertise into scalable digital authority.",
            url: "https://nlbhattarai.com/",
          }),
        ]}
      />
      <div
        className="
          [&_.section]:py-10 md:[&_.section]:py-12
          [&_.section-sm]:py-8 md:[&_.section-sm]:py-10
          [&_.divider]:my-6 md:[&_.divider]:my-8
        "
      >

        {/* ================= HERO ================= */}
        <section className="section hero-pattern relative overflow-hidden">
          <div className="container-wide relative z-10">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">

              {/* LEFT */}
              <div className="max-w-[60ch]">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-primary font-medium mb-4 tracking-wide text-sm uppercase"
                >
                  Websites • Software • Digital Systems
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-foreground leading-tight text-4xl md:text-6xl font-semibold"
                >
                  I build secure websites, software, and digital systems that turn{" "}
                  <span className="text-gradient">
                    credibility into digital authority
                  </span>.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-6 text-muted-foreground text-lg md:text-xl leading-relaxed"
                >
                  I work across public websites, internal software, workflow
                  automation, and integrated digital platforms for healthcare,
                  education, and growing businesses. The goal is long-term,
                  secure systems that scale with your operations.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-8 flex flex-wrap gap-4"
                >
                  <Link
                    to="/case-studies"
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    View Case Studies →
                  </Link>
                  <Link
                    to="/contact"
                    className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-all"
                  >
                    Work With Me
                  </Link>
                </motion.div>
              </div>

              {/* RIGHT IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9 }}
                className="relative"
              >
                <div className="rounded-3xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10 max-w-[440px] mx-auto">
                  <img
                    src={profileImage}
                    alt="N.L. Bhattarai"
                    className="w-full h-[480px] object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="container-narrow">
          <hr className="divider" />
        </div>

        {/* ================= CASE STUDIES PREVIEW ================= */}
        <section className="section-sm">
          <div className="container-wide">
            <AnimatedSection className="flex justify-between items-center mb-6">
              <h2 className="text-foreground">Selected Case Studies</h2>
              <Link to="/case-studies" className="text-primary font-medium">
                View all →
              </Link>
            </AnimatedSection>

            {casesLoading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="card-elevated p-6">
                    <Skeleton className="h-40 w-full mb-4 rounded-lg" />
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : recentCaseStudies && recentCaseStudies.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {recentCaseStudies.map((cs) => (
                  <AnimatedSection key={cs.id} className="card-elevated group">
                    <Link to={`/case-studies/${cs.slug}`} className="block">
                      {cs.cover_image_url && (
                        <div className="overflow-hidden rounded-t-lg">
                          <img
                            src={cs.cover_image_url}
                            alt={cs.title}
                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <span className="text-xs bg-accent px-3 py-1 rounded-full text-muted-foreground">
                          {cs.category}
                        </span>
                        <h3 className="text-foreground font-medium mt-3 mb-2 group-hover:text-primary transition-colors">
                          {cs.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {cs.description || `Case study for ${cs.client_name}`}
                        </p>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <AnimatedSection className="card-elevated p-6">
                  <h3 className="text-foreground font-medium mb-2">Healthcare SEO System</h3>
                  <p className="text-muted-foreground">
                    Built a structured digital system for a senior medical professional,
                    combining authority-focused content, trust signals, and local SEO.
                  </p>
                </AnimatedSection>
                <AnimatedSection className="card-elevated p-6">
                  <h3 className="text-foreground font-medium mb-2">Institutional Digital Platform</h3>
                  <p className="text-muted-foreground">
                    Designed maintainable platform architecture for education and
                    service organizations with long-term scalability.
                  </p>
                </AnimatedSection>
              </div>
            )}
          </div>
        </section>

        <div className="container-narrow">
          <hr className="divider" />
        </div>

        {/* ================= RECENT BLOG ================= */}
        <section className="section-sm bg-card/30">
          <div className="container-wide">
            <AnimatedSection className="flex justify-between items-center mb-6">
              <h2 className="text-foreground">Recent Writing</h2>
              <Link to="/blog" className="text-primary font-medium">
                Explore blog →
              </Link>
            </AnimatedSection>

            {blogsLoading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="card-elevated p-6">
                    <Skeleton className="h-40 w-full mb-4 rounded-lg" />
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : recentBlogs && recentBlogs.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {recentBlogs.map((post) => (
                  <AnimatedSection key={post.id} className="card-elevated group">
                    <Link to={`/blog/${post.slug}`} className="block">
                      {post.cover_image_url && (
                        <div className="overflow-hidden rounded-t-lg">
                          <img
                            src={post.cover_image_url}
                            alt={post.title}
                            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <span className="text-xs bg-accent px-3 py-1 rounded-full text-muted-foreground">
                          {post.category}
                        </span>
                        <h3 className="text-foreground font-medium mt-3 mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        {post.description && (
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {post.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                <AnimatedSection className="card-elevated p-6">
                  <h3 className="text-foreground font-medium mb-2">Cybersecurity Basics for Modern Web Apps</h3>
                  <p className="text-muted-foreground">Practical fundamentals: secure forms, safe defaults, and avoiding common attack vectors.</p>
                </AnimatedSection>
                <AnimatedSection className="card-elevated p-6">
                  <h3 className="text-foreground font-medium mb-2">What is Vibe Coding?</h3>
                  <p className="text-muted-foreground">Writing code with clarity, intentional structure, and calm architecture decisions.</p>
                </AnimatedSection>
                <AnimatedSection className="card-elevated p-6">
                  <h3 className="text-foreground font-medium mb-2">Building SEO-Safe React Sites</h3>
                  <p className="text-muted-foreground">How to structure content and markup without sacrificing performance or integrity.</p>
                </AnimatedSection>
              </div>
            )}
          </div>
        </section>

        <div className="container-narrow">
          <hr className="divider" />
        </div>

        {/* ================= PHILOSOPHY ================= */}
        <section className="section-sm">
          <div className="container-wide">
            <AnimatedSection className="text-center mb-6">
              <h2 className="text-foreground">Working Philosophy</h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6">
              {philosophyItems.map((item, index) => (
                <AnimatedSection
                  key={item.title}
                  delay={index * 0.15}
                  className="card-elevated p-6"
                >
                  <span className="text-primary text-2xl">{item.icon}</span>
                  <h3 className="text-foreground mt-3 mb-2 font-medium">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Index;
