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
                Portfolio
              </p>
              <h1 className="text-foreground mb-4">Case Studies</h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Documented projects focused on long-term authority,
                secure foundations, and measurable outcomes.
                Only published case studies from the admin panel
                are displayed here.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container-narrow">
          <hr className="divider" />
        </div>

        {/* ================= CONTENT ================= */}

        {isLoading ? (
          <section className="section-sm">
            <div className="container-narrow flex justify-center py-10">
              <Loader2 className="w-7 h-7 animate-spin text-primary" />
            </div>
          </section>
        ) : caseStudies && caseStudies.length > 0 ? (
          <>
            {/* ===== FEATURED ===== */}
            {featuredStudy && (
              <section className="section-sm">
                <div className="container-narrow">
                  <AnimatedSection>
                    <Link
                      to={`/case-studies/${featuredStudy.slug}`}
                      className="block card-elevated p-8 group"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                          Featured
                        </span>
                        <span className="px-3 py-1 text-xs bg-accent text-muted-foreground rounded-full">
                          {featuredStudy.category}
                        </span>
                      </div>

                      <h2 className="text-foreground text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {featuredStudy.title}
                      </h2>

                      <p className="text-muted-foreground font-medium mb-3">
                        {featuredStudy.client_name}
                        {featuredStudy.client_title && ` — ${featuredStudy.client_title}`}
                      </p>

                      {featuredStudy.description && (
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {featuredStudy.description}
                        </p>
                      )}

                      {featuredStudy.metrics?.items?.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t pt-5">
                          {featuredStudy.metrics.items.map((metric, index) => (
                            <div key={index}>
                              <p className="text-2xl font-semibold text-primary">
                                {metric.value}
                              </p>
                              <p className="text-xs uppercase text-muted-foreground tracking-wide">
                                {metric.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-6 text-primary font-medium flex items-center gap-2">
                        Read full study →
                      </div>
                    </Link>
                  </AnimatedSection>
                </div>
              </section>
            )}

            {/* ===== OTHER STUDIES GRID ===== */}
            {otherStudies.length > 0 && (
              <section className="section-sm">
                <div className="container-wide">
                  <AnimatedSection>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {otherStudies.map((cs) => (
                        <Link
                          key={cs.id}
                          to={`/case-studies/${cs.slug}`}
                          className="card-elevated p-6 group"
                        >
                          <span className="text-xs bg-accent px-3 py-1 rounded-full text-muted-foreground">
                            {cs.category}
                          </span>

                          <h3 className="text-foreground mt-4 mb-2 font-semibold group-hover:text-primary transition-colors">
                            {cs.title}
                          </h3>

                          <p className="text-muted-foreground text-sm mb-3">
                            {cs.client_name}
                          </p>

                          {cs.description && (
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                              {cs.description}
                            </p>
                          )}

                          <span className="text-primary text-sm font-medium">
                            View case study →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </AnimatedSection>
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="section-sm">
            <div className="container-narrow text-center">
              <p className="text-muted-foreground">
                No published case studies yet.
              </p>
            </div>
          </section>
        )}

        <div className="container-narrow">
          <hr className="divider" />
        </div>

        {/* Footer CTA */}
        <section className="section-sm">
          <div className="container-narrow text-center">
            <AnimatedSection>
              <p className="text-muted-foreground">
                Want to build something structured and long-term?
              </p>
              <Link
                to="/contact"
                className="inline-block mt-4 text-primary font-medium"
              >
                Discuss a project →
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CaseStudies;
