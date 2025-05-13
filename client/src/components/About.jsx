import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const image = imageRef.current;

    gsap.fromTo(
      text,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      image,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-grid-lg opacity-20"></div>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center neon-text">About Me</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div ref={textRef} className="md:w-1/2 glass-panel p-8">
            <h3 className="text-2xl font-bold mb-4 text-neon-purple">Tunmise</h3>
            <p className="mb-4 text-white/80">
              I'm a self-taught software junkie with a passion for front-end & web development. Based in Nigeria, 
              I've been crafting digital experiences that blend creativity with technical precision.
            </p>
            <p className="mb-6 text-white/80">
              My journey in tech has been driven by curiosity and a relentless pursuit of knowledge. 
            </p>
            
            <div className="flex space-x-4">
              <a href="#contact" className="cyber-button">Get In Touch</a>
              <a href="#projects" className="cyber-button bg-transparent border-neon-green text-neon-green shadow-neon-green hover:bg-neon-green">
                View Work
              </a>
            </div>
          </div>
          
          <div ref={imageRef} className="md:w-2/5">
            <div className="relative">
              {/* Placeholder for profile image - replace with your actual image */}
              <div className="w-full aspect-square bg-space-navy rounded-lg overflow-hidden neon-border relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon icon="mdi:account-circle" className="text-neon-blue w-full h-full" />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-neon-purple rounded-tr-lg"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-neon-green rounded-bl-lg"></div>
              </div>
              
              {/* Tech icons floating around */}
              <div className="absolute -top-6 -left-6 glass-panel p-3 animate-float">
                <Icon icon="logos:react" width="24" height="24" />
              </div>
              <div className="absolute top-1/4 -right-8 glass-panel p-3 animate-float" style={{ animationDelay: '1s' }}>
                <Icon icon="logos:javascript" width="24" height="24" />
              </div>
              <div className="absolute -bottom-6 left-1/4 glass-panel p-3 animate-float" style={{ animationDelay: '2s' }}>
                <Icon icon="logos:tailwindcss-icon" width="24" height="24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
