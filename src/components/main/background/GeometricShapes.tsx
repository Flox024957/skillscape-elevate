import { motion } from "framer-motion";

export const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
      {/* Main Morphing Shape */}
      <motion.div
        className="w-[40vw] h-[40vw] relative"
        animate={{
          clipPath: [
            'polygon(50% 0%, 0% 100%, 100% 100%)', // Triangle
            'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)', // Square
            'circle(50% at 50% 50%)', // Circle
            'polygon(50% 0%, 0% 100%, 100% 100%)' // Back to Triangle
          ],
          rotate: [0, 90, 180, 360],
          scale: [1, 0.9, 1.1, 1]
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          background: 'linear-gradient(45deg, rgba(139,92,246,0.3), rgba(168,85,247,0.3))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(139,92,246,0.2)'
        }}
      >
        {/* Inner Rotating Shape */}
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: [360, 0],
            scale: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 15,
            ease: "linear",
            repeat: Infinity
          }}
          style={{
            background: 'linear-gradient(-45deg, rgba(139,92,246,0.2), transparent)',
            mixBlendMode: 'overlay'
          }}
        />

        {/* Glowing Effect */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity
          }}
          style={{
            boxShadow: '0 0 50px rgba(139,92,246,0.3)',
            background: 'radial-gradient(circle at center, rgba(139,92,246,0.2), transparent)'
          }}
        />
      </motion.div>

      {/* Background Accent */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity
        }}
        style={{
          background: 'radial-gradient(circle at center, rgba(139,92,246,0.1), transparent 70%)'
        }}
      />
    </div>
  );
};