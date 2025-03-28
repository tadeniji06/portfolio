import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ title, description, technologies, image, link, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
        },
      }
    );
  }, [index]);

  return (
    <div 
      ref={cardRef} 
      className="glass-panel overflow-hidden transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <div className={`absolute inset-0 bg-space-navy flex items-center justify-center transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <Icon icon="mdi:web" className="text-neon-blue text-6xl" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-space-black to-transparent opacity-70"></div>
      </div>
      
      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-neon-green">{title}</h3>
        <p className="text-white/80 mb-4">{description}</p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, i) => (
            <span key={i} className="px-2 py-1 text-xs rounded-full bg-space-navy border border-neon-blue text-neon-blue">
              {tech}
            </span>
          ))}
        </div>
        
        {/* Link */}
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-neon-purple hover:text-neon-pink transition-colors duration-300"
        >
          <span className="mr-2">View Project</span>
          <Icon icon="mdi:arrow-right" />
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
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

  const projects = [
    {
      title: 'E-Commerce Dashboard',
      description: 'A responsive admin dashboard for e-commerce platforms with real-time analytics and inventory management.',
      technologies: ['React', 'Redux', 'Tailwind CSS', 'Chart.js'],
      image: null, // Replace with actual image path
      link: '#'
    },
    {
      title: 'Weather App',
      description: 'A sleek weather application that provides real-time weather data and forecasts for locations worldwide.',
      technologies: ['JavaScript', 'React', 'API Integration', 'CSS3'],
      image: null, // Replace with actual image path
      link: '#'
    },
    {
      title: 'Task Management System',
      description: 'A collaborative task management tool with drag-and-drop functionality and team collaboration features.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      image: null, // Replace with actual image path
      link: '#'
    },
    {
      title: 'Personal Finance Tracker',
      description: 'An application to track personal expenses, create budgets, and visualize spending patterns.',
      technologies: ['React', 'Firebase', 'Chart.js', 'Tailwind CSS'],
      image: null, // Replace with actual image path
      link: '#'
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-space-navy/20">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="text-4xl font-bold mb-12 text-center neon-text">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              image={project.image}
              link={project.link}
              index={index}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://github.com/tadeniji06" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cyber-button inline-flex items-center"
          >
            <Icon icon="mdi:github" className="mr-2" />
            <span>View More on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
