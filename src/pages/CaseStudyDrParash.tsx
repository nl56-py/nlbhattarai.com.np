import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEO, { breadcrumbSchema, caseStudySchema, webpageSchema } from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";

const CaseStudyDrParash = () => {
  return (
    <Layout>
      <SEO
        title="Dr. Parash Mani Shrestha SEO Case Study"
        description="How Dr. Parash Mani Shrestha grew from zero digital presence to top Google visibility through a structured, trust-first healthcare SEO and web strategy."
        keywords="Dr Parash Mani Shrestha case study, healthcare SEO Nepal, doctor digital presence strategy, urologist SEO strategy, medical digital authority"
        canonical="https://nlbhattarai.com/case-studies/dr-parash-mani-shrestha"
        ogType="article"
        ogImageAlt="Dr. Parash Mani Shrestha case study results"
        jsonLd={[
          webpageSchema({
            title: "Dr. Parash Mani Shrestha SEO Case Study",
            description:
              "How Dr. Parash Mani Shrestha grew from zero digital presence to top Google visibility through a structured healthcare SEO and web strategy.",
            url: "https://nlbhattarai.com/case-studies/dr-parash-mani-shrestha",
          }),
          caseStudySchema({
            title: "From Zero Digital Presence to Top Google Rankings",
            description:
              "A healthcare SEO and web strategy case study for Dr. Parash Mani Shrestha in Nepal.",
            url: "https://nlbhattarai.com/case-studies/dr-parash-mani-shrestha",
            datePublished: "2026-02-08",
            clientName: "Dr. Parash Mani Shrestha",
            category: "Healthcare",
            keywords:
              "healthcare SEO, urologist SEO, medical digital strategy, Nepal healthcare marketing",
          }),
          breadcrumbSchema([
            { name: "Home", url: "https://nlbhattarai.com" },
            { name: "Case Studies", url: "https://nlbhattarai.com/case-studies" },
            {
              name: "Dr. Parash Mani Shrestha Case Study",
              url: "https://nlbhattarai.com/case-studies/dr-parash-mani-shrestha",
            },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="section hero-pattern relative overflow-hidden">
        <div className="container-narrow relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <span>←</span>
              <span>Back to Case Studies</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                Healthcare
              </span>
              <span className="px-3 py-1 text-xs font-medium bg-accent text-muted-foreground rounded-full">
                SEO Strategy
              </span>
              <span className="px-3 py-1 text-xs font-medium bg-accent text-muted-foreground rounded-full">
                Web Development
              </span>
            </div>

            <h1 className="mb-6 text-foreground">
              From Zero Digital Presence to{" "}
              <span className="text-gradient">Top Google Rankings</span>
            </h1>

            <p className="text-xl text-muted-foreground font-medium">
              Dr. Parash Mani Shrestha — Senior Urologist, Nepal
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="mt-10 grid grid-cols-3 gap-6 md:gap-12"
          >
            <div className="text-center md:text-left">
              <p className="text-3xl md:text-4xl font-serif text-primary">#1</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
                Google Ranking
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-3xl md:text-4xl font-serif text-primary">30+</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
                Years Experience
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-3xl md:text-4xl font-serif text-primary">0→1</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mt-1">
                Digital Authority
              </p>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-96 bg-gradient-to-l from-primary/5 to-transparent blur-3xl pointer-events-none" />
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* The Situation */}
      <section className="section-sm">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
              Context
            </p>
            <h2 className="mb-6 text-foreground">The Situation</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="prose-custom">
            <p className="text-lg">
              Dr. Parash Mani Shrestha is a senior urologist with over three decades
              of clinical experience in Nepal. His reputation among peers and patients
              was impeccable—built through years of successful surgeries, academic
              contributions, and mentorship of younger doctors.
            </p>
            <p>
              Despite this, he had no digital presence. No website, no search
              visibility, no way for new patients to find or verify his expertise
              online. In an age where patients increasingly research doctors before
              booking appointments, this gap was costing him opportunities.
            </p>
            <p>
              The challenge wasn't just building a website—it was translating decades
              of real-world credibility into digital authority that search engines and
              patients would trust equally.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* The Challenge */}
      <section className="section-sm bg-card/30">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
              Challenges
            </p>
            <h2 className="mb-6 text-foreground">What Made This Difficult</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-elevated">
                <h3 className="text-lg text-foreground mb-3">Healthcare is a YMYL Category</h3>
                <p className="text-muted-foreground text-sm">
                  Google holds medical content to the highest standards. One misleading
                  claim or aggressive marketing tactic can result in penalties that take
                  months to recover from. This required extreme care with every piece of
                  content.
                </p>
              </div>
              <div className="card-elevated">
                <h3 className="text-lg text-foreground mb-3">Starting from Zero</h3>
                <p className="text-muted-foreground text-sm">
                  Unlike businesses with existing websites that need optimization, this
                  project started with nothing. No domain authority, no backlinks, no
                  indexed pages—everything had to be built from scratch.
                </p>
              </div>
              <div className="card-elevated">
                <h3 className="text-lg text-foreground mb-3">Competitive Landscape</h3>
                <p className="text-muted-foreground text-sm">
                  Nepal's healthcare search results are dominated by hospital portals and
                  medical tourism sites with years of SEO investment. Competing with them
                  required a different strategy—not trying to outspend them, but to
                  out-focus them.
                </p>
              </div>
              <div className="card-elevated">
                <h3 className="text-lg text-foreground mb-3">Translating Expertise</h3>
                <p className="text-muted-foreground text-sm">
                  Medical expertise is complex. The content needed to be accurate enough
                  for professionals while accessible enough for patients—a balance that
                  most healthcare websites get wrong.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* The Approach */}
      <section className="section-sm">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
              Strategy
            </p>
            <h2 className="mb-6 text-foreground">The Approach</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="prose-custom">
            <p className="text-lg">
              The goal was not to market aggressively but to accurately represent Dr.
              Shrestha's expertise in a format that search engines and patients could
              trust equally. This meant prioritizing clarity over creativity, accuracy
              over impressions.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-10 space-y-8">
            <div className="border-l-2 border-primary pl-6 py-2">
              <h3 className="text-xl text-foreground mb-3">Foundation First</h3>
              <p className="text-muted-foreground">
                Built a clean, fast-loading website with proper technical
                structure—semantic HTML, clear hierarchy, mobile-responsive design.
                Speed and accessibility were prioritized, knowing that technical
                excellence is the foundation Google rewards.
              </p>
            </div>

            <div className="border-l-2 border-border hover:border-primary/50 pl-6 py-2 transition-colors duration-300">
              <h3 className="text-xl text-foreground mb-3">Content Based on Reality</h3>
              <p className="text-muted-foreground">
                Every page focused on actual expertise and services, written in clear
                language patients could understand. No exaggeration, no marketing
                speak—just honest representation of decades of clinical experience.
              </p>
            </div>

            <div className="border-l-2 border-border hover:border-primary/50 pl-6 py-2 transition-colors duration-300">
              <h3 className="text-xl text-foreground mb-3">SEO Through Clarity</h3>
              <p className="text-muted-foreground">
                No tricks or keyword stuffing. Optimized for how people actually search
                for urological care in Nepal. Long-tail keywords that matched patient
                intent, structured data that helped search engines understand the
                content.
              </p>
            </div>

            <div className="border-l-2 border-border hover:border-primary/50 pl-6 py-2 transition-colors duration-300">
              <h3 className="text-xl text-foreground mb-3">Trust Signals</h3>
              <p className="text-muted-foreground">
                Credentials, experience, and hospital affiliations presented plainly
                and accurately. In healthcare, trust comes from transparency—not from
                impressive design or bold claims.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* The Outcome */}
      <section className="section-sm">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
              Results
            </p>
            <h2 className="mb-6 text-foreground">The Outcome</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="prose-custom">
            <p className="text-lg">
              Within months, Dr. Shrestha's website began ranking for relevant search
              terms. The site now appears in top positions for searches related to
              urology services in Nepal—competing successfully against hospital
              portals with years of head start.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-elevated text-center md:text-left">
                <p className="text-4xl font-serif text-primary mb-2">Page 1</p>
                <p className="text-muted-foreground">
                  Rankings for targeted medical search terms
                </p>
              </div>
              <div className="card-elevated text-center md:text-left">
                <p className="text-4xl font-serif text-primary mb-2">Organic</p>
                <p className="text-muted-foreground">
                  Consistent traffic from patients seeking urological care
                </p>
              </div>
              <div className="card-elevated text-center md:text-left">
                <p className="text-4xl font-serif text-primary mb-2">Sustainable</p>
                <p className="text-muted-foreground">
                  Digital presence that grows stronger with time
                </p>
              </div>
              <div className="card-elevated text-center md:text-left">
                <p className="text-4xl font-serif text-primary mb-2">$0</p>
                <p className="text-muted-foreground">
                  No ongoing dependence on paid advertising
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* What This Demonstrates */}
      <section className="section-sm bg-card/30">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
              Takeaways
            </p>
            <h2 className="mb-6 text-foreground">What This Demonstrates</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="prose-custom">
            <p className="text-lg">
              This project shows that sustainable search visibility comes from
              representing real expertise accurately—not from aggressive marketing or
              technical manipulation.
            </p>
            <p>
              For senior professionals, especially in healthcare, the digital strategy
              should be an extension of the same principles that built their offline
              reputation: competence, clarity, and consistency over time.
            </p>
            <p className="mt-8 border-l-2 border-primary/30 pl-6 italic text-foreground text-xl">
              "The best SEO strategy for a genuine expert is to accurately represent
              their expertise. Search engines are getting better at recognizing quality
              every year—which means authentic authority becomes more valuable, not
              less."
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* CTA */}
      <section className="section-sm">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <h2 className="text-foreground mb-4">
              Interested in a similar approach?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              If you're a medical professional or senior expert looking to build
              sustainable digital authority, I'd be glad to discuss your situation.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
            >
              Get in Touch
              <span className="text-lg">→</span>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudyDrParash;
