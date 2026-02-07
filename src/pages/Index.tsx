import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

const philosophyItems = [
  {
    title: "Clarity over noise",
    description:
      "In a world flooded with information, your digital presence should explain—not impress. Every element serves a purpose: no decorative clutter, no hollow marketing speak—just clear communication that respects your audience’s intelligence.",
    icon: "◯",
  },
  {
    title: "Systems over tactics",
    description:
      "Quick wins fade. Long-term results come from sustainable structures that compound over time. I build digital systems that get stronger with age—not ones that need constant maintenance or trendy redesigns.",
    icon: "△",
  },
  {
    title: "Trust before growth",
    description:
      "Growth without credibility breaks trust. Before adding anything new, I protect what already works and what your audience already believes—then expand carefully around that foundation.",
    icon: "□",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Compact mode wrapper: reduces vertical spacing while preserving all animations/elements */}
      <div
        className="
          [&_.section]:py-12 md:[&_.section]:py-14
          [&_.section-sm]:py-10 md:[&_.section-sm]:py-12
          [&_.divider]:my-8 md:[&_.divider]:my-10
          [&_h1]:mb-6
          [&_h2]:mb-4
        "
      >
        {/* Hero Section */}
        <section className="section hero-pattern relative overflow-hidden">
          <div className="container-narrow relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <p className="text-primary font-medium mb-4 tracking-wide text-sm uppercase">
                Digital Authority for Professionals & Organizations
              </p>
              <h1 className="text-foreground">
                I build SEO-safe websites that turn{" "}
                <span className="text-gradient">
                  trust, expertise and establishment
                </span>{" "}
                into digital authority—across sectors.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl"
            >
              I help{" "}
              <span className="text-foreground font-medium">
                doctors, clinics, and hospitals
              </span>{" "}
              build calm, credible digital systems—then apply the same
              trust-first approach for{" "}
              <span className="text-foreground font-medium">
                schools, colleges, SMEs, and service businesses
              </span>
              . The focus is always long-term authority, not short-term
              visibility.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-7 flex flex-wrap gap-4"
            >
              <Link
                to="/case-studies/dr-parash-mani-shrestha"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
              >
                View Case Study
                <span className="text-lg">→</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-accent"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>

          {/* Decorative element */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-96 bg-gradient-to-l from-primary/5 to-transparent blur-3xl pointer-events-none" />
        </section>

        <div className="container-narrow">
          <hr className="divider" />
        </div>

        {/* Philosophy Section */}
        <section className="section-sm">
          <div className="container-wide">
            <AnimatedSection className="text-center mb-10">
              <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
                Working Philosophy
              </p>
              <h2 className="text-foreground">Principles that guide every project</h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6">
              {philosophyItems.map((item, index) => (
                <AnimatedSection
                  key={item.title}
                  delay={index * 0.15}
                  className="card-elevated group"
                >
                  <span className="text-3xl text-primary/60 mb-4 block font-serif group-hover:text-primary transition-colors duration-300">
                    {item.icon}
                  </span>
                  <h3 className="mb-3 text-foreground text-xl">{item.title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {item.description}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <div className="container-narrow">
          <hr className="divider" />
        </div>

        {/* Proof Section */}
        <section className="section-sm">
          <div className="container-narrow">
            <AnimatedSection>
              <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
                Proof of Approach
              </p>
              <h2 className="text-foreground">Real work, documented</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="prose-custom">
              <p className="text-lg">
                The best way to understand my approach is to look at real work.
                Strategy without execution means nothing—results speak louder than
                promises.
              </p>
              <p>
                Below is a documented case study of helping a senior medical
                professional with decades of experience go from low visibility to
                strong Google rankings—by building credibility first, then scaling
                carefully.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <Link
                to="/case-studies/dr-parash-mani-shrestha"
                className="mt-6 inline-flex items-center gap-3 group"
              >
                <span className="link-animated text-lg">Read the full case study</span>
                <span className="text-primary transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </AnimatedSection>
          </div>
        </section>

        <div className="container-narrow">
          <hr className="divider" />
        </div>

        {/* Who This Is For */}
        <section className="section-sm bg-card/30">
          <div className="container-narrow">
            <AnimatedSection>
              <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
                Ideal Clients
              </p>
              <h2 className="text-foreground">Who this is for</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="prose-custom">
              <p className="text-lg mb-7">
                This approach works best for people and organizations that have
                already earned trust offline—and now want their digital presence to
                match that reality.
              </p>

              <ul className="space-y-4">
                <li>
                  <strong className="text-foreground">
                    Doctors, clinics, and hospitals
                  </strong>
                  <span className="text-muted-foreground">
                    {" "}
                    — credibility-first websites that protect patient trust
                  </span>
                </li>
                <li>
                  <strong className="text-foreground">Schools and colleges</strong>
                  <span className="text-muted-foreground">
                    {" "}
                    — clear digital communication for parents, students, and
                    admissions
                  </span>
                </li>
                <li>
                  <strong className="text-foreground">SMEs and local businesses</strong>
                  <span className="text-muted-foreground">
                    {" "}
                    — strong foundations for discoverability, inquiries, and steady
                    growth
                  </span>
                </li>
                <li>
                  <strong className="text-foreground">Professional services</strong>
                  <span className="text-muted-foreground">
                    {" "}
                    — consultants, engineers, architects, lawyers, agencies, and
                    experts
                  </span>
                </li>
                <li>
                  <strong className="text-foreground">
                    Organizations with real-world reputation
                  </strong>
                  <span className="text-muted-foreground">
                    {" "}
                    — but weak, outdated, or inconsistent digital presence
                  </span>
                </li>
              </ul>
            </AnimatedSection>
          </div>
        </section>

        <div className="container-narrow">
          <hr className="divider" />
        </div>

        {/* Footer CTA */}
        <section className="section-sm">
          <div className="container-narrow text-center">
            <AnimatedSection>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                If this way of working resonates, you can{" "}
                <Link to="/case-studies" className="link-primary">
                  explore the work
                </Link>{" "}
                or{" "}
                <Link to="/contact" className="link-primary">
                  reach out
                </Link>
                .
              </p>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
