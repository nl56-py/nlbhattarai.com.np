import Layout from "@/components/Layout";

const Contact = () => {
  return (
    <Layout>
      <section className="section">
        <div className="container-narrow">
          <h1 className="mb-8">Contact</h1>
          
          <div className="prose-custom">
            <p className="text-lg md:text-xl">
              If you care about building a digital presence the right way, 
              you can reach out.
            </p>
          </div>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      <section className="section-sm">
        <div className="container-narrow prose-custom">
          <p>
            The best way to start is with a brief email explaining your situation 
            and what you're looking to achieve.
          </p>
          <p className="mt-6">
            <a 
              href="mailto:hello@nlbhattarai.com" 
              className="link-subtle text-lg font-serif"
            >
              hello@nlbhattarai.com
            </a>
          </p>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      <section className="section-sm">
        <div className="container-narrow">
          <p className="text-muted-foreground">
            I work selectively and respond when there's a good fit.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
