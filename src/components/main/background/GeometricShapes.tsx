import { motion } from "framer-motion";

export const GeometricShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
      {/* Professional Gradient Circle */}
      <motion.div
        className="relative"
        animate={{
          scale: [0.18, 0.7, 0.18],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 45,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          width: '100vw',
          height: '100vw',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, rgba(14,165,233,0.08), rgba(30,174,219,0.08))',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(14,165,233,0.05)'
        }}
      >
        {/* Elegant Inner Glow */}
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: [360, 0],
            scale: [0.95, 1, 0.95]
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity
          }}
          style={{
            borderRadius: '50%',
            background: 'linear-gradient(-45deg, rgba(14,165,233,0.05), transparent)',
            mixBlendMode: 'soft-light'
          }}
        />

        {/* Subtle Glow Effect */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 6,
            ease: "easeInOut",
            repeat: Infinity
          }}
          style={{
            borderRadius: '50%',
            boxShadow: '0 0 40px rgba(14,165,233,0.1), 0 0 80px rgba(14,165,233,0.05)',
            background: 'radial-gradient(circle at center, rgba(14,165,233,0.08), transparent)'
          }}
        />

        {/* Minimal Orbital Ring */}
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity
          }}
          style={{
            borderRadius: '50%',
            border: '1px solid rgba(14,165,233,0.04)',
            boxShadow: '0 0 30px rgba(14,165,233,0.08), 0 0 60px rgba(14,165,233,0.03)'
          }}
        />
      </motion.div>

      {/* Refined Background Accent */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.02, 0.04, 0.02]
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity
        }}
        style={{
          background: 'radial-gradient(circle at center, rgba(14,165,233,0.04), transparent 70%)'
        }}
      />
    </div>
  );
};