import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section">
        <div className="container-narrow">
          <h1 className="mb-6">
            I build SEO-safe websites that turn real expertise into digital authority.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            I help doctors, clinics, hospitals, and senior professionals build calm, 
            credible digital systems—without breaking trust or chasing trends.
          </p>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* Philosophy Section */}
      <section className="section-sm">
        <div className="container-narrow">
          <div className="space-y-10">
            <div>
              <h3 className="mb-3">Clarity over noise</h3>
              <p className="text-muted-foreground">
                Digital presence should explain, not impress.
              </p>
            </div>
            <div>
              <h3 className="mb-3">Systems over tactics</h3>
              <p className="text-muted-foreground">
                Long-term results come from structure, not shortcuts.
              </p>
            </div>
            <div>
              <h3 className="mb-3">Preservation before growth</h3>
              <p className="text-muted-foreground">
                If something already works, don't break it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* Proof Section */}
      <section className="section-sm">
        <div className="container-narrow prose-custom">
          <h2 className="mb-6">Proof of approach</h2>
          <p>
            The best way to understand my approach is to look at real work. 
            Below is a documented case study of helping a senior medical professional 
            go from zero digital presence to top Google rankings.
          </p>
          <p className="mt-6">
            <Link to="/case-studies/dr-parash-mani-shrestha" className="link-subtle">
              Read the case study →
            </Link>
          </p>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* Who This Is For */}
      <section className="section-sm">
        <div className="container-narrow prose-custom">
          <h2 className="mb-6">Who this is for</h2>
          <ul>
            <li>Doctors and medical specialists</li>
            <li>Clinics and hospitals</li>
            <li>Senior consultants and experts</li>
            <li>Professionals with strong offline reputation but weak digital presence</li>
          </ul>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      {/* Footer CTA */}
      <section className="section-sm">
        <div className="container-narrow">
          <p className="text-muted-foreground">
            If this way of working resonates, feel free to{" "}
            <Link to="/case-studies" className="link-subtle">explore the case study</Link>
            {" "}or{" "}
            <Link to="/contact" className="link-subtle">get in touch</Link>.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
