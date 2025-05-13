import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const homeNavItems = [
    "Home",
    "About",
    "Skills",
    "Experience",
    "Projects",
    "Contact",
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 bg-space-navy/80 backdrop-blur-md"
          : "py-4 bg-transparent"
      }`}
    >
      <div className='container mx-auto px-4 flex justify-between items-center'>
        {/* Logo */}
        <Link to="/" className='text-neon-blue text-2xl font-bold flex items-center'>
          <span className='mr-2'>T</span>
          <div className='neon-line w-6'></div>
        </Link>
        
        {/* Desktop Menu */}
        <div className='hidden md:flex space-x-8'>
          {isHomePage ? (
            <>
              {homeNavItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className='text-white hover:text-neon-blue transition-colors duration-300'
                >
                  {item}
                </a>
              ))}
              <Link 
                to='/blogs'
                className='text-white hover:text-neon-blue transition-colors duration-300'
              >
                Blog
              </Link>
            </>
          ) : (
            <Link 
              to='/'
              className='text-white hover:text-neon-blue transition-colors duration-300'
            >
              Home
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className='md:hidden text-white'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Icon
            icon={mobileMenuOpen ? "mdi:close" : "mdi:menu"}
            width='24'
            height='24'
          />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='md:hidden glass-panel mt-2 mx-4 py-4'>
          <div className='flex flex-col space-y-4 px-4'>
            {isHomePage ? (
              <>
                {homeNavItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className='text-white hover:text-neon-blue transition-colors duration-300'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <Link 
                  to='/blogs'
                  className='text-white hover:text-neon-blue transition-colors duration-300'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
              </>
            ) : (
              <Link 
                to='/'
                className='text-white hover:text-neon-blue transition-colors duration-300'
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
