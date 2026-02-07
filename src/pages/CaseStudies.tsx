import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

const CaseStudies = () => {
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

      {/* Featured Case Study */}
      <section className="section-sm">
        <div className="container-narrow">
          <AnimatedSection>
            <Link
              to="/case-studies/dr-parash-mani-shrestha"
              className="block card-elevated group"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  Featured
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-accent text-muted-foreground rounded-full">
                  Healthcare
                </span>
              </div>

              <h2 className="mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                From Zero Digital Presence to Top Google Rankings
              </h2>

              <p className="text-muted-foreground mb-2 font-medium">
                Dr. Parash Mani Shrestha — Senior Urologist, Nepal
              </p>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                A comprehensive case study documenting how a senior medical
                professional with over 30 years of clinical experience went from
                having no digital presence to ranking #1 on Google for competitive
                healthcare keywords in Nepal. This project demonstrates the power of
                patient, education-first SEO in healthcare.
              </p>

              <div className="flex flex-wrap gap-6 pt-4 border-t border-border/50">
                <div>
                  <p className="text-2xl font-serif text-primary">#1</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Google Ranking
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-serif text-primary">30+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Years Experience
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-serif text-primary">0→1</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Digital Presence
                  </p>
                </div>
              </div>

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
