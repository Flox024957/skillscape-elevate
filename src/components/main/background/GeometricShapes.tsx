import { motion } from "framer-motion";

export const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
      {/* Main Pulsing Circle */}
      <motion.div
        className="relative"
        animate={{
          scale: [0.18, 0.7, 0.18],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          width: '100vw',
          height: '100vw',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, rgba(139,92,246,0.3), rgba(168,85,247,0.3))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(139,92,246,0.2)'
        }}
      >
        {/* Inner Rotating Circle */}
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
            borderRadius: '50%',
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
            borderRadius: '50%',
            boxShadow: '0 0 50px rgba(139,92,246,0.3)',
            background: 'radial-gradient(circle at center, rgba(139,92,246,0.2), transparent)'
          }}
        />

        {/* Orbital Ring */}
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity
          }}
          style={{
            borderRadius: '50%',
            border: '2px solid rgba(139,92,246,0.1)',
            boxShadow: '0 0 30px rgba(139,92,246,0.2)'
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