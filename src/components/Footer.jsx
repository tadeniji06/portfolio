import { Icon } from "@iconify/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='py-8 bg-space-navy/50 border-t border-white/10'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-4 md:mb-0'>
            <div className='text-neon-blue text-2xl font-bold flex items-center'>
              <span className='mr-2'>T</span>
              <div className='neon-line w-6'></div>
            </div>
          </div>

          <div className='text-center md:text-left mb-4 md:mb-0'>
            <p className='text-white/70'>
              &copy; {currentYear} Tunmise. All rights reserved.
            </p>
          </div>

          <div className='flex space-x-4'>
            <a
              href='https://github.com/tadeniji06'
              className='text-white/70 hover:text-neon-blue transition-colors'
            >
              <Icon icon='mdi:github' className='text-xl' />
            </a>
            <a
              href='https://www.linkedin.com/in/olutunmise-adeniji-16a846250/'
              className='text-white/70 hover:text-neon-purple transition-colors'
            >
              <Icon icon='mdi:linkedin' className='text-xl' />
            </a>
            <a
              href='https://x.com/tade_niji06'
              className='text-white/70 hover:text-neon-green transition-colors'
            >
              <Icon icon='mdi:twitter' className='text-xl' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
