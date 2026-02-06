import { Link, useLocation } from "react-router-dom";

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
      <header className="border-b border-border">
        <nav className="container-wide py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link 
            to="/" 
            className="font-serif text-xl tracking-tight text-foreground hover:text-muted-foreground transition-colors"
          >
            N.L. Bhattarai
          </Link>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`transition-colors ${
                    location.pathname === item.path
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border">
        <div className="container-wide py-8 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} N.L. Bhattarai</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
