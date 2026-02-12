import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEO, { breadcrumbSchema } from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { MessageCircle, Facebook } from "lucide-react";

const WHATSAPP_NUMBER = "+9779868254104";
// WhatsApp wa.me needs digits only (no +)
const WHATSAPP_WA_ME = "https://wa.me/9779868254104";
const FACEBOOK_PROFILE =
  "https://www.facebook.com/profile.php?id=61587263263713";

const Contact = () => {
  return (
    <Layout>
      <SEO
        title="Contact N.L. Bhattarai — Let's Build Something"
        description="Get in touch to discuss your project. I build SEO-safe, secure web systems for healthcare, education, and growing businesses."
        keywords="contact N.L. Bhattarai, hire web developer Nepal, SEO consultant, healthcare website developer"
        canonical="https://nlbhattarai.com/contact"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", url: "https://nlbhattarai.com" },
            { name: "Contact", url: "https://nlbhattarai.com/contact" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact N.L. Bhattarai",
            url: "https://nlbhattarai.com/contact",
            description: "Contact page for project inquiries and consultations.",
          },
        ]}
      />
      {/* Compact spacing wrapper */}
      <div
        className="
          [&_.section]:py-8 md:[&_.section]:py-10
          [&_.section-sm]:py-6 md:[&_.section-sm]:py-8
          [&_.divider]:my-6
          [&_h1]:mb-4
          [&_h2]:mb-4
        "
      >
        {/* Hero */}
        <section className="section">
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
                Let&apos;s Connect
              </p>
              <h1 className="text-foreground">Contact</h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="prose-custom"
            >
              <p className="text-lg md:text-xl">
                If you care about building a digital presence the right way—with
                patience, precision, and respect for what you&apos;ve already built—
                I&apos;d be glad to hear from you.
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
                The best way to start is with a brief message explaining your
                situation and what you&apos;re trying to achieve. I don&apos;t need
                a detailed brief at this stage—just enough context to understand
                whether there&apos;s a good fit.
              </p>
              <p>I typically respond within 48 hours.</p>
            </AnimatedSection>

            {/* Cards */}
               <AnimatedSection delay={0.15} className="mt-6">
  <div className="grid md:grid-cols-3 gap-4">

    {/* Email */}
    <div className="card-elevated glow-primary p-6">
      <p className="text-muted-foreground mb-3 text-sm uppercase tracking-wide">
        Email
      </p>

      <a
        href="mailto:hello@nlbhattarai.com"
        className="block text-lg md:text-xl font-serif text-foreground hover:text-primary transition-colors duration-300 break-words"
      >
        hello@nlbhattarai.com
      </a>

      <p className="text-muted-foreground text-sm mt-2">
        For project inquiries and detailed discussions.
      </p>
    </div>

    {/* WhatsApp */}
    <div className="card-elevated p-6">
      <p className="text-muted-foreground mb-3 text-sm uppercase tracking-wide">
        WhatsApp
      </p>

      <a
        href="https://wa.me/9779868254104"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-300"
      >
        <MessageCircle className="w-5 h-5 text-primary" />
        <span className="text-lg font-medium">
          +977 9868254104
        </span>
      </a>

      <p className="text-muted-foreground text-sm mt-2">
        Quick questions and scheduling.
      </p>
    </div>

    {/* Facebook */}
    <div className="card-elevated p-6">
      <p className="text-muted-foreground mb-3 text-sm uppercase tracking-wide">
        Facebook
      </p>

      <a
        href="https://www.facebook.com/profile.php?id=61587263263713"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-lg font-medium text-foreground hover:text-primary transition-colors duration-300"
      >
        <Facebook className="w-5 h-5 text-primary" />
        N.L BHATTARAI
      </a>

      <p className="text-muted-foreground text-sm mt-2">
        Public profile and updates.
      </p>
    </div>

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
              <h2 className="text-foreground">Working together</h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="prose-custom">
              <p>
                I work selectively with professionals who share a long-term
                perspective. Quick fixes and “growth hacking” approaches don’t fit
                the way I operate.
              </p>
              <p>
                If you want something that lasts—a digital presence that reflects
                real-world credibility and grows stronger over time—then we should
                talk.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="mt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="py-2">
                  <p className="text-2xl font-serif text-primary mb-2">01</p>
                  <h3 className="text-lg text-foreground mb-2">
                    Initial Conversation
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    We discuss your goals and whether there’s alignment in approach.
                  </p>
                </div>
                <div className="py-2">
                  <p className="text-2xl font-serif text-primary mb-2">02</p>
                  <h3 className="text-lg text-foreground mb-2">Assessment</h3>
                  <p className="text-muted-foreground text-sm">
                    I review what exists and identify the clearest next steps.
                  </p>
                </div>
                <div className="py-2">
                  <p className="text-2xl font-serif text-primary mb-2">03</p>
                  <h3 className="text-lg text-foreground mb-2">Proposal</h3>
                  <p className="text-muted-foreground text-sm">
                    A clear scope, timeline, and investment—no surprises.
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
                "I respond when there&apos;s a good fit."
              </p>
              <p className="text-muted-foreground/70 mt-3 text-sm">
                Looking forward to hearing from you.
              </p>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contact;
