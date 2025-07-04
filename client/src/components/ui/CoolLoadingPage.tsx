import React, { useState, useEffect } from 'react';

const CoolLoadingPage = () => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('initializing');
  const [showDots, setShowDots] = useState(0);

  useEffect(() => {
    const stages = [
      { name: 'initializing', duration: 100 },
      { name: 'connecting', duration: 80 },
      { name: 'loading', duration: 120 }
    ];

    let totalTime = 0;
    let currentStage = 0;

    const progressInterval = setInterval(() => {
      totalTime += 20;
      const stageProgress = Math.min((totalTime / 300) * 100, 100);
      setProgress(stageProgress);

      // Update stage
      if (totalTime >= 100 && currentStage === 0) {
        setStage('connecting');
        currentStage = 1;
      } else if (totalTime >= 180 && currentStage === 1) {
        setStage('loading');
        currentStage = 2;
      } else if (totalTime >= 300) {
        setStage('complete');
        clearInterval(progressInterval);
      }
    }, 20);

    // Animated dots
    const dotsInterval = setInterval(() => {
      setShowDots(prev => (prev + 1) % 4);
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  const getStageText = () => {
    const dots = '.'.repeat(showDots);
    switch (stage) {
      case 'initializing':
        return `Initializing system${dots}`;
      case 'connecting':
        return `Connecting to server${dots}`;
      case 'loading':
        return `Loading user data${dots}`;
      case 'complete':
        return 'Complete!';
      default:
        return 'Loading...';
    }
  };

  return (
    <div className="loading-container">
      <div className="loading-content">
        {/* Animated Logo/Icon */}
        <div className="logo-container">
          <div className="logo-circle">
            <div className="logo-inner">
              <div className="logo-pulse"></div>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path 
                  d="M20 6L30 16L20 26L10 16L20 6Z" 
                  fill="currentColor"
                  className="logo-diamond"
                />
              </svg>
            </div>
          </div>
          <div className="orbit-ring">
            <div className="orbit-dot orbit-dot-1"></div>
            <div className="orbit-dot orbit-dot-2"></div>
            <div className="orbit-dot orbit-dot-3"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="loading-text">
          <h2>{getStageText()}</h2>
          <p>Please wait while we prepare your experience</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
            <div className="progress-glow"></div>
          </div>
          <div className="progress-text">{Math.round(progress)}%</div>
        </div>

        {/* Particle Animation */}
        <div className="particles">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <style>{`
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0078D4 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          overflow: hidden;
        }

        .loading-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          animation: backgroundShimmer 4s ease-in-out infinite;
        }

        @keyframes backgroundShimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .loading-content {
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .logo-container {
          position: relative;
          display: inline-block;
          margin-bottom: 40px;
        }

        .logo-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .logo-inner {
          position: relative;
          color: white;
          animation: logoFloat 3s ease-in-out infinite;
        }

        .logo-pulse {
          position: absolute;
          top: -10px;
          left: -10px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
          animation: pulse 2s ease-in-out infinite;
        }

        .logo-diamond {
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
          animation: diamondSpin 4s linear infinite;
        }

        .orbit-ring {
          position: absolute;
          width: 160px;
          height: 160px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: ringRotate 8s linear infinite;
        }

        .orbit-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }

        .orbit-dot-1 {
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          animation: orbitDot1 2s ease-in-out infinite;
        }

        .orbit-dot-2 {
          top: 50%;
          right: -4px;
          transform: translateY(-50%);
          animation: orbitDot2 2s ease-in-out infinite 0.6s;
        }

        .orbit-dot-3 {
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          animation: orbitDot3 2s ease-in-out infinite 1.2s;
        }

        .loading-text {
          margin-bottom: 40px;
        }

        .loading-text h2 {
          color: white;
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 10px 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .loading-text p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 16px;
          margin: 0;
          font-weight: 300;
        }

        .progress-container {
          position: relative;
          width: 300px;
          margin: 0 auto;
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
          backdrop-filter: blur(10px);
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00f5ff, #0099ff, #00f5ff);
          background-size: 200% 100%;
          border-radius: 3px;
          transition: width 0.3s ease;
          animation: progressGlow 2s ease-in-out infinite;
          position: relative;
        }

        .progress-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: progressShimmer 1.5s ease-in-out infinite;
        }

        .progress-text {
          color: white;
          font-size: 14px;
          font-weight: 500;
          margin-top: 12px;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: particleFloat 3s ease-in-out infinite;
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }

        @keyframes diamondSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes ringRotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes orbitDot1 {
          0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.5; transform: translateX(-50%) scale(1.5); }
        }

        @keyframes orbitDot2 {
          0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
          50% { opacity: 0.5; transform: translateY(-50%) scale(1.5); }
        }

        @keyframes orbitDot3 {
          0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.5; transform: translateX(-50%) scale(1.5); }
        }

        @keyframes progressGlow {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
        }

        @keyframes progressShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes particleFloat {
          0% { 
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% { 
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CoolLoadingPage;