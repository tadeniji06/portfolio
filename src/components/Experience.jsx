import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

gsap.registerPlugin(ScrollTrigger);

const ExperienceCard = ({
  company,
  position,
  period,
  description,
  index,
}) => {
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef} className='relative'>
      {/* Timeline dot */}
      <div className='absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-neon-purple z-10'></div>

      {/* Card */}
      <div
        className={`glass-panel p-6 ml-8 md:ml-0 md:w-5/12 ${
          index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
        }`}
      >
        <h3 className='text-xl font-bold text-neon-blue'>{position}</h3>
        <h4 className='text-lg font-semibold mb-2 text-neon-purple'>
          {company}
        </h4>
        <div className='flex items-center mb-4 text-white/70'>
          <Icon icon='mdi:calendar' className='mr-2' />
          <span>{period}</span>
        </div>
        <p className='text-white/80 whitespace-pre-line'>{description}</p>
      </div>
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      company: "B360 Solutions",
      position: "Lead Front-End Developer",
      period: "February 2025 - Present",
      description: `Spearheading the front-end architecture of scalable business automation platforms tailored to African markets.
- Designing dynamic, responsive interfaces using React and modern JS tooling.
- Translating complex requirements into seamless user journeys.
- Coordinating cross-functional collaboration between UI/UX, backend, and product teams to deliver fast, intuitive applications.`,
    },
    {
      company: "Diakrino",
      position: "Full-Stack & Web3 Developer",
      period: "October 2023 - March 2025",
      description: `Built high-performance Web2 and Web3 applications from the ground up.
- Engineered NFT minting platforms and custom smart contract integrations.
- Co-led development of a decentralized social media network using full-stack tools.
- Delivered responsive, secure, and user-friendly apps in agile sprints—balancing innovation with stability.`,
    },
  ];

  return (
    <section id='experience' ref={sectionRef} className='py-20 relative'>
      <div className='absolute inset-0 bg-cyber-grid bg-grid-lg opacity-10'></div>
      <div className='container mx-auto px-4'>
        <h2
          ref={titleRef}
          className='text-4xl font-bold mb-12 text-center neon-text'
        >
          Work Experience
        </h2>

        {/* Timeline */}
        <div className='relative'>
          {/* Timeline line */}
          <div className='absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-neon-purple/50 transform md:-translate-x-1/2'></div>

          {/* Experience cards */}
          <div className='space-y-16 md:space-y-24'>
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                company={exp.company}
                position={exp.position}
                period={exp.period}
                description={exp.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
