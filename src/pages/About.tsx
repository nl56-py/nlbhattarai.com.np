import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import profileImage from "@/assets/profile-image.png";

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
      {/* Compact mode wrapper: reduces vertical spacing while preserving animations/elements */}
      <div
        className="
          [&_.section]:py-12 md:[&_.section]:py-14
          [&_.section-sm]:py-10 md:[&_.section-sm]:py-12
          [&_.divider]:my-8 md:[&_.divider]:my-10
          [&_h1]:mb-5
          [&_h2]:mb-4
        "
      >
        {/* Hero Section with Image */}
        <section className="section">
          <div className="container-narrow">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative flex-shrink-0"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/10">
                  <img
                    src={profileImage}
                    alt="N.L. Bhattarai - Digital Authority Specialist"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
              </motion.div>

              {/* Hero Text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                <p className="text-primary font-medium mb-4 tracking-wide text-sm uppercase">
                  About
                </p>
                <h1 className="text-foreground">N.L. Bhattarai</h1>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                  I work with people and organizations who already have real-world
                  credibility but lack a digital presence that reflects it. My focus is
                  building calm, SEO-safe systems that translate expertise into lasting
                  authority—without breaking trust or chasing trends.
                </p>

                {/* Expanded detail aligned with updated Home messaging */}
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  Most often this includes{" "}
                  <span className="text-foreground font-medium">
                    doctors, clinics, and hospitals
                  </span>
                  —but the same trust-first structure also supports{" "}
                  <span className="text-foreground font-medium">
                    schools, colleges, SMEs, professional services, and growing
                    institutions
                  </span>
                  .
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="container-narrow">
          <hr className="divider" />
        </div>

        {/* Background Section */}
        <section className="section-sm">
          <div className="container-narrow">
            <AnimatedSection>
              <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
                Background
              </p>
              <h2 className="text-foreground">What I do</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="prose-custom">
              <p className="text-lg">
                I design and build websites that are{" "}
                <span className="text-foreground font-medium">structured</span>,{" "}
                <span className="text-foreground font-medium">SEO-safe</span>, and{" "}
                <span className="text-foreground font-medium">trust-oriented</span>.
                Instead of chasing visibility, the goal is to create a digital system
                that makes your credibility obvious—so the right people can choose you
                with confidence.
              </p>

              <p>
                The work typically includes information architecture, on-page SEO,
                content structure, technical foundations, and clarity-driven design.
                Not flashy animations. Not gimmicks. Just a calm interface that
                communicates expertise.
              </p>

              <p>
                This applies strongly to healthcare—where trust is fragile—but it also
                applies to education and SMEs: admissions, inquiries, service requests,
                partnerships, and reputation all depend on clear communication.
              </p>
            </AnimatedSection>

            {/* Compact “What you get” block: adds detail without adding new sections */}
            <AnimatedSection delay={0.2} className="mt-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="card-elevated p-5">
                  <p className="text-foreground font-medium mb-2">Clarity-first pages</p>
                  <p className="text-muted-foreground">
                    Clear navigation, credible content layout, and messaging that
                    respects the audience.
                  </p>
                </div>
                <div className="card-elevated p-5">
                  <p className="text-foreground font-medium mb-2">SEO-safe structure</p>
                  <p className="text-muted-foreground">
                    Built for long-term discoverability without keyword stuffing or
                    risky shortcuts.
                  </p>
                </div>
                <div className="card-elevated p-5">
                  <p className="text-foreground font-medium mb-2">Trust signals</p>
                  <p className="text-muted-foreground">
                    Credentials, process, proof, FAQs, and content hygiene—placed where
                    they matter.
                  </p>
                </div>
                <div className="card-elevated p-5">
                  <p className="text-foreground font-medium mb-2">Maintainable system</p>
                  <p className="text-muted-foreground">
                    A structure your team can update without breaking consistency.
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
              <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
                Focus Area
              </p>
              <h2 className="text-foreground">Why healthcare and established experts</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="prose-custom">
              <p className="text-lg">
                High-trust fields demand restraint. In healthcare, education, and
                professional services, the digital presence must prioritize{" "}
                <span className="text-foreground font-medium">trust over hype</span> and{" "}
                <span className="text-foreground font-medium">clarity over persuasion</span>.
              </p>
              <p>
                In healthcare specifically, the cost of confusion is high. Patients
                don’t need clever copy—they need accurate information, context, and a
                calm sense of confidence.
              </p>
              <p>
                That’s why I focus on experts and institutions: when real credentials
                exist, the right digital system can build authority that shallow
                content cannot replicate—without exaggeration, without distortion.
              </p>
            </AnimatedSection>

            {/* Added compact sector note (no new section) */}
            <AnimatedSection delay={0.2} className="mt-5">
              <p className="text-muted-foreground">
                The same approach maps cleanly to{" "}
                <span className="text-foreground font-medium">schools/colleges</span>{" "}
                (admissions clarity, parent trust), and{" "}
                <span className="text-foreground font-medium">SMEs</span>{" "}
                (steady inquiries, reputation, service clarity).
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
              <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
                Approach
              </p>
              <h2 className="text-foreground">Working philosophy</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <ul className="space-y-3">
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

            <AnimatedSection delay={0.25} className="mt-7">
              <p className="text-muted-foreground text-lg italic border-l-2 border-primary pl-6">
                This approach isn&apos;t fast—but it lasts.
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
              <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
                Philosophy
              </p>
              <h2 className="text-foreground">On long-term thinking</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="prose-custom">
              <p className="text-lg">
                The digital landscape rewards patience. While others chase algorithm
                updates and trending tactics, sustainable authority comes from
                consistent, quality-focused work over years.
              </p>
              <p>
                I’ve seen reputations get damaged by “fast growth” strategies—content
                that overpromises, SEO that cuts corners, and designs that look modern
                but communicate nothing. It might work briefly, then an update hits (or
                users lose trust), and everything collapses.
              </p>
              <p>
                My work is built around preservation: protect what already works,
                translate it clearly, and scale carefully. Every decision is made with
                long-term stability in mind—not just immediate visibility.
              </p>
            </AnimatedSection>

            {/* Compact CTA footer for About page */}
            <AnimatedSection delay={0.2} className="mt-7">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <a
                  href="/case-studies"
                  className="inline-flex items-center gap-2 text-primary font-medium group"
                >
                  <span className="link-animated">View documented work</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <span className="text-muted-foreground hidden sm:inline">•</span>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
                >
                  Contact for a fit check
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
