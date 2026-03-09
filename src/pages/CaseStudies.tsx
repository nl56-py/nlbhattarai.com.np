import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import SEO, { breadcrumbSchema, webpageSchema } from "@/components/SEO";
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

  return (
    <Layout>
      <SEO
        title="Case Studies - Real Projects, Real Results"
        description="Documented projects across websites, software, and digital systems with measurable outcomes for healthcare and business."
        keywords="case studies, software projects, digital system implementation, SEO results, product engineering portfolio"
        canonical="https://www.nlbhattarai.com.np/case-studies"
        ogImage={featuredStudy?.cover_image_url || undefined}
        ogImageAlt={featuredStudy?.title || "N.L. Bhattarai case studies"}
        jsonLd={[
          webpageSchema({
            title: "Case Studies - Real Projects, Real Results",
            description:
              "Documented projects across websites, software, and digital systems with measurable outcomes for healthcare and business.",
            url: "https://www.nlbhattarai.com.np/case-studies",
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://www.nlbhattarai.com.np" },
            { name: "Case Studies", url: "https://www.nlbhattarai.com.np/case-studies" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Case Studies",
            url: "https://www.nlbhattarai.com.np/case-studies",
            description: "Portfolio of documented website, software, and digital systems projects.",
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
              <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">Portfolio</p>
              <h1 className="text-foreground mb-4">Case Studies</h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Documented projects focused on long-term authority, secure foundations, and measurable
                outcomes. Only published case studies from the admin panel are displayed here.
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
          <section className="section-sm">
            <div className="container-wide">
              <AnimatedSection>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {caseStudies.map((cs) => (
                    <Link
                      key={cs.id}
                      to={`/case-studies/${cs.slug}`}
                      className="card-elevated p-6 group"
                    >
                      {cs.cover_image_url && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <img
                            src={cs.cover_image_url}
                            alt={cs.title}
                            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      )}

                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        {cs.featured && (
                          <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                            Featured
                          </span>
                        )}
                        <span className="text-xs bg-accent px-3 py-1 rounded-full text-muted-foreground">
                          {cs.category}
                        </span>
                      </div>

                      <h3 className="text-foreground mb-2 font-semibold group-hover:text-primary transition-colors">
                        {cs.title}
                      </h3>

                      <p className="text-muted-foreground text-sm mb-3">
                        {cs.client_name}
                        {cs.client_title && ` - ${cs.client_title}`}
                      </p>

                      {cs.description && (
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                          {cs.description}
                        </p>
                      )}

                      <span className="text-primary text-sm font-medium">View case study {"->"}</span>
                    </Link>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>
        ) : (
          <section className="section-sm">
            <div className="container-narrow text-center">
              <p className="text-muted-foreground">No published case studies yet.</p>
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
              <p className="text-muted-foreground">Want to build software or a digital system that lasts?</p>
              <Link to="/contact" className="inline-block mt-4 text-primary font-medium">
                Discuss a project {"->"}
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CaseStudies;
