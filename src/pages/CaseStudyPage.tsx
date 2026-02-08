import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";

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
  content: string;
  category: string;
  cover_image_url: string | null;
  tags: string[];
  metrics: { items?: MetricItem[] } | null;
  featured: boolean;
  published: boolean;
  created_at: string;
}

const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: caseStudy, isLoading, error } = useQuery({
    queryKey: ["case-study", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (error) throw error;
      return data as CaseStudy | null;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (error || !caseStudy) {
    return (
      <Layout>
        <section className="section">
          <div className="container-narrow text-center">
            <h1 className="mb-4 text-foreground">Case Study Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The case study you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/case-studies" className="link-primary">
              ← Back to Case Studies
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const metrics = caseStudy.metrics?.items || [];

  return (
    <Layout>
      {/* Back Link */}
      <section className="pt-8 pb-0">
        <div className="container-narrow">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="section-sm">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex items-start gap-4 mb-4 flex-wrap">
              {caseStudy.featured && (
                <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  Featured
                </span>
              )}
              <span className="px-3 py-1 text-xs font-medium bg-accent text-muted-foreground rounded-full">
                {caseStudy.category}
              </span>
              {caseStudy.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-accent text-muted-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mb-4 text-foreground">{caseStudy.title}</h1>

            <p className="text-muted-foreground mb-2 font-medium text-lg">
              {caseStudy.client_name}
              {caseStudy.client_title && ` — ${caseStudy.client_title}`}
            </p>

            {caseStudy.description && (
              <p className="text-muted-foreground text-lg leading-relaxed">
                {caseStudy.description}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      {caseStudy.cover_image_url && (
        <section className="pb-8">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <img
                src={caseStudy.cover_image_url}
                alt={caseStudy.title}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Metrics */}
      {metrics.length > 0 && (
        <section className="pb-8">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-8 p-6 bg-card rounded-lg border border-border/50"
            >
              {metrics.map((metric, index) => (
                <div key={index}>
                  <p className="text-3xl font-serif text-primary">{metric.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {metric.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* Content */}
      <section className="section-sm">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: caseStudy.content }}
          />
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* CTA */}
      <section className="section-sm">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <p className="text-muted-foreground mb-4">
              Interested in similar results for your practice or business?
            </p>
            <Link to="/contact" className="link-primary text-lg">
              Let's discuss your project →
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudyPage;
