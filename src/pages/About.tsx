import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

const workingPhilosophy = [
  {
    title: "I don't promise instant results",
    description:
      "Building genuine authority takes time. If you need rankings by next week, this isn't the right approach. Real SEO success is measured in months and years, not days.",
  },
  {
    title: "I avoid shortcuts and hacks",
    description:
      "Every 'trick' that works today becomes tomorrow's penalty. I build on foundations that search engines reward, not techniques they'll eventually punish.",
  },
  {
    title: "I design decisions before interfaces",
    description:
      "A beautiful website with poor strategy fails. Before touching design, I understand your goals, your audience, and the competitive landscape.",
  },
  {
    title: "I preserve what already works",
    description:
      "Many professionals have existing reputation signals they're unaware of. Destroying these in pursuit of 'modern' design is a costly mistake I help avoid.",
  },
];

const About = () => {
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
              About
            </p>
            <h1 className="mb-8 text-foreground">
              Building digital presence for professionals who've already earned it.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="prose-custom"
          >
            <p className="text-lg md:text-xl">
              I work with professionals who already have real-world credibility but lack
              a digital presence that reflects it. My role is to translate decades of
              expertise into online authority that serves them for years to come.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* Background */}
      <section className="section-sm">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
              Background
            </p>
            <h2 className="mb-6 text-foreground">Who I am and what I do</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="prose-custom">
            <p className="text-lg">
              N.L. Bhattarai builds websites and digital systems for professionals who
              need their online presence to match their real-world reputation. This isn't
              about flashy design or trending aesthetics—it's about credibility,
              structure, and long-term thinking.
            </p>
            <p>
              The focus is on doctors, clinics, hospitals, and senior experts who
              require an education-first, SEO-safe approach. These are fields where
              trust matters more than impressions, where accuracy outweighs creativity,
              and where patience is rewarded over shortcuts.
            </p>
            <p>
              Every project begins with understanding what already works—the reputation
              signals, the existing content, the trust that's already been built in the
              real world. From there, the goal is preservation first, growth second.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* Why Healthcare */}
      <section className="section-sm bg-card/30">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
              Specialization
            </p>
            <h2 className="mb-6 text-foreground">Why healthcare & senior experts</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="prose-custom">
            <p className="text-lg">
              Medical and expert websites require restraint. In these fields, trust
              matters more than marketing. Search engines reward clarity and
              consistency—especially in areas where accuracy and credibility are
              non-negotiable.
            </p>
            <p>
              Healthcare is what Google calls a "Your Money or Your Life" (YMYL)
              category. This means medical content is held to higher standards than
              regular websites. One wrong move—an aggressive marketing tactic, a
              misleading claim, a poorly-sourced article—can result in significant
              ranking penalties that take months to recover from.
            </p>
            <p>
              This is not an industry for shortcuts or trends. It demands patience,
              precision, and respect for the expertise being represented. Most digital
              agencies don't understand this. They apply the same playbook to a surgeon
              that they would to a restaurant—and the results are predictably poor.
            </p>
            <p className="mt-8 border-l-2 border-primary/30 pl-6 italic text-foreground">
              "The medical field has enough noise. What it needs is clarity,
              trustworthiness, and information that genuinely helps patients make
              better decisions."
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* Working Philosophy */}
      <section className="section-sm">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
              Working Philosophy
            </p>
            <h2 className="mb-8 text-foreground">How I approach every project</h2>
          </AnimatedSection>

          <div className="space-y-8">
            {workingPhilosophy.map((item, index) => (
              <AnimatedSection
                key={item.title}
                delay={index * 0.1}
                className="border-l-2 border-border hover:border-primary/50 pl-6 py-2 transition-colors duration-300"
              >
                <h3 className="text-xl text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.5} className="mt-16">
            <p className="text-foreground font-serif text-2xl md:text-3xl leading-relaxed">
              This approach isn't fast—but it <span className="text-gradient">lasts</span>.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default About;
