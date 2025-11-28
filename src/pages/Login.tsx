import { Link } from "react-router-dom";
import gravityLogo from '@/assets/gravity-logo.png';

export const Login = () => {
  return (
    <div className="min-h-screen bg-[#f4f4f5] flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <Link to="/" className="mb-16">
        <img 
          src={gravityLogo} 
          alt="Gravity" 
          className="h-20 sm:h-24 opacity-90 hover:opacity-100 transition-opacity"
        />
      </Link>

      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-black/80 mb-3 text-center">
        Welcome back
      </h1>
      <p className="text-sm text-black/40 mb-12 text-center">
        Choose your portal to sign in
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <a 
          href="https://app.trygravity.ai/publisher/login"
          className="
            flex items-center justify-center px-8 py-4 rounded-full
            bg-black text-white font-medium text-sm
            transition-all duration-300
            hover:bg-black/90 hover:shadow-[0_0_30px_rgba(0,0,0,0.15)]
            hover:scale-[1.02]
          "
        >
          Publishers
        </a>

        <a 
          href="https://app.trygravity.ai/advertiser/login"
          className="
            flex items-center justify-center px-8 py-4 rounded-full
            bg-white text-black font-medium text-sm
            border border-black/10
            transition-all duration-300
            hover:border-black/20 hover:shadow-[0_0_30px_rgba(0,0,0,0.08)]
            hover:scale-[1.02]
          "
        >
          Advertisers
        </a>
      </div>

      {/* Back link */}
      <Link 
        to="/" 
        className="mt-16 text-xs text-black/30 hover:text-black/50 transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  );
};

