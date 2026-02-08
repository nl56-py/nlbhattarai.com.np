import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

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
  category: string;
  cover_image_url: string | null;
  metrics: { items?: MetricItem[] } | null;
  featured: boolean;
  published: boolean;
  created_at: string;
}

const CaseStudies = () => {
  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ["published-case-studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("published", true)
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as CaseStudy[];
    },
  });

  const featuredStudy = caseStudies?.find((cs) => cs.featured);
  const otherStudies = caseStudies?.filter((cs) => !cs.featured) || [];

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
              Portfolio
            </p>
            <h1 className="mb-8 text-foreground">Case Studies</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="prose-custom"
          >
            <p className="text-lg md:text-xl">
              These projects focus on building long-term digital authority, not
              short-term visibility. Each case study documents the thinking,
              decisions, and measurable outcomes of working with professionals who
              value substance over shortcuts.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {isLoading ? (
        <section className="section-sm">
          <div className="container-narrow flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </section>
      ) : caseStudies && caseStudies.length > 0 ? (
        <>
          {/* Featured Case Study */}
          {featuredStudy && (
            <section className="section-sm">
              <div className="container-narrow">
                <AnimatedSection>
                  <Link
                    to={`/case-studies/${featuredStudy.slug}`}
                    className="block card-elevated group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                        Featured
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-accent text-muted-foreground rounded-full">
                        {featuredStudy.category}
                      </span>
                    </div>

                    <h2 className="mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                      {featuredStudy.title}
                    </h2>

                    <p className="text-muted-foreground mb-2 font-medium">
                      {featuredStudy.client_name}
                      {featuredStudy.client_title && ` — ${featuredStudy.client_title}`}
                    </p>

                    {featuredStudy.description && (
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {featuredStudy.description}
                      </p>
                    )}

                    {featuredStudy.metrics?.items && featuredStudy.metrics.items.length > 0 && (
                      <div className="flex flex-wrap gap-6 pt-4 border-t border-border/50">
                        {featuredStudy.metrics.items.map((metric, index) => (
                          <div key={index}>
                            <p className="text-2xl font-serif text-primary">{metric.value}</p>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 flex items-center gap-2 text-primary font-medium">
                      Read full case study
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              </div>
            </section>
          )}

          {/* Other Case Studies */}
          {otherStudies.length > 0 && (
            <>
              <div className="container-narrow">
                <hr className="divider" />
              </div>

              <section className="section-sm">
                <div className="container-narrow space-y-6">
                  {otherStudies.map((cs) => (
                    <AnimatedSection key={cs.id}>
                      <Link
                        to={`/case-studies/${cs.slug}`}
                        className="block card-elevated group"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <span className="px-3 py-1 text-xs font-medium bg-accent text-muted-foreground rounded-full">
                            {cs.category}
                          </span>
                        </div>

                        <h3 className="mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                          {cs.title}
                        </h3>

                        <p className="text-muted-foreground text-sm mb-2 font-medium">
                          {cs.client_name}
                          {cs.client_title && ` — ${cs.client_title}`}
                        </p>

                        {cs.description && (
                          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                            {cs.description}
                          </p>
                        )}

                        <div className="flex items-center gap-2 text-primary font-medium text-sm">
                          Read case study
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </Link>
                    </AnimatedSection>
                  ))}
                </div>
              </section>
            </>
          )}
        </>
      ) : (
        <section className="section-sm">
          <div className="container-narrow text-center">
            <p className="text-muted-foreground">
              Case studies will be added soon. Check back later.
            </p>
          </div>
        </section>
      )}

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* More Coming */}
      <section className="section-sm">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <p className="text-muted-foreground">
              More case studies will be added as projects are completed. Each one
              follows the same pattern: document the thinking, show the results, and
              explain why certain decisions were made.
            </p>
            <p className="mt-6 text-muted-foreground/70 text-sm">
              Want to discuss a project?{" "}
              <Link to="/contact" className="link-primary">
                Get in touch
              </Link>
              .
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudies;
