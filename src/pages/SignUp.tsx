import { Link } from "react-router-dom";

export const SignUp = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Content */}
      <div className="flex flex-col items-center">
        {/* Logo */}
        <Link to="/" className="mb-3">
          <div className="text-5xl sm:text-6xl font-headline font-bold text-[#0a0a0a] tracking-tight">
            Gravity
          </div>
        </Link>

        {/* Tagline */}
        <p className="text-[#0a0a0a]/40 text-sm tracking-wide mb-12">
          The native ad exchange for AI
        </p>

        {/* Sign up label */}
        <p className="text-[#0a0a0a]/50 text-xs uppercase tracking-[0.2em] mb-6">
          Sign up
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a 
            href="https://app.trygravity.ai/publisher/signup"
            className="
              flex items-center justify-center px-10 py-4 rounded-xl
              bg-[#0a0a0a] text-white font-medium text-sm
              transition-all duration-300
              hover:bg-[#0a0a0a]/90 hover:scale-[1.02]
              min-w-[180px]
            "
          >
            Publishers
          </a>

          <a 
            href="https://app.trygravity.ai/advertiser/signup"
            className="
              flex items-center justify-center px-10 py-4 rounded-xl
              bg-transparent text-[#0a0a0a] font-medium text-sm
              border border-[#0a0a0a]/20
              transition-all duration-300
              hover:bg-[#0a0a0a]/5 hover:border-[#0a0a0a]/40 hover:scale-[1.02]
              min-w-[180px]
            "
          >
            Advertisers
          </a>
        </div>

        {/* Bottom link */}
        <div className="mt-16 text-center">
          <p className="text-[#0a0a0a]/30 text-xs mb-3">Already have an account?</p>
          <Link 
            to="/login"
            className="text-[#0a0a0a]/50 text-sm hover:text-[#0a0a0a] transition-colors inline-flex items-center gap-2 group"
          >
            Log in
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

