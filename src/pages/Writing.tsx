import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";

const writings = [
  {
    title: "Why most website redesigns fail",
    description:
      "Redesigns often focus on aesthetics while ignoring the systems that made the original work. Before changing anything, understand what you're preserving.",
    detail:
      "The urge to 'start fresh' is almost irresistible. But in my experience, most website failures happen not because the original was bad—but because the redesign destroyed what was working without understanding why it worked in the first place. Rankings, trust signals, user familiarity—all sacrificed at the altar of 'modern design.'",
    category: "Strategy",
  },
  {
    title: "SEO is a preservation problem",
    description:
      "The hard part isn't ranking—it's maintaining rankings over years without compromising on quality or resorting to shortcuts.",
    detail:
      "Getting to page one is the easy part—any aggressive campaign can do that temporarily. The real challenge is staying there while your competitors cycle through agencies, each one promising quick wins that eventually backfire. Sustainable SEO is about building assets that compound, not tactics that expire.",
    category: "SEO",
  },
  {
    title: "Medical websites should be boring",
    description:
      "In healthcare, trust comes from clarity and restraint. The most effective medical websites explain rather than impress.",
    detail:
      "When patients search for medical information, they're often anxious. They don't want to be marketed to—they want answers. The flashy animations, the aggressive CTAs, the stock photos of smiling doctors—these create distance, not trust. Boring, clear, accurate content wins.",
    category: "Healthcare",
  },
  {
    title: "The problem with 'comprehensive' content",
    description:
      "Longer isn't better. What matters is answering the actual question, not demonstrating how much you know about tangential topics.",
    detail:
      "The SEO industry convinced everyone that 3,000-word articles are better than 500-word ones. But Google's goal is to answer questions efficiently—not to reward word count. A focused answer that solves the problem beats a sprawling article that covers everything except what the reader actually needed.",
    category: "Content",
  },
  {
    title: "Trust takes years, but can be destroyed overnight",
    description:
      "Digital reputation is fragile. One aggressive marketing campaign, one misleading claim, one shortcut can undo years of careful work.",
    detail:
      "I've seen professionals who spent decades building offline reputation destroy their digital credibility in weeks by following bad advice. The agency promised quick results. The tactics worked—briefly. Then the algorithm update hit, and everything collapsed. Recovery took two years.",
    category: "Reputation",
  },
];

const Writing = () => {
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
              Thoughts & Notes
            </p>
            <h1 className="mb-8 text-foreground">Writing</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="prose-custom"
          >
            <p className="text-lg md:text-xl">
              Short notes on building digital systems, preserving trust, and avoiding
              common mistakes. These aren't tutorials or step-by-step guides—they're
              observations from working with professionals who care about getting
              things right.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* Articles */}
      <section className="section-sm">
        <div className="container-narrow">
          <div className="space-y-12">
            {writings.map((post, index) => (
              <AnimatedSection
                key={post.title}
                delay={index * 0.1}
                className="group border-l-2 border-border hover:border-primary pl-6 py-4 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2 py-0.5 text-xs font-medium bg-accent text-muted-foreground rounded">
                    {post.category}
                  </span>
                </div>
                <h2 className="mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 font-medium">
                  {post.description}
                </p>
                <p className="text-muted-foreground/80 text-base leading-relaxed">
                  {post.detail}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* Footer Note */}
      <section className="section-sm">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <p className="text-muted-foreground">
              More notes coming as projects progress. Subscribe to updates by{" "}
              <Link to="/contact" className="link-primary">
                getting in touch
              </Link>
              .
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Writing;
