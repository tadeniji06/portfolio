import { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Icon } from "@iconify/react";

const Blogs = () => {
  useEffect(() => {
    // Animation for the coming soon elements
    gsap.fromTo(
      ".coming-soon-container > *",
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.2, 
        duration: 0.8,
        ease: "power2.out" 
      }
    );
    
    // Pulse animation for the notification icon
    gsap.to(".notification-icon", {
      scale: 1.2,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div className="min-h-screen bg-space-black flex items-center justify-center px-4">
      <div className="coming-soon-container glass-panel p-10 max-w-2xl w-full text-center">
        <Icon 
          icon="mdi:rocket-launch" 
          className="text-neon-blue text-6xl mx-auto mb-6 notification-icon"
        />
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 neon-text">Blog Coming Soon</h1>
        
        <div className="w-24 h-1 bg-neon-purple mx-auto mb-6"></div>
        
        <p className="text-lg mb-8 text-white/80">
          I'm currently crafting amazing content for this space. 
          The blog section will be launched very soon with insights on web development, 
          tech trends, and my journey as a developer.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <div className="flex items-center">
            <Icon icon="mdi:clock-outline" className="text-neon-green mr-2" />
            <span>Estimated Launch: Soon™</span>
          </div>
          
          <div className="flex items-center">
            <Icon icon="mdi:bell-ring-outline" className="text-neon-yellow mr-2" />
            <span>Stay tuned for updates!</span>
          </div>
        </div>
        
        <Link 
          to="/" 
          className="cyber-button inline-flex items-center"
        >
          <Icon icon="mdi:arrow-left" className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
