import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';

gsap.registerPlugin(ScrollTrigger);

const SkillCard = ({ icon, name, level, color, delay }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: delay * 0.1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
        },
      }
    );
  }, [delay]);

  // Map color names to actual CSS color values
  const colorMap = {
    'neon-blue': '#00BFFF',
    'neon-purple': '#9D00FF',
    'neon-yellow': '#FFFF00',
    'neon-green': '#39FF14',
    'neon-pink': '#FF6EC7',
  };

  const borderColor = colorMap[color] || '#00BFFF';
  const textColor = colorMap[color] || '#00BFFF';
  const bgColor = colorMap[color] || '#00BFFF';

  return (
    <div
      ref={cardRef}
      className="glass-panel p-6 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2"
      style={{ borderTop: `2px solid ${borderColor}` }}
    >
      <Icon icon={icon} style={{ color: textColor }} className="text-4xl mb-4" />
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <div className="w-full bg-space-black/50 h-2 rounded-full mt-2">
        <div
          className="h-full rounded-full"
          style={{ width: `${level}%`, backgroundColor: bgColor }}
        ></div>
      </div>
      <span className="mt-2 text-sm text-white/70">{level}%</span>
    </div>
  );
};

const Skills = () => {
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
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const skills = [
    { icon: 'logos:html-5', name: 'HTML', level: 95, color: 'neon-blue' },
    { icon: 'logos:css-3', name: 'CSS', level: 90, color: 'neon-purple' },
    { icon: 'logos:javascript', name: 'JavaScript', level: 75, color: 'neon-yellow' },
    { icon: 'logos:react', name: 'React', level: 70, color: 'neon-blue' },
    { icon: 'logos:tailwindcss-icon', name: 'Tailwind CSS', level: 80, color: 'neon-green' },
    { icon: 'logos:typescript-icon', name: 'TypeScript', level: 55, color: 'neon-blue' },
    { icon: 'logos:git-icon', name: 'Git', level: 85, color: 'neon-pink' },
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-space-navy/30">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="text-4xl font-bold mb-12 text-center neon-text">Technical Skills</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillCard 
              key={skill.name}
              icon={skill.icon}
              name={skill.name}
              level={skill.level}
              color={skill.color}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
