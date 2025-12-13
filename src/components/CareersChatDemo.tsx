import { useState, useEffect } from 'react';

const CareersChatDemo = () => {
  // Full message strings
  const userMessage = "Hey, where is the best place to work right now?";
  const aiMessage = "If you're into solving problems that don't have playbooks yet, Gravity is hiring.";

  // Animation state
  const [userText, setUserText] = useState('');
  const [userBubbleOpacity, setUserBubbleOpacity] = useState(0);
  const [showAiSection, setShowAiSection] = useState(false);
  const [aiBubbleOpacity, setAiBubbleOpacity] = useState(0);
  const [aiText, setAiText] = useState('');
  const [showLink, setShowLink] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);

  useEffect(() => {
    // Start animation sequence on mount
    let timeouts: NodeJS.Timeout[] = [];

    // Phase 1: Fade in user bubble and start typing
    const startDelay = setTimeout(() => {
      // Start fading in the user bubble
      setUserBubbleOpacity(0.3);
      setUserTyping(true);

      // Type user message character by character
      userMessage.split('').forEach((_, index) => {
        const charTimeout = setTimeout(() => {
          setUserText(userMessage.slice(0, index + 1));
          // Gradually increase opacity as typing progresses
          setUserBubbleOpacity(0.3 + (0.7 * (index + 1) / userMessage.length));
          
          // When user message is complete
          if (index === userMessage.length - 1) {
            setUserTyping(false);
            setUserBubbleOpacity(1);
            
            // Phase 2: Pause, then show AI response
            const pauseTimeout = setTimeout(() => {
              setShowAiSection(true);
              setAiBubbleOpacity(0.3);
              setAiTyping(true);

              // Type AI message character by character
              aiMessage.split('').forEach((_, aiIndex) => {
                const aiCharTimeout = setTimeout(() => {
                  setAiText(aiMessage.slice(0, aiIndex + 1));
                  // Gradually increase opacity as typing progresses
                  setAiBubbleOpacity(0.3 + (0.7 * (aiIndex + 1) / aiMessage.length));
                  
                  // When AI message is complete
                  if (aiIndex === aiMessage.length - 1) {
                    setAiTyping(false);
                    setAiBubbleOpacity(1);
                    
                    // Phase 3: Show link
                    const linkTimeout = setTimeout(() => {
                      setShowLink(true);
                    }, 200);
                    timeouts.push(linkTimeout);
                  }
                }, aiIndex * 30); // 30ms per character for AI
                timeouts.push(aiCharTimeout);
              });
            }, 400); // 400ms pause after user message
            timeouts.push(pauseTimeout);
          }
        }, index * 50); // 50ms per character for user
        timeouts.push(charTimeout);
      });
    }, 300); // Initial delay before animation starts
    timeouts.push(startDelay);

    // Cleanup
    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, []);

  const handleScrollToRoles = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const rolesSection = document.getElementById('open-roles');
    if (rolesSection) {
      rolesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 p-6 sm:p-8 w-full max-w-[520px]">
      {/* User message - RIGHT side */}
      <div className="flex justify-end">
        <div 
          className="bg-gray-900 text-white rounded-2xl rounded-br-md px-5 py-3 text-base sm:text-lg max-w-[85%] relative transition-opacity duration-150"
          style={{ opacity: userBubbleOpacity }}
        >
          {/* Invisible full text to maintain fixed size */}
          <span className="invisible">{userMessage}</span>
          {/* Visible typing text positioned absolutely */}
          <span className="absolute inset-0 px-5 py-3">
            {userText}
            {userTyping && (
              <span className="inline-block w-[2px] h-[1.1em] bg-white ml-[2px] align-middle animate-blink" />
            )}
          </span>
        </div>
      </div>

      {/* Sponsored response - LEFT side */}
      <div 
        className={`mt-5 transition-opacity duration-300 ${showAiSection ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className="text-[11px] text-gray-400 mb-2 uppercase tracking-wide">Sponsored</p>
        <div className="flex justify-start">
          <div 
            className="bg-gray-100 rounded-2xl rounded-bl-md px-5 py-4 max-w-[90%] relative transition-opacity duration-150"
            style={{ opacity: aiBubbleOpacity }}
          >
            {/* Invisible full text to maintain fixed size */}
            <p className="text-gray-900 text-base sm:text-lg leading-relaxed invisible">
              {aiMessage}
            </p>
            {/* Visible typing text positioned absolutely */}
            <p className="text-gray-900 text-base sm:text-lg leading-relaxed absolute top-4 left-5 right-5">
              {aiText}
              {aiTyping && (
                <span className="inline-block w-[2px] h-[1.1em] bg-gray-900 ml-[2px] align-middle animate-blink" />
              )}
            </p>
            <a
              href="#open-roles"
              onClick={handleScrollToRoles}
              className={`text-blue-600 hover:text-blue-700 hover:underline font-medium text-base sm:text-lg mt-2 inline-block transition-opacity duration-300 ${showLink ? 'opacity-100' : 'opacity-0'}`}
            >
              View open roles
            </a>
          </div>
        </div>
      </div>

      {/* Blinking cursor animation */}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default CareersChatDemo;
