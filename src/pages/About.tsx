import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <section className="section">
        <div className="container-narrow">
          <h1 className="mb-8">About</h1>
          
          <div className="prose-custom">
            <p className="text-lg md:text-xl">
              I work with professionals who already have real-world credibility 
              but lack a digital presence that reflects it.
            </p>
          </div>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      <section className="section-sm">
        <div className="container-narrow prose-custom">
          <h2 className="mb-6">Background</h2>
          <p>
            N.L. Bhattarai builds websites and digital systems for professionals 
            who need their online presence to match their real-world reputation.
          </p>
          <p>
            The focus is on doctors, clinics, hospitals, and senior experts who 
            require an education-first, SEO-safe approach. The preference is always 
            for long-term authority over quick wins.
          </p>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      <section className="section-sm">
        <div className="container-narrow prose-custom">
          <h2 className="mb-6">Why healthcare & experts</h2>
          <p>
            Medical and expert websites require restraint. In healthcare, trust matters 
            more than marketing. Search engines reward clarity and consistency—especially 
            in fields where accuracy and credibility are non-negotiable.
          </p>
          <p>
            This is not an industry for shortcuts or trends. It demands patience, 
            precision, and respect for the expertise being represented.
          </p>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      <section className="section-sm">
        <div className="container-narrow prose-custom">
          <h2 className="mb-6">Working philosophy</h2>
          <ul>
            <li>I don't promise instant results</li>
            <li>I avoid shortcuts and hacks</li>
            <li>I design decisions before interfaces</li>
            <li>I preserve what already works</li>
          </ul>
          <p className="mt-8 text-foreground font-serif text-xl">
            This approach isn't fast—but it lasts.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default About;
