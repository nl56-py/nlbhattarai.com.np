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
      {/* Hero Section with Image */}
      <section className="section">
        <div className="container-narrow">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
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
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <p className="text-primary font-medium mb-4 tracking-wide text-sm uppercase">
                About
              </p>
              <h1 className="mb-6 text-foreground">N.L. Bhattarai</h1>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                I work with professionals who already have real-world credibility but
                lack a digital presence that reflects it. My focus is on building
                systems that translate expertise into lasting authority.
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
            <h2 className="mb-6 text-foreground">What I do</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="prose-custom">
            <p className="text-lg">
              I build websites and digital systems for doctors, clinics, hospitals, and
              established professionals. My approach is education-first and SEO-safe,
              designed to build long-term authority rather than chase quick wins.
            </p>
            <p>
              Instead of listing tools or frameworks, I focus on outcomes. Every project
              begins with understanding what the client has already built—offline
              reputation, clinical expertise, years of patient trust—and finding ways to
              translate that into digital form without distortion.
            </p>
            <p>
              Most of my clients are established professionals who have spent decades
              building real-world credibility. They don't need marketing gimmicks. They
              need a digital presence that accurately reflects who they already are.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* Why Healthcare Section */}
      <section className="section-sm">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
              Focus Area
            </p>
            <h2 className="mb-6 text-foreground">Why healthcare and experts</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="prose-custom">
            <p className="text-lg">
              Medical and expert websites require restraint. Unlike e-commerce or
              entertainment sites, healthcare digital presence must prioritize trust over
              engagement, clarity over persuasion.
            </p>
            <p>
              Search engines have become increasingly sophisticated at evaluating
              healthcare content. Google's algorithms specifically target medical
              misinformation and reward content that demonstrates genuine expertise.
            </p>
            <p>
              This creates an opportunity: professionals with real credentials can build
              digital authority that shallow content farms cannot replicate. But it
              requires patience, accuracy, and a willingness to prioritize substance over
              style.
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
            <h2 className="mb-8 text-foreground">Working philosophy</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <ul className="space-y-4">
              {principles.map((principle, index) => (
                <motion.li
                  key={principle}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4 text-lg"
                >
                  <span className="text-primary mt-1.5">○</span>
                  <span className="text-muted-foreground">{principle}</span>
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={0.3} className="mt-10">
            <p className="text-muted-foreground text-lg italic border-l-2 border-primary pl-6">
              This approach isn't fast—but it lasts.
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
            <h2 className="mb-6 text-foreground">On long-term thinking</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="prose-custom">
            <p className="text-lg">
              The digital landscape rewards patience. While others chase algorithm
              updates and trending tactics, sustainable digital authority comes from
              consistent, quality-focused work over years.
            </p>
            <p>
              I've seen professionals destroy years of carefully built reputation in
              weeks by following bad advice. The agency promised quick results. The
              tactics worked briefly. Then the algorithm update hit, and everything
              collapsed.
            </p>
            <p>
              My approach is different. I build systems designed to strengthen over time,
              not tactics that expire. Every decision considers not just immediate impact
              but long-term sustainability.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default About;
