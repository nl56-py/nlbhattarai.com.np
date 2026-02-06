import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/case-studies", label: "Case Studies" },
  { path: "/writing", label: "Writing" },
  { path: "/contact", label: "Contact" },
];

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50"
      >
        <nav className="container-wide py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            to="/"
            className="font-serif text-2xl tracking-tight text-foreground hover:text-primary transition-colors duration-300"
          >
            N.L. Bhattarai
          </Link>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`relative py-2 transition-colors duration-300 ${
                    location.pathname === item.path
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/50 bg-card/50">
        <div className="container-wide py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-serif text-lg text-foreground mb-1">N.L. Bhattarai</p>
              <p className="text-sm text-muted-foreground">
                Building digital authority for professionals who deserve it.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <a
                href="mailto:hello@nlbhattarai.com"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                hello@nlbhattarai.com
              </a>
              <p className="text-xs text-muted-foreground/60">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
