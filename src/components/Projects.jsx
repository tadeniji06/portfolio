import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({
  title,
  description,
  technologies,
  image,
  link,
  index,
}) => {
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
          start: "top 90%",
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className='glass-panel overflow-hidden transition-all duration-300 group'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className='relative h-48 overflow-hidden'>
        <div
          className={`absolute inset-0 bg-space-navy flex items-center justify-center transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        >
          {image ? (
            <img
              src={image}
              alt={title}
              className='w-full h-full object-cover'
            />
          ) : (
            <Icon icon='mdi:web' className='text-neon-blue text-6xl' />
          )}
        </div>
        <div className='absolute inset-0 bg-gradient-to-t from-space-black to-transparent opacity-70'></div>
      </div>

      {/* Project Info */}
      <div className='p-6'>
        <h3 className='text-xl font-bold mb-2 text-neon-green'>{title}</h3>
        <p className='text-white/80 mb-4'>{description}</p>

        {/* Technologies */}
        <div className='flex flex-wrap gap-2 mb-4'>
          {technologies.map((tech, i) => (
            <span
              key={i}
              className='px-2 py-1 text-xs rounded-full bg-space-navy border border-neon-blue text-neon-blue'
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link */}
        <a
          href={link}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center text-neon-purple hover:text-neon-pink transition-colors duration-300'
        >
          <span className='mr-2'>View Project</span>
          <Icon icon='mdi:arrow-right' />
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
          start: "top 80%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const projects = [
    {
      title: "Trading Simulator API",
      description:
        "A RESTful API for the Trading Simulator, providing data and functionality for the trading simulator.",
      technologies: ["Node.js", "Mongo DB", "Express.js", "CoinGecko API"],
      image: null,
      link: "https://github.com/tadeniji06/Trading-Network-API",
    },
    {
      title: "E-commerce Store Dashboard",
      description:
        "A dashboard for an e-commerce store, providing insights and analytics for the store's performance.",
      technologies: ["React", "Tailwind CSS", "Kanban", "Chart.js"],
      image: null,
      link: "https://react-dashb.netlify.app/",
    },
    {
      title: "Studio Freight",
      description:
        "Studio Freight is a web application that allows users to book and manage freight shipments. It provides a user-friendly interface for creating and tracking shipments, as well as managing customer information and invoices.",
      technologies: ["React", "Tailwind CSS", "GSAP", "Three.js"],
      image: null,
      link: "https://repeat.studiofreight.com/",
    },
    {
      title: "Event Ticketing Website",
      description:
        "An event ticketing website that allows users to browse and purchase tickets for various events.",
      technologies: ["React", "Tailwind CSS", "GSAP", "PayStack API"],
      image: null,
      link: "https://plugevents.netlify.app/",
    },
    {
      title: "Franemm Industries",
      description:
        "An industrial cosmetic and laundry producing company website",
      technologies: ["React", "Tailwind CSS", "GSAP", "PayStack API"],
      image: null,
      link: "https://franemm.netlify.app/",
    },
    {
      title: "Trading Simulator",
      description:
        "A web-based trading simulator that allows users to practice trading strategies and analyze market data.",
      technologies: ["React", "GSAP", "Tailwind CSS", "CoinGecko API"],
      image: null,
      link: "https://tradesimm.netlify.app/",
    },
    {
      title: "Real Estate Website",
      description:
        "A web application that allows users to browse and search for properties for sale or rent.",
      technologies: ["React", "GSAP", "Tailwind CSS"],
      image: null,
      link: "https://mantoria.netlify.app/",
    },
  ];

  return (
    <section
      id='projects'
      ref={sectionRef}
      className='py-20 bg-space-navy/20'
    >
      <div className='container mx-auto px-4'>
        <h2
          ref={titleRef}
          className='text-4xl font-bold mb-12 text-center neon-text'
        >
          Featured Projects
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
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

        <div className='text-center mt-12'>
          <a
            href='https://github.com/tadeniji06'
            target='_blank'
            rel='noopener noreferrer'
            className='cyber-button inline-flex items-center'
          >
            <Icon icon='mdi:github' className='mr-2' />
            <span>View More on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
