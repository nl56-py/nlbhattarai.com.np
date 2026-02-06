import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

const Contact = () => {
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
              Let's Connect
            </p>
            <h1 className="mb-8 text-foreground">Contact</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="prose-custom"
          >
            <p className="text-lg md:text-xl">
              If you care about building a digital presence the right way—with
              patience, precision, and respect for what you've already built—I'd be
              glad to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* Contact Info */}
      <section className="section-sm">
        <div className="container-narrow">
          <AnimatedSection className="prose-custom">
            <p className="text-lg">
              The best way to start is with a brief email explaining your situation
              and what you're looking to achieve. I don't need a detailed brief at
              this stage—just enough context to understand whether there's a good
              fit.
            </p>
            <p>
              I typically respond within 48 hours. If your project aligns with how I
              work, we'll schedule a call to discuss specifics.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-12">
            <div className="card-elevated glow-primary">
              <p className="text-muted-foreground mb-4 text-sm uppercase tracking-wide">
                Email
              </p>
              <a
                href="mailto:hello@nlbhattarai.com"
                className="text-2xl md:text-3xl font-serif text-foreground hover:text-primary transition-colors duration-300"
              >
                hello@nlbhattarai.com
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* What to Expect */}
      <section className="section-sm bg-card/30">
        <div className="container-narrow">
          <AnimatedSection>
            <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
              What to Expect
            </p>
            <h2 className="mb-6 text-foreground">Working together</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="prose-custom">
            <p>
              I work selectively with professionals who share a long-term
              perspective. This isn't for everyone, and that's intentional. Quick
              fixes, aggressive timelines, and "growth hacking" approaches don't fit
              the way I operate.
            </p>
            <p>
              If you're looking for someone to help you build something that lasts—a
              digital presence that reflects your real-world credibility and grows
              stronger over time—then we should talk.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-10">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="py-4">
                <p className="text-2xl font-serif text-primary mb-2">01</p>
                <h3 className="text-lg text-foreground mb-2">Initial Conversation</h3>
                <p className="text-muted-foreground text-sm">
                  We discuss your situation, goals, and whether there's alignment in
                  approach and values.
                </p>
              </div>
              <div className="py-4">
                <p className="text-2xl font-serif text-primary mb-2">02</p>
                <h3 className="text-lg text-foreground mb-2">Assessment</h3>
                <p className="text-muted-foreground text-sm">
                  I evaluate your current digital presence and identify what's
                  working, what's not, and what opportunities exist.
                </p>
              </div>
              <div className="py-4">
                <p className="text-2xl font-serif text-primary mb-2">03</p>
                <h3 className="text-lg text-foreground mb-2">Proposal</h3>
                <p className="text-muted-foreground text-sm">
                  A clear recommendation with scope, timeline, and investment—no
                  hidden fees or unexpected changes.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* Final Note */}
      <section className="section-sm">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <p className="text-foreground font-serif text-xl md:text-2xl">
              "I work selectively and respond when there's a good fit."
            </p>
            <p className="text-muted-foreground/70 mt-4 text-sm">
              Looking forward to hearing from you.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
