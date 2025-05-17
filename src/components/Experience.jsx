import { useEffect, useRef } from "react";
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

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      }
    );
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
        <p className='text-white/80'>{description}</p>
      </div>
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const experiences = [
    {
      company: "B360 Solutions",
      position: "Lead Front-End & WordPress Developer",
      period: "February 2025 - Present",
      description:
        "Leading front-end development initiatives for business automation web applications. Building and customizing client websites using WordPress and React depending on project requirements. Creating responsive and interactive user interfaces using modern JavaScript frameworks. Collaborating with design and back-end teams to deliver seamless user experiences across multiple platforms.",
    },

    {
      company: "Diakrino",
      position: "Full-Stack & Web3 Developer",
      period: "October 2023 - March 2025",
      description:
        "Developed and maintained client-facing web applications across both Web2 and Web3 ecosystems. Led development of NFT projects and blockchain node implementations. Part of the team that built a full-stack social media platform from concept to deployment. Implemented responsive designs, optimized web performance, and collaborated with cross-functional teams to meet project requirements and deadlines.",
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
          <div className='space-y-12'>
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
