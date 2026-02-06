import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

const philosophyItems = [
  {
    title: "Clarity over noise",
    description:
      "In a world flooded with information, digital presence should explain, not impress. Every element serves a purpose—no decorative clutter, no marketing speak, just clear communication that respects your audience's intelligence.",
    icon: "◯",
  },
  {
    title: "Systems over tactics",
    description:
      "Quick wins fade. Long-term results come from building sustainable structures that compound over time. I design digital systems that grow stronger with age, not ones that require constant maintenance or trendy updates.",
    icon: "△",
  },
  {
    title: "Preservation before growth",
    description:
      "The instinct to rebuild from scratch often destroys what already works. Before adding anything new, I identify and protect the elements that have earned trust—then build carefully around them.",
    icon: "□",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section hero-pattern relative overflow-hidden">
        <div className="container-narrow relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="text-primary font-medium mb-4 tracking-wide text-sm uppercase">
              Digital Authority for Experts
            </p>
            <h1 className="mb-8 text-foreground">
              I build SEO-safe websites that turn{" "}
              <span className="text-gradient">real expertise</span> into digital authority.
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            I help doctors, clinics, hospitals, and senior professionals build calm,
            credible digital systems—without breaking trust or chasing trends. The focus
            is always on long-term authority, not short-term visibility.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
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
          <AnimatedSection className="text-center mb-16">
            <p className="text-primary font-medium mb-3 tracking-wide text-sm uppercase">
              Working Philosophy
            </p>
            <h2 className="text-foreground">Principles that guide every project</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
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
            <h2 className="mb-6 text-foreground">Real work, documented</h2>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1} className="prose-custom">
            <p className="text-lg">
              The best way to understand my approach is to look at real work. Theory
              without execution means nothing—results speak louder than promises.
            </p>
            <p>
              Below is a documented case study of helping a senior medical professional
              with over 30 years of clinical experience go from zero digital presence
              to top Google rankings in Nepal's competitive healthcare space.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <Link
              to="/case-studies/dr-parash-mani-shrestha"
              className="mt-8 inline-flex items-center gap-3 group"
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
            <h2 className="mb-8 text-foreground">Who this is for</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="prose-custom">
            <p className="text-lg mb-8">
              This approach works best for established professionals who have already
              proven themselves in the real world but haven't yet translated that
              credibility to the digital space.
            </p>
            <ul className="space-y-4">
              <li>
                <strong className="text-foreground">Doctors and medical specialists</strong>
                <span className="text-muted-foreground">
                  {" "}— whose expertise deserves proper online representation
                </span>
              </li>
              <li>
                <strong className="text-foreground">Clinics and hospitals</strong>
                <span className="text-muted-foreground">
                  {" "}— seeking to build trust before patients walk through the door
                </span>
              </li>
              <li>
                <strong className="text-foreground">Senior consultants and experts</strong>
                <span className="text-muted-foreground">
                  {" "}— with decades of experience but minimal digital footprint
                </span>
              </li>
              <li>
                <strong className="text-foreground">
                  Professionals with strong offline reputation
                </strong>
                <span className="text-muted-foreground">
                  {" "}— but weak or non-existent digital presence
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
              If this way of working resonates with how you think, feel free to{" "}
              <Link to="/case-studies" className="link-primary">
                explore the case study
              </Link>{" "}
              or{" "}
              <Link to="/contact" className="link-primary">
                get in touch
              </Link>
              .
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
