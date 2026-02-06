import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const CaseStudyDrParash = () => {
  return (
    <Layout>
      <section className="section">
        <div className="container-narrow">
          <p className="text-sm text-muted-foreground mb-4">
            <Link to="/case-studies" className="hover:text-foreground transition-colors">
              ← Case Studies
            </Link>
          </p>
          <h1 className="mb-4">
            From Zero Digital Presence to Top Google Rankings
          </h1>
          <p className="text-lg text-muted-foreground">
            Dr. Parash Mani Shrestha — Senior Urologist, Nepal
          </p>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      <section className="section-sm">
        <div className="container-narrow prose-custom">
          <h2 className="mb-6">The situation</h2>
          <p>
            Dr. Parash Mani Shrestha is a senior urologist with over three decades 
            of clinical experience in Nepal. Despite a strong offline reputation 
            among peers and patients, he had no digital presence—no website, no 
            search visibility, no way for new patients to find or verify his expertise online.
          </p>
          <p>
            In healthcare, this gap matters. Patients increasingly research doctors 
            before booking appointments. Without a credible online presence, even 
            highly qualified professionals lose opportunities to those with better 
            digital visibility.
          </p>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      <section className="section-sm">
        <div className="container-narrow prose-custom">
          <h2 className="mb-6">The approach</h2>
          <p>
            The goal was not to market aggressively but to accurately represent 
            Dr. Shrestha's expertise in a format that search engines and patients 
            could trust.
          </p>
          <ul className="mt-6">
            <li>
              <strong>Foundation first:</strong> Built a clean, fast-loading website 
              with proper technical structure—semantic HTML, clear hierarchy, 
              mobile-responsive design
            </li>
            <li>
              <strong>Content based on reality:</strong> Every page focused on actual 
              expertise and services, written in clear language patients could understand
            </li>
            <li>
              <strong>SEO through clarity:</strong> No tricks or keyword stuffing. 
              Optimized for how people actually search for urological care in Nepal
            </li>
            <li>
              <strong>Trust signals:</strong> Credentials, experience, and hospital 
              affiliations presented plainly and accurately
            </li>
          </ul>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      <section className="section-sm">
        <div className="container-narrow prose-custom">
          <h2 className="mb-6">The outcome</h2>
          <p>
            Within months, Dr. Shrestha's website began ranking for relevant search 
            terms. The site now appears in top positions for searches related to 
            urology services in Nepal.
          </p>
          <ul className="mt-6">
            <li>First page rankings for targeted medical search terms</li>
            <li>Consistent organic traffic from patients seeking urological care</li>
            <li>A digital presence that accurately reflects decades of expertise</li>
            <li>No ongoing dependence on paid advertising</li>
          </ul>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      <section className="section-sm">
        <div className="container-narrow prose-custom">
          <h2 className="mb-6">What this demonstrates</h2>
          <p>
            This project shows that sustainable search visibility comes from 
            representing real expertise accurately—not from aggressive marketing 
            or technical manipulation.
          </p>
          <p>
            For senior professionals, especially in healthcare, the digital strategy 
            should be an extension of the same principles that built their offline 
            reputation: competence, clarity, and consistency over time.
          </p>
        </div>
      </section>

      <div className="container-narrow">
        <hr className="divider" />
      </div>

      <section className="section-sm">
        <div className="container-narrow">
          <p className="text-muted-foreground">
            Interested in a similar approach for your practice?{" "}
            <Link to="/contact" className="link-subtle">Get in touch</Link>.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudyDrParash;
