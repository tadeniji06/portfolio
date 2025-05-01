import { useState, useEffect } from "react";
import AppRoutes from "./routes/routes";
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-space-black flex flex-col items-center justify-center'>
        <div className='text-4xl font-bold text-neon-blue mb-6'>
          <span className='text-glitch'>Tunmise</span>
        </div>
        <div className='w-64 h-1 bg-space-navy relative overflow-hidden rounded-full'>
          <div
            className='absolute top-0 left-0 h-full bg-neon-blue animate-pulse-slow rounded-full'
            style={{
              width: "100%",
              animation: "loading 2s ease-in-out infinite",
            }}
          ></div>
        </div>

        <style jsx='true'>{`
          @keyframes loading {
            0% {
              left: -100%;
              width: 100%;
            }
            50% {
              left: 0;
              width: 100%;
            }
            100% {
              left: 100%;
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
     <AppRoutes />
    </div>
  );
}
