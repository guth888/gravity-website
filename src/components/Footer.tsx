import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = ({ className }: { className?: string }) => {
  const navigation = {
    publishers: [
      { name: 'How it works', href: '/#how-it-works' },
      { name: 'Pricing', href: '/publishers#pricing' },
      { name: 'Documentation', href: '/docs' },
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

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/gravityai' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/gravity-ai' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/gravity-ai' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@gravity.ai' },
  ];

  return (
    <footer className={`relative bg-background border-t border-border/30 ${className || ''}`}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-primary/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-accent/[0.02] rounded-full blur-[100px]" />
      </div>
      
      <div className="max-w-[1280px] xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12 mb-12 md:mb-16">
          
          {/* Brand Section */}
          <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-2xl font-headline font-bold tracking-tight text-foreground">
                GRAVITY
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              Where individual value meets aligned incentives.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* For Publishers */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              For Publishers
            </h4>
            <ul className="space-y-3">
              {navigation.publishers.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Advertisers */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              For Advertisers
            </h4>
            <ul className="space-y-3">
              {navigation.advertisers.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="space-y-3">
              {navigation.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SDKs */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground">
              SDKs
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.npmjs.com/package/@iris-technologies/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2"
                >
                  TypeScript SDK
                  <span className="px-1.5 py-0.5 text-[10px] rounded bg-accent/20 text-accent font-medium">
                    Available
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/@iris-technologies/react"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2"
                >
                  React SDK
                  <span className="px-1.5 py-0.5 text-[10px] rounded bg-accent/20 text-accent font-medium">
                    Available
                  </span>
                </a>
              </li>
              <li>
                <span className="text-sm text-muted-foreground/60 flex items-center gap-2">
                  Python SDK
                  <span className="px-1.5 py-0.5 text-[10px] rounded bg-muted text-muted-foreground font-medium">
                    Soon
                  </span>
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground/60 flex items-center gap-2">
                  iOS / Android
                  <span className="px-1.5 py-0.5 text-[10px] rounded bg-muted text-muted-foreground font-medium">
                    Soon
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Gravity AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
