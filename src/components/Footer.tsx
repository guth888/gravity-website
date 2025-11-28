import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";

// Lazy load the mesh animation (same as Hero)
const MeshAnimation = lazy(() => import("./MeshAnimation").then(m => ({
  default: m.MeshAnimation
})));

export const Footer = ({ className }: { className?: string }) => {
  const navigation = {
    publishers: [
      { name: 'How it works', href: '/#how-it-works' },
      { name: 'Pricing', href: '/publishers#pricing' },
      { name: 'Docs', href: '/docs' },
      { name: 'Case studies', href: '/case-studies' },
    ],
    advertisers: [
      { name: 'Formats', href: '/advertisers#formats' },
      { name: 'Inventory', href: '/advertisers#inventory' },
      { name: 'Reporting', href: '/advertisers#reporting' },
      { name: 'FAQ', href: '/#faq' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
  };

  return (
    <footer className={`relative overflow-hidden bg-background ${className || ''}`}>
      {/* Mesh Animation Background - Same as Hero */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 opacity-20">
          <MeshAnimation className="w-full h-full" />
        </div>
      </Suspense>
      
      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-32">
        
        {/* Top Section - Brand */}
        <div className="text-center mb-16 sm:mb-20">
          <Link to="/" className="inline-block mb-4">
            <span className="text-2xl sm:text-3xl font-headline font-bold text-foreground tracking-tight">
              Gravity
            </span>
          </Link>
          <p className="text-sm text-foreground/40 max-w-md mx-auto">
            Where individual value meets aligned incentives.
          </p>
        </div>

        {/* Links Grid - Minimal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 sm:mb-20 max-w-3xl mx-auto text-center">
          {/* For Publishers */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-foreground/30 mb-4">
              Publishers
            </p>
            <ul className="space-y-3">
              {navigation.publishers.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Advertisers */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-foreground/30 mb-4">
              Advertisers
            </p>
            <ul className="space-y-3">
              {navigation.advertisers.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-foreground/30 mb-4">
              Company
            </p>
            <ul className="space-y-3">
              {navigation.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-foreground/30 mb-4">
              Legal
            </p>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-foreground/50 hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center">
          <p className="text-xs text-foreground/30">
            © {new Date().getFullYear()} Gravity AI
          </p>
        </div>
      </div>
    </footer>
  );
};
