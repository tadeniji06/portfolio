import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Icon } from "@iconify/react";

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const particlesRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Use useLayoutEffect to run animations before browser paint
  useLayoutEffect(() => {
    // Set a small timeout to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      createParticles();
      animateElements();
      setIsLoaded(true);
    }, 100);

    // Create particles function
    const createParticles = () => {
      if (!particlesRef.current) return;

      const particlesContainer = particlesRef.current;
      // Clear any existing particles first
      while (particlesContainer.firstChild) {
        particlesContainer.removeChild(particlesContainer.firstChild);
      }

      // Reduce particle count on mobile for better performance
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 25 : 50;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute w-1 h-1 rounded-full";

        // Randomize particle properties
        const size = Math.random() * 3 + 1;
        const color =
          i % 3 === 0 ? "#00f0ff" : i % 3 === 1 ? "#9d00ff" : "#ff00f7";
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 50 + 10;
        const delay = Math.random() * 5;

        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        particle.style.opacity = Math.random() * 0.5 + 0.3;

        // Apply animation
        particle.style.animation = `floatParticle ${duration}s linear infinite`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
      }
    };

    // Animate hero elements function
    const animateElements = () => {
      if (
        !titleRef.current ||
        !subtitleRef.current ||
        !buttonContainerRef.current
      )
        return;

      // Kill any existing animations first
      gsap.killTweensOf([
        titleRef.current,
        subtitleRef.current,
        ".neon-line",
        buttonContainerRef.current.children,
        ".tech-icon",
      ]);

      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          ".neon-line",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1, ease: "power3.inOut" },
          "-=0.4"
        )
        .fromTo(
          buttonContainerRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .fromTo(
          ".tech-icon",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.8"
        );
    };

    // Handle window resize for responsiveness
    const handleResize = () => {
      createParticles(); // Recreate particles on resize
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);

      if (particlesRef.current) {
        while (particlesRef.current.firstChild) {
          particlesRef.current.removeChild(
            particlesRef.current.firstChild
          );
        }
      }

      // Kill all GSAP animations to prevent memory leaks
      gsap.killTweensOf([
        titleRef.current,
        subtitleRef.current,
        ".neon-line",
        buttonContainerRef.current?.children,
        ".tech-icon",
      ]);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className='min-h-screen grid-background flex items-center justify-center relative overflow-hidden px-4 py-6'
    >
      {/* Animated background particles */}
      <div ref={particlesRef} className='absolute inset-0 z-0'></div>

      {/* Glowing grid lines - reduced on mobile */}
      <div className='absolute inset-0 z-0 hidden md:block'>
        <div className='absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-transparent via-neon-blue/30 to-transparent'></div>
        <div className='absolute top-0 left-2/4 w-0.5 h-full bg-gradient-to-b from-transparent via-neon-purple/30 to-transparent'></div>
        <div className='absolute top-0 left-3/4 w-0.5 h-full bg-gradient-to-b from-transparent via-neon-pink/30 to-transparent'></div>
        <div className='absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent'></div>
        <div className='absolute top-2/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent'></div>
        <div className='absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-pink/30 to-transparent'></div>
      </div>

      {/* Simplified grid lines for mobile */}
      <div className='absolute inset-0 z-0 md:hidden'>
        <div className='absolute top-0 left-2/4 w-0.5 h-full bg-gradient-to-b from-transparent via-neon-blue/30 to-transparent'></div>
        <div className='absolute top-2/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent'></div>
      </div>

      {/* Main content */}
      <div
        className={`glass-panel p-5 sm:p-8 md:p-10 w-full max-w-4xl text-center relative z-10 border-t-2 border-neon-blue shadow-lg backdrop-blur-lg transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Decorative corner elements - responsive sizes */}
        <div className='absolute -top-2 -left-2 md:-top-4 md:-left-4 w-8 h-8 md:w-16 md:h-16 border-t-2 border-l-2 border-neon-blue'></div>
        <div className='absolute -top-2 -right-2 md:-top-4 md:-right-4 w-8 h-8 md:w-16 md:h-16 border-t-2 border-r-2 border-neon-purple'></div>
        <div className='absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-8 h-8 md:w-16 md:h-16 border-b-2 border-l-2 border-neon-green'></div>
        <div className='absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-8 h-8 md:w-16 md:h-16 border-b-2 border-r-2 border-neon-pink'></div>

        {/* Animated title with glitch effect - responsive text sizes */}
        <div className='relative'>
          <h1
            ref={titleRef}
            className='text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-neon-blue relative inline-block'
          >
            <span className='text-glitch'>Tunmise's</span>
            <span className='ml-2 md:ml-3 text-white'>Portfolio</span>
            <div className='absolute -top-1 -right-6 md:-right-8 text-xs px-1 py-0.5 md:px-2 md:py-1 bg-neon-blue/20 border border-neon-blue text-neon-blue rounded-sm'>
              v1.0
            </div>
          </h1>
        </div>

        <div className='neon-line my-4 md:my-6'></div>

        {/* Responsive subtitle with typing effect */}
        <p
          ref={subtitleRef}
          className='text-base sm:text-lg md:text-xl text-white/80 mb-4 md:mb-6 overflow-hidden'
        >
          <span className='typing-text block sm:inline-block'>
            Front-End Developer | Web Developer | UI Enthusiast
          </span>
        </p>

        {/* Tech stack icons - responsive spacing */}
        <div className='flex justify-center flex-wrap gap-2 sm:gap-3 md:space-x-4 mb-6 md:mb-8'>
          <div className='tech-icon p-1.5 sm:p-2 bg-space-navy/50 rounded-full'>
            <Icon
              icon='logos:react'
              width='20'
              height='20'
              className='md:w-6 md:h-6'
            />
          </div>
          <div className='tech-icon p-1.5 sm:p-2 bg-space-navy/50 rounded-full'>
            <Icon
              icon='logos:javascript'
              width='20'
              height='20'
              className='md:w-6 md:h-6'
            />
          </div>
          <div className='tech-icon p-1.5 sm:p-2 bg-space-navy/50 rounded-full'>
            <Icon
              icon='logos:tailwindcss-icon'
              width='20'
              height='20'
              className='md:w-6 md:h-6'
            />
          </div>
          <div className='tech-icon p-1.5 sm:p-2 bg-space-navy/50 rounded-full'>
            <Icon
              icon='logos:html-5'
              width='20'
              height='20'
              className='md:w-6 md:h-6'
            />
          </div>
          <div className='tech-icon p-1.5 sm:p-2 bg-space-navy/50 rounded-full'>
            <Icon
              icon='logos:css-3'
              width='20'
              height='20'
              className='md:w-6 md:h-6'
            />
          </div>
        </div>

        {/* Responsive buttons */}
        <div
          ref={buttonContainerRef}
          className='mt-6 md:mt-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 md:space-x-6'
        >
          <a
            href='#projects'
            className='cyber-button group flex items-center justify-center text-sm md:text-base py-2 px-4 md:py-3 md:px-6'
          >
            <Icon
              icon='mdi:rocket-launch'
              className='mr-2 group-hover:animate-bounce text-base md:text-xl'
            />
            <span>Explore Projects</span>
          </a>
          <a
            href='#contact'
            className='cyber-button bg-transparent border-neon-purple text-neon-purple shadow-neon-purple hover:bg-neon-purple hover:text-space-black flex items-center justify-center text-sm md:text-base py-2 px-4 md:py-3 md:px-6'
          >
            <Icon
              icon='mdi:message'
              className='mr-2 text-base md:text-xl'
            />
            <span>Contact Me</span>
          </a>
        </div>

        {/* Scroll indicator - hide on very small screens */}
        <div className='absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block'>
          <div className='flex flex-col items-center'>
            <span className='text-white/60 text-xs md:text-sm mb-1 md:mb-2'>
              Scroll Down
            </span>
            <Icon
              icon='mdi:chevron-down'
              className='text-neon-blue text-xl md:text-2xl'
            />
          </div>
        </div>
      </div>

      {/* Add custom animations with responsive adjustments */}
      <style jsx='true'>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }

        .typing-text {
          border-right: 2px solid #00f0ff;
          white-space: nowrap;
          overflow: hidden;
          animation: typing 4s steps(40) 1s 1 normal both,
            blink-caret 0.75s step-end infinite;
          display: inline-block;
        }

        @media (max-width: 640px) {
          .typing-text {
            white-space: normal;
            border-right: none;
            animation: fadein 2s ease-in-out;
          }

          @keyframes fadein {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink-caret {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: #00f0ff;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
