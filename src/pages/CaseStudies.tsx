import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const CaseStudies = () => {
  return (
    <Layout>
      <section className="section">
        <div className="container-narrow">
          <h1 className="mb-8">Case Studies</h1>
          
          <div className="prose-custom">
            <p className="text-lg md:text-xl">
              These projects focus on building long-term digital authority, 
              not short-term visibility.
            </p>
          </div>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      <section className="section-sm">
        <div className="container-narrow">
          <article className="group">
            <Link to="/case-studies/dr-parash-mani-shrestha" className="block">
              <h2 className="mb-3 group-hover:text-muted-foreground transition-colors">
                From Zero Digital Presence to Top Google Rankings
              </h2>
              <p className="text-muted-foreground mb-4">
                Senior Urologist, Nepal
              </p>
              <p className="text-muted-foreground">
                A documented case study of building sustainable digital authority 
                for a senior medical professional with over 30 years of clinical experience.
              </p>
              <span className="inline-block mt-4 text-sm link-subtle">
                Read full case study →
              </span>
            </Link>
          </article>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudies;
