import Layout from "@/components/Layout";

const writings = [
  {
    title: "Why most website redesigns fail",
    description: "Redesigns often focus on aesthetics while ignoring the systems that made the original work. Before changing anything, understand what you're preserving.",
  },
  {
    title: "SEO is a preservation problem",
    description: "The hard part isn't ranking—it's maintaining rankings over years without compromising on quality or resorting to shortcuts.",
  },
  {
    title: "Medical websites should be boring",
    description: "In healthcare, trust comes from clarity and restraint. The most effective medical websites explain rather than impress.",
  },
];

const Writing = () => {
  return (
    <Layout>
      <section className="section">
        <div className="container-narrow">
          <h1 className="mb-8">Writing</h1>
          
          <div className="prose-custom">
            <p className="text-lg md:text-xl">
              Short notes on building digital systems, preserving trust, 
              and avoiding common mistakes.
            </p>
          </div>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      <section className="section-sm">
        <div className="container-narrow">
          <div className="space-y-12">
            {writings.map((post, index) => (
              <article key={index} className="group">
                <h2 className="mb-3">{post.title}</h2>
                <p className="text-muted-foreground">{post.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      <section className="section-sm">
        <div className="container-narrow">
          <p className="text-muted-foreground text-sm">
            More notes coming soon.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Writing;
