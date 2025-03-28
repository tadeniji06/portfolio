import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../components/NavBar";
import HeroSection from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for navbar height
            behavior: "smooth",
          });
        }
      });
    });

    // Initialize a cool cursor effect
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    const cursorDot = document.createElement("div");
    cursorDot.className = "cursor-dot";
    document.body.appendChild(cursorDot);

    document.addEventListener("mousemove", (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    });

    // Clean up
    return () => {
      document.removeEventListener("mousemove", () => {});
      if (cursor && cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
      if (cursorDot && cursorDot.parentNode) {
        cursorDot.parentNode.removeChild(cursorDot);
      }
    };
  }, []);

  return (
    <div className='relative'>
      <Navbar />
      <HeroSection />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />

      {/* Add custom cursor styles */}
      <style jsx='true'>{`
        .custom-cursor {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 2px solid rgba(0, 240, 255, 0.5);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9999;
          transition: width 0.3s, height 0.3s, border-color 0.3s;
        }

        .cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background-color: #00f0ff;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 10000;
        }

        a:hover ~ .custom-cursor,
        button:hover ~ .custom-cursor {
          width: 60px;
          height: 60px;
          border-color: rgba(157, 0, 255, 0.7);
        }
      `}</style>
    </div>
  );
};

export default Home;
