import { Link, LinkProps } from 'react-router-dom';
import { useRef } from 'react';

interface PrefetchLinkProps extends LinkProps {
  children: React.ReactNode;
}

export const PrefetchLink = ({ children, to, ...props }: PrefetchLinkProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const prefetched = useRef(false);

  const handleMouseEnter = () => {
    if (!prefetched.current && typeof to === 'string') {
      prefetched.current = true;
      // Trigger route prefetch
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = to;
      document.head.appendChild(link);
    }
  };

  return (
    <Link
      ref={linkRef}
      to={to}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </Link>
  );
};
