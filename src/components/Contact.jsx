import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icon } from "@iconify/react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

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

    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    gsap.fromTo(
      infoRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage({
        type: "success",
        text: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage(null);
      }, 5000);
    }, 1500);
  };

  return (
    <section id='contact' ref={sectionRef} className='py-20 relative'>
      <div className='absolute inset-0 bg-cyber-grid bg-grid-lg opacity-10'></div>
      <div className='container mx-auto px-4'>
        <h2
          ref={titleRef}
          className='text-4xl font-bold mb-12 text-center neon-text'
        >
          Get In Touch
        </h2>

        <div className='flex flex-col md:flex-row gap-10'>
          {/* Contact Form */}
          {/* <div ref={formRef} className='md:w-1/2'>
            <div className='glass-panel p-8'>
              <h3 className='text-2xl font-bold mb-6 text-neon-purple'>
                Send a Message
              </h3>

              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label
                    htmlFor='name'
                    className='block text-white/80 mb-2'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='w-full bg-space-navy/50 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-neon-blue transition-colors'
                  />
                </div>

                <div className='mb-4'>
                  <label
                    htmlFor='email'
                    className='block text-white/80 mb-2'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='w-full bg-space-navy/50 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-neon-blue transition-colors'
                  />
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='message'
                    className='block text-white/80 mb-2'
                  >
                    Message
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows='5'
                    className='w-full bg-space-navy/50 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-neon-blue transition-colors'
                  ></textarea>
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='cyber-button w-full flex justify-center items-center'
                >
                  {isSubmitting ? (
                    <span className='flex items-center'>
                      <Icon
                        icon='mdi:loading'
                        className='animate-spin mr-2'
                      />
                      Sending...
                    </span>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>

                {submitMessage && (
                  <div
                    className={`mt-4 p-3 rounded-md ${
                      submitMessage.type === "success"
                        ? "bg-neon-green/20 text-neon-green"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {submitMessage.text}
                  </div>
                )}
              </form>
            </div>
          </div> */}

          {/* Contact Info */}
          <div ref={infoRef} className='md:w-1/2'>
            <div className='glass-panel p-8 h-full'>
              <h3 className='text-2xl font-bold mb-6 text-neon-green'>
                Contact Information
              </h3>

              <div className='space-y-6'>
                <div className='flex items-start'>
                  <div className='bg-space-navy p-3 rounded-md mr-4'>
                    <Icon
                      icon='mdi:email'
                      className='text-neon-blue text-xl'
                    />
                  </div>
                  <div>
                    <h4 className='text-lg font-semibold text-white'>
                      Email
                    </h4>
                    <a
                      href='mailto:tadeniji06@gmail.com'
                      className='text-white/80 hover:text-neon-blue transition-colors'
                    >
                      tadeniji06@gmail.com
                    </a>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='bg-space-navy p-3 rounded-md mr-4'>
                    <Icon
                      icon='mdi:map-marker'
                      className='text-neon-purple text-xl'
                    />
                  </div>
                  <div>
                    <h4 className='text-lg font-semibold text-white'>
                      Location
                    </h4>
                    <p className='text-white/80'>Nigeria</p>
                  </div>
                </div>

                <div className='flex items-start'>
                  <div className='bg-space-navy p-3 rounded-md mr-4'>
                    <Icon
                      icon='mdi:phone'
                      className='text-neon-green text-xl'
                    />
                  </div>
                  <div>
                    <h4 className='text-lg font-semibold text-white'>
                      Phone
                    </h4>
                    <a
                      href='tel:+2349127936598'
                      className='text-white/80 hover:text-neon-blue transition-colors'
                    >
                      +234 912 793 6598
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className='mt-8'>
                <h4 className='text-lg font-semibold text-white mb-4'>
                  Connect With Me
                </h4>
                <div className='flex space-x-4'>
                  <a
                    href='https://github.com/tadeniji06'
                    target='_blank'
                    className='bg-space-navy p-3 rounded-full text-neon-blue hover:bg-neon-blue hover:text-space-navy transition-all duration-300'
                  >
                    <Icon icon='mdi:github' className='text-xl' />
                  </a>
                  <a
                    href='https://www.linkedin.com/in/olutunmise-adeniji-16a846250/'
                    target='_blank'
                    className='bg-space-navy p-3 rounded-full text-neon-purple hover:bg-neon-purple hover:text-space-navy transition-all duration-300'
                  >
                    <Icon icon='mdi:linkedin' className='text-xl' />
                  </a>
                  <a
                    href='https://x.com/tade_niji06'
                    target='_blank'
                    className='bg-space-navy p-3 rounded-full text-neon-green hover:bg-neon-green hover:text-space-navy transition-all duration-300'
                  >
                    <Icon icon='mdi:twitter' className='text-xl' />
                  </a>
                  {/* <a href="#" className="bg-space-navy p-3 rounded-full text-neon-pink hover:bg-neon-pink hover:text-space-navy transition-all duration-300">
                    <Icon icon="mdi:instagram" className="text-xl" />
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
