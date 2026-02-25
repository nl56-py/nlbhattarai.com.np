import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEO, { personSchema, breadcrumbSchema, webpageSchema } from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";

const principles = [
  "I don't promise instant results",
  "I avoid shortcuts and hacks",
  "I design decisions before interfaces",
  "I preserve what already works",
  "I prioritize trust over traffic",
];

const About = () => {
  return (
    <Layout>
      <SEO
        title="About N.L. Bhattarai — Digital Systems Engineer & SEO Strategist"
        description="I design secure websites, software, and digital systems for organizations that depend on trust, clarity, and long-term reliability."
        keywords="about N.L. Bhattarai, digital systems engineer, software developer Nepal, SEO strategist, cybersecurity, system architecture"
        canonical="https://www.nlbhattarai.com.np/about"
        ogImage="https://www.nlbhattarai.com.np/og/hero-share-1200x630.jpg?v=20260223a"
        ogImageAlt="N.L. Bhattarai portrait"
        jsonLd={[
          personSchema(),
          webpageSchema({
            title: "About N.L. Bhattarai - Digital Systems Engineer and SEO Strategist",
            description:
              "I design secure websites, software, and digital systems for organizations that depend on trust, clarity, and long-term reliability.",
            url: "https://www.nlbhattarai.com.np/about",
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://www.nlbhattarai.com.np" },
            { name: "About", url: "https://www.nlbhattarai.com.np/about" },
          ]),
        ]}
      />
      {/* Tighter wrapper: reduces blank space between sections + dividers */}
      <div
        className="
          [&_.section]:py-8 md:[&_.section]:py-10
          [&_.section-sm]:py-6 md:[&_.section-sm]:py-8
          [&_.divider]:my-4 md:[&_.divider]:my-6
          [&_h1]:mb-3
          [&_h2]:mb-3
        "
      >
        {/* Hero Section */}
        <section className="section">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
                About
              </p>
              <h1 className="text-foreground">N.L. Bhattarai</h1>

              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                I build secure websites, custom software, and digital systems for
                people and organizations who rely on trust. My focus is long-term
                digital reliability with clear structure and clean execution.
              </p>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                My full name is Nim Lal Bhattarai, and I am also referred to as Nim
                Bhattarai in many project and search contexts.
              </p>

              {/* Strategic add: writing + vibe coding + security */}
              <p className="text-muted-foreground mt-3 leading-relaxed">
                I also write about{" "}
                <span className="text-foreground font-medium">cybersecurity</span>,{" "}
                <span className="text-foreground font-medium">vibe coding</span>, and{" "}
                <span className="text-foreground font-medium">SEO-safe digital builds</span>
                —sharing practical lessons, patterns, and decisions that help projects
                stay secure, maintainable, and credible.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="container-narrow">
          <hr className="divider" />
        </div>

        {/* Background Section */}
        <section className="section-sm">
          <div className="container-narrow">
            <AnimatedSection>
              <p className="text-primary font-medium mb-2 tracking-wide text-sm uppercase">
                Background
              </p>
              <h2 className="text-foreground">What I do</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="prose-custom">
              <p className="text-lg">
                I design and build digital systems that are{" "}
                <span className="text-foreground font-medium">structured</span>,{" "}
                <span className="text-foreground font-medium">SEO-safe</span>, and{" "}
                <span className="text-foreground font-medium">trust-oriented</span>.
                Instead of chasing visibility, the goal is to create a digital system
                that makes your credibility obvious—so the right people can choose you
                with confidence.
              </p>

              <p>
                The work spans public websites, internal tools, automation workflows,
                content systems, and technical architecture. Not gimmicks or rushed
                shortcuts. Just clear systems that stay useful over time.
              </p>
            </AnimatedSection>

            {/* What you get block (kept; spacing reduced) */}
            <AnimatedSection delay={0.2} className="mt-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="card-elevated p-4">
                  <p className="text-foreground font-medium mb-1">SEO-safe public presence</p>
                  <p className="text-muted-foreground">
                    Search-friendly structure, clear content layout, and durable foundations.
                  </p>
                </div>
                <div className="card-elevated p-4">
                  <p className="text-foreground font-medium mb-1">Security-minded engineering</p>
                  <p className="text-muted-foreground">
                    Safer defaults, careful integrations, and fewer risky shortcuts.
                  </p>
                </div>
                <div className="card-elevated p-4">
                  <p className="text-foreground font-medium mb-1">Clarity-first product UX</p>
                  <p className="text-muted-foreground">
                    Pages that explain clearly and reduce decision friction.
                  </p>
                </div>
                <div className="card-elevated p-4">
                  <p className="text-foreground font-medium mb-1">Maintainable system</p>
                  <p className="text-muted-foreground">
                    Built to update easily without breaking consistency.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <div className="container-narrow">
          <hr className="divider" />
        </div>

        {/* Focus Area Section */}
        <section className="section-sm">
          <div className="container-narrow">
            <AnimatedSection>
              <p className="text-primary font-medium mb-2 tracking-wide text-sm uppercase">
                Focus
              </p>
              <h2 className="text-foreground">Where this approach fits best</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="prose-custom">
              <p className="text-lg">
                High-trust fields demand restraint. In healthcare, education, and
                professional services, digital presence must prioritize{" "}
                <span className="text-foreground font-medium">trust</span>,{" "}
                <span className="text-foreground font-medium">clarity</span>, and{" "}
                <span className="text-foreground font-medium">safe execution</span>.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <div className="container-narrow">
          <hr className="divider" />
        </div>

        {/* Working Philosophy Section */}
        <section className="section-sm">
          <div className="container-narrow">
            <AnimatedSection>
              <p className="text-primary font-medium mb-2 tracking-wide text-sm uppercase">
                Approach
              </p>
              <h2 className="text-foreground">Working philosophy</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <ul className="space-y-2">
                {principles.map((principle, index) => (
                  <motion.li
                    key={principle}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    className="flex items-start gap-4 text-lg"
                  >
                    <span className="text-primary mt-1.5">○</span>
                    <span className="text-muted-foreground">{principle}</span>
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.25} className="mt-5">
              <p className="text-muted-foreground text-lg italic border-l-2 border-primary pl-6">
                I optimize for credibility and longevity—so the work keeps paying off.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <div className="container-narrow">
          <hr className="divider" />
        </div>

        {/* Long-term Thinking Section */}
        <section className="section-sm">
          <div className="container-narrow">
            <AnimatedSection>
              <p className="text-primary font-medium mb-2 tracking-wide text-sm uppercase">
                Next
              </p>
              <h2 className="text-foreground">Explore</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="prose-custom">
              <p className="text-lg">
                If you want to see real work or how I think, start here.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="mt-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href="/case-studies"
                  className="inline-flex items-center gap-2 text-primary font-medium group"
                >
                  <span className="link-animated">Case studies</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <span className="text-muted-foreground hidden sm:inline">•</span>
                <a
                  href="/blog"
                  className="inline-flex items-center gap-2 text-primary font-medium group"
                >
                  <span className="link-animated">Blog</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <span className="text-muted-foreground hidden sm:inline">•</span>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;


