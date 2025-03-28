const HeroSection = () => {
  return (
    <div className='min-h-screen grid-background flex items-center justify-center'>
      <div className='glass-panel p-10 max-w-4xl text-center'>
        <h1 className='text-5xl font-bold mb-6 text-neon-blue'>
          Futuristic Portfolio
        </h1>

        <div className='neon-line my-6'></div>
        <p className='text-xl text-white/80'>
          Exploring the intersection of design and technology
        </p>
        <div className='mt-8'>
          <button className='cyber-button mr-4'>Explore Projects</button>
          <button className='cyber-button bg-transparent border-neon-purple text-neon-purple shadow-neon-purple hover:bg-neon-purple'>
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
